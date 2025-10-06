# 🔗 INTEGRAÇÃO FRONTEND ↔ BACKEND — Yello Solar Hub

**Versão**: 1.0.0  
**Data**: 2025-10-06  
**Status**: ✅ Implementado

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Arquitetura](#arquitetura)
3. [Camadas de Integração](#-camadas-de-integração)
4. [Mapeamentos Slug ↔ ID](#%EF%B8%8F-mapeamentos-slug--id)
5. [DTOs e Normalização](#-dtos-e-normalização)
6. [Proxies /api/storefront/*](#-proxies-apistorefront)
7. [Cache e Revalidação ISR](#-cache-e-revalidação-isr)
8. [Autenticação e Sessão](#-autenticação-e-sessão)
9. [Tratamento de Erros](#-tratamento-de-erros)
10. [Fluxo de Requisição](#-fluxo-de-requisição)
11. [Gates de Validação](#-gates-de-validação)
12. [Troubleshooting](#-troubleshooting)
13. [Próximos Passos](#-próximos-passos)

---

## 🎯 Visão Geral

A camada de integração conecta o **frontend Next.js 15** ao **backend Medusa v2**, atuando como um **proxy inteligente** que:

1. **Normaliza dados** do Medusa Store API para o domínio solar (kits, painéis, baterias, etc.)
2. **Traduz slugs** amigáveis (`paineis-solares`) para IDs do backend (`cat_paineis_solares`)
3. **Controla cache** (RFC 9111: Cache-Control, ETag)
4. **Padroniza erros** (RFC 9457: Problem Details)
5. **Gerencia paginação** (RFC 8288: Link header)
6. **Habilita CORS** para SPAs

### Benefícios

- ✅ Frontend desacoplado do backend (pode migrar para outro e-commerce no futuro)
- ✅ URLs amigáveis (`/produtos/paineis-solares` vs `/products/cat_paineis_solares`)
- ✅ DTOs type-safe (TypeScript)
- ✅ Cache otimizado (ISR + stale-while-revalidate)
- ✅ Erros padronizados (melhor DX para frontend)

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js 15)                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        UI Components (React Server Components)        │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │ fetch()                             │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │     Proxies /api/storefront/* (Route Handlers)       │  │
│  │  - Tradução slug ↔ ID                                │  │
│  │  - Normalização DTOs                                  │  │
│  │  - Cache (Cache-Control, ETag)                        │  │
│  │  - Paginação (Link header)                            │  │
│  │  - Erros (RFC 9457)                                   │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │ medusaClient.get()                  │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │     MedusaClient Wrapper (medusa-client.ts)          │  │
│  │  - Injeta x-publishable-api-key                      │  │
│  │  - credentials: "include" (sessões)                   │  │
│  │  - Retry exponencial                                  │  │
│  │  - Timeout 10s                                        │  │
│  └────────────────────┬─────────────────────────────────┘  │
└────────────────────────┼─────────────────────────────────────┘
                         │ HTTP
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                   BACKEND (Medusa v2)                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │       Store API (/store/*)                           │   │
│  │  - /store/product-categories                          │   │
│  │  - /store/products                                    │   │
│  │  - /store/carts                                       │   │
│  │  - /store/carts/:id/line-items                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │       Database (PostgreSQL 16)                        │   │
│  │  - 14 categorias (5 kits + 9 produtos)               │   │
│  │  - 42 produtos (3 por categoria)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧩 Camadas de Integração

### 1. **MedusaClient** (`src/lib/integration/medusa-client.ts`)

Wrapper de `fetch()` que injeta automaticamente:

- `x-publishable-api-key`: autenticação Store API
- `credentials: "include"`: preserva cookies de sessão
- Retry exponencial (2 tentativas, backoff 1s/2s/4s)
- Timeout configurável (10s default)
- Conversão de erros Medusa → RFC 9457

**Exemplo de uso**:

```typescript
import { medusaClient } from '@/lib/integration/medusa-client';

const response = await medusaClient.getPaginated('/store/products', {
  category_id: 'cat_paineis_solares',
  limit: 24,
  offset: 0,
});

console.log(response.data.data); // Array de produtos
console.log(response.data.count); // Total
console.log(response.etag); // ETag para cache
```

### 2. **Mapeamentos** (`src/lib/integration/mappings.ts`)

Mapas bidirecionais slug ↔ ID para 14 categorias:

```typescript
import { slugToCategoryId, categoryIdToSlug } from '@/lib/integration/mappings';

slugToCategoryId('paineis-solares'); // → "cat_paineis_solares"
categoryIdToSlug('cat_paineis_solares'); // → "paineis-solares"
```

**Validação automática** em `development`:

```bash
[MAPPINGS] ✅ All mappings validated (14 categories: 5 kits + 9 products)
```

### 3. **DTOs** (`src/lib/integration/dto.ts`)

Interfaces TypeScript para dados normalizados:

```typescript
import { normalizeProductSummary } from '@/lib/integration/dto';

const medusaProduct = await medusaClient.get('/store/products/prod_...');
const product: ProductSummary = normalizeProductSummary(medusaProduct.data);

// product tem apenas campos relevantes para UI
console.log(product.title);
console.log(product.price); // em centavos
console.log(product.thumbnail);
```

### 4. **Proxies** (`src/app/api/storefront/*/route.ts`)

Route Handlers que orquestram:

- GET `/api/storefront/categories` → lista categorias
- GET `/api/storefront/products` → lista produtos (com filtros)
- GET `/api/storefront/products/[handle]` → detalhe de produto
- GET `/api/storefront/kits/[slug]` → produtos de kit específico
- POST `/api/storefront/cart` → criar carrinho
- POST `/api/storefront/cart/[id]/line-items` → adicionar item

---

## 🗺️ Mapeamentos Slug ↔ ID

### Taxonomia Completa (14 categorias)

#### Kits (5)

| Slug | ID | Nome |
|------|----| -----|
| `on-grid` | `cat_kit_on_grid` | Kit On-Grid |
| `off-grid-interativo` | `cat_kit_off_grid_interativo` | Kit Off-Grid Interativo |
| `zero-grid` | `cat_kit_zero_grid` | Kit Zero Grid |
| `hibrido` | `cat_kit_hibrido` | Kit Híbrido |
| `antiapagao` | `cat_kit_antiapagao` | Kit Antiapagão |

#### Produtos (9)

| Slug | ID | Nome |
|------|----| -----|
| `paineis-solares` | `cat_paineis_solares` | Painéis Solares |
| `baterias` | `cat_baterias` | Baterias |
| `inversores` | `cat_inversores` | Inversores |
| `carregadores-ev` | `cat_carregadores_veiculares` | Carregadores Veiculares |
| `medidor-grid-zero` | `cat_medidor_grid_zero` | Medidor Grid Zero |
| `string-box` | `cat_string_box` | String Box |
| `estruturas` | `cat_estrutura_montagem` | Estrutura de Montagem |
| `bomba-de-agua` | `cat_bomba_agua` | Bomba de Água Solar |
| `transformador` | `cat_transformador` | Transformador |

### Funções de Conversão

```typescript
import {
  slugToCategoryId,
  categoryIdToSlug,
  kitSlugToCategoryId,
  isKitSlug,
  isProductCategorySlug,
  getAllCategorySlugs,
} from '@/lib/integration/mappings';

// Conversão básica
slugToCategoryId('paineis-solares'); // → "cat_paineis_solares"
categoryIdToSlug('cat_paineis_solares'); // → "paineis-solares"

// Kits
kitSlugToCategoryId('on-grid'); // → "cat_kit_on_grid"
isKitSlug('on-grid'); // → true
isKitSlug('paineis-solares'); // → false

// Validação
getAllCategorySlugs(); // → ["on-grid", "off-grid-interativo", ..., "transformador"]
```

---

## 📦 DTOs e Normalização

### Interfaces Frontend

```typescript
// Categoria (resumo)
interface CategorySummary {
  id: string;
  name: string;
  handle: string;
  parent_id?: string | null;
  description?: string;
  metadata?: Record<string, any>;
}

// Produto (resumo para listagens)
interface ProductSummary {
  id: string;
  title: string;
  handle: string;
  thumbnail: string;
  description?: string;
  price: number; // centavos
  currency_code: string; // "brl"
  sku?: string;
  metadata?: {
    power_watts?: number;
    voltage?: string;
    brand?: string;
    [key: string]: any;
  };
}

// Produto (detalhe completo para PDP)
interface ProductDetail extends ProductSummary {
  description: string;
  images: string[]; // galeria completa
  variants: ProductVariant[];
  categories: CategorySummary[];
  material?: string;
  weight?: number;
  dimensions?: { length?: number; width?: number; height?: number };
  metadata: Record<string, any>;
}

// Carrinho
interface Cart {
  id: string;
  items: CartLineItem[];
  email?: string;
  subtotal: number; // centavos
  total: number; // centavos
  currency_code: string;
}
```

### Funções de Normalização

```typescript
import {
  normalizeCategory,
  normalizeProductSummary,
  normalizeProductDetail,
  normalizeCart,
  formatPrice,
} from '@/lib/integration/dto';

// Medusa → Frontend
const medusaProduct = { /* response do Medusa */ };
const product: ProductSummary = normalizeProductSummary(medusaProduct);

// Utilidades
formatPrice(250000); // → "R$ 2.500,00"
formatPrice(5000, 'USD'); // → "$50.00"
```

---

## 🌐 Proxies /api/storefront/*

### GET /api/storefront/categories

**Query Params**:

- `limit` (1-100, default 20)
- `offset` (default 0)
- `parent` (category ID/handle)
- `q` (busca)

**Response** (200):

```json
{
  "data": [
    {
      "id": "cat_paineis_solares",
      "name": "Painéis Solares",
      "handle": "paineis-solares",
      "parent_id": null,
      "description": "...",
      "metadata": {}
    }
  ],
  "meta": {
    "total": 14,
    "offset": 0,
    "limit": 20
  }
}
```

**Headers**:

- `Cache-Control: public, max-age=60, stale-while-revalidate=600`
- `ETag: "abc123"`
- `X-Total-Count: 14`
- `Link: </api/storefront/categories?offset=20&limit=20>; rel="next"`

---

### GET /api/storefront/products

**Query Params**:

- `category` (slug ou ID, ex: `paineis-solares`)
- `q` (busca)
- `sort` (created_at, -created_at, etc.)
- `limit` (1-100, default 24)
- `offset` (default 0)

**Tradução automática**:

```
GET /api/storefront/products?category=paineis-solares
→ Medusa: GET /store/products?category_id=cat_paineis_solares
```

**Response** (200):

```json
{
  "data": [
    {
      "id": "prod_01HXYZ...",
      "title": "Painel Solar 550W Monocristalino",
      "handle": "painel-solar-550w-mono",
      "thumbnail": "https://picsum.photos/seed/.../800/600",
      "price": 150000,
      "currency_code": "brl",
      "sku": "SKU-PROD_01HXYZ",
      "metadata": {
        "power_watts": 550,
        "efficiency": 21.5,
        "warranty_years": 25
      }
    }
  ],
  "meta": {
    "total": 42,
    "offset": 0,
    "limit": 24
  }
}
```

**Headers** (idêntico a categories).

---

### GET /api/storefront/products/[handle]

**Params**:

- `handle` (path param, ex: `painel-solar-550w-mono`)

**Response** (200):

```json
{
  "data": {
    "id": "prod_01HXYZ...",
    "title": "Painel Solar 550W Monocristalino",
    "handle": "painel-solar-550w-mono",
    "description": "Descrição completa...",
    "thumbnail": "https://...",
    "images": ["https://...", "https://..."],
    "price": 150000,
    "currency_code": "brl",
    "variants": [
      {
        "id": "variant_01XYZ...",
        "title": "Padrão",
        "sku": "SKU-PROD_01HXYZ",
        "prices": [{ "amount": 150000, "currency_code": "brl" }],
        "inventory_quantity": 50
      }
    ],
    "categories": [{ "id": "cat_paineis_solares", "name": "Painéis Solares", ... }],
    "metadata": { "power_watts": 550, "efficiency": 21.5, ... }
  }
}
```

**Headers**:

- `Cache-Control: public, max-age=120, stale-while-revalidate=600` (maior que listagens)

**Error** (404):

```json
{
  "type": "https://yello.solar/errors/not-found",
  "title": "Product not found",
  "status": 404,
  "detail": "Product with handle \"invalid-handle\" not found",
  "instance": "/api/storefront/products/invalid-handle"
}
```

---

### GET /api/storefront/kits/[slug]

**Params**:

- `slug` (on-grid | off-grid-interativo | zero-grid | hibrido | antiapagao)

**Query Params**:

- `limit`, `offset` (paginação)

**Response** (200):

```json
{
  "data": [/* ProductSummary[] */],
  "meta": {
    "total": 3,
    "offset": 0,
    "limit": 24,
    "kit": {
      "slug": "on-grid",
      "category_id": "cat_kit_on_grid"
    }
  }
}
```

**Error** (404):

```json
{
  "type": "https://yello.solar/errors/not-found",
  "title": "Kit not found",
  "status": 404,
  "detail": "Kit with slug \"invalid-kit\" not found. Valid kits: on-grid, off-grid-interativo, zero-grid, hibrido, antiapagao",
  "instance": "/api/storefront/kits/invalid-kit"
}
```

---

### POST /api/storefront/cart

**Body** (JSON):

```json
{}  // vazio para criar carrinho novo
```

**Response** (201):

```json
{
  "data": {
    "id": "cart_01XYZ...",
    "items": [],
    "subtotal": 0,
    "total": 0,
    "currency_code": "brl"
  }
}
```

---

### POST /api/storefront/cart/[id]/line-items

**Body** (JSON):

```json
{
  "variant_id": "variant_01XYZ...",
  "quantity": 2
}
```

**Response** (200):

```json
{
  "data": {
    "id": "cart_01XYZ...",
    "items": [
      {
        "id": "item_01ABC...",
        "variant_id": "variant_01XYZ...",
        "product_id": "prod_01HXYZ...",
        "title": "Painel Solar 550W Monocristalino",
        "thumbnail": "https://...",
        "quantity": 2,
        "unit_price": 150000,
        "subtotal": 300000
      }
    ],
    "subtotal": 300000,
    "total": 300000,
    "currency_code": "brl"
  }
}
```

**Error** (400):

```json
{
  "type": "https://yello.solar/errors/validation",
  "title": "Invalid request body",
  "status": 400,
  "detail": "variant_id (string) and quantity (number) are required",
  "instance": "/api/storefront/cart/cart_01XYZ.../line-items",
  "errors": [
    { "path": "variant_id", "message": "Required field" },
    { "path": "quantity", "message": "Must be a number" }
  ]
}
```

---

### POST /api/storefront/checkout

**Status**: 🚧 **Not Implemented** (501)

Aguardando configuração de payment provider (Stripe/PayPal) no Medusa backend.

**Response** (501):

```json
{
  "type": "https://yello.solar/errors/not-implemented",
  "title": "Not Implemented",
  "status": 501,
  "detail": "Checkout integration pending payment provider configuration. Configure Stripe/PayPal in Medusa backend first.",
  "instance": "/api/storefront/checkout"
}
```

---

## ⚡ Cache e Revalidação ISR

### Estratégia de Cache (3 camadas)

#### 1. **Browser Cache** (Cache-Control)

```
Cache-Control: public, max-age=60, stale-while-revalidate=600
```

- `public`: permitir cache em CDNs
- `max-age=60`: considera fresco por 60s
- `stale-while-revalidate=600`: serve stale por até 600s enquanto revalida

#### 2. **Next.js ISR** (Incremental Static Regeneration)

```typescript
// src/app/(catalog)/produtos/paineis-solares/page.tsx
export const revalidate = 3600; // 1 hora

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/storefront/products?category=paineis-solares');
  const { data: products } = await res.json();
  return <ProductGrid products={products} />;
}
```

- Página gerada estaticamente no build
- Regenera a cada 3600s (1h) após requisição
- Serve versão stale enquanto regenera (stale-while-revalidate)

#### 3. **ETag** (Conditional Requests)

```
GET /api/storefront/products
→ Response: ETag: "abc123xyz"

GET /api/storefront/products (If-None-Match: "abc123xyz")
→ Response: 304 Not Modified (sem body)
```

### Configuração Recomendada por Tipo

| Tipo de Página | ISR `revalidate` | Cache-Control `max-age` | Justificativa |
|----------------|------------------|-------------------------|---------------|
| **Home** | 3600 (1h) | 60 | Alta visibilidade, atualização moderada |
| **Listagens** (PLP) | 3600 (1h) | 60 | Produtos mudam raramente |
| **Detalhe** (PDP) | 3600 (1h) | 120 | Conteúdo mais estático |
| **Categorias** | 3600 (1h) | 60 | Taxonomia estável |
| **Cart** | - | `no-store` | Sempre fresh (dados do usuário) |

### Revalidação Manual (On-Demand)

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

// Após criar produto no backend
revalidatePath('/produtos/paineis-solares');
revalidateTag('products');
```

**Trigger via webhook** (Medusa → Next.js):

```typescript
// src/app/api/webhooks/medusa/route.ts
export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === 'product.created' || event.type === 'product.updated') {
    revalidateTag('products');
  }

  return new Response('OK', { status: 200 });
}
```

---

## 🔐 Autenticação e Sessão

### Publishable API Key (Store API)

**Configuração**:

```env
# .env.local (frontend)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_01HXYZ...
```

**Como obter** (backend Medusa):

```bash
# Terminal backend
cd YSH_backend
pnpm medusa exec -- node scripts/create-publishable-key.js
```

```javascript
// scripts/create-publishable-key.js
const { MedusaContainer } = require('@medusajs/framework/http');

async function run() {
  const container = MedusaContainer.getInstance();
  const publishableKeyService = container.resolve('publishableKeyService');

  const key = await publishableKeyService.create({
    title: 'Yello Solar Hub Storefront',
  });

  console.log('Publishable Key:', key.id);
}

run();
```

### Sessões/Cookies (Autenticação de Usuário)

**CORS Backend** (`medusa-config.ts`):

```typescript
module.exports = {
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:3000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:7001',
      authCors: process.env.AUTH_CORS || 'http://localhost:3000',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
};
```

**Frontend** (`medusaClient`):

```typescript
// credentials: "include" já configurado no MedusaClient
const response = await medusaClient.post('/store/auth/login', {
  email: 'user@example.com',
  password: 'password123',
});

// Cookies de sessão são automaticamente salvos pelo browser
```

**Login/Logout** (exemplo futuro):

```typescript
// POST /api/storefront/auth/login
export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response = await medusaClient.post('/store/auth', {
    email,
    password,
  });

  return new Response(JSON.stringify(response.data), {
    status: 200,
    headers: {
      'Set-Cookie': response.headers.get('Set-Cookie') || '',
    },
  });
}
```

---

## 🚨 Tratamento de Erros

### RFC 9457 - Problem Details

Todos os erros 4xx/5xx retornam `application/problem+json`:

```json
{
  "type": "https://yello.solar/errors/validation",
  "title": "Parâmetro inválido",
  "status": 400,
  "detail": "O parâmetro 'category' deve ser um slug ou ID válido",
  "instance": "/api/storefront/products",
  "errors": [
    { "path": "category", "message": "Invalid category slug 'invalid-slug'" }
  ]
}
```

### Tipos de Erro

| Type | Status | Descrição |
|------|--------|-----------|
| `validation` | 400 | Parâmetros/body inválidos |
| `unauthorized` | 401 | Autenticação necessária |
| `forbidden` | 403 | Sem permissão |
| `not-found` | 404 | Recurso não encontrado |
| `conflict` | 409 | Conflito (ex: duplicata) |
| `rate-limit` | 429 | Muitas requisições |
| `internal` | 500 | Erro interno do servidor |
| `bad-gateway` | 502 | Erro no backend Medusa |
| `service-unavailable` | 503 | Backend offline |
| `gateway-timeout` | 504 | Timeout ao chamar backend |
| `network` | 503 | Erro de rede |

### Tratamento no Frontend

```typescript
async function fetchProducts() {
  const res = await fetch('/api/storefront/products?category=invalid-slug');

  if (!res.ok) {
    const problem = await res.json();
    console.error(problem);
    
    // Mostrar toast/notificação
    toast.error(problem.detail || problem.title);
    
    // Log para observabilidade
    if (problem.status >= 500) {
      logger.error('API Error', { problem });
    }
    
    return [];
  }

  return res.json();
}
```

---

## 🔄 Fluxo de Requisição

### Exemplo: Listagem de Produtos por Categoria

```
1. User navega para /produtos/paineis-solares

2. Next.js Server Component renderiza:
   ┌─────────────────────────────────────────────┐
   │ src/app/(catalog)/produtos/[slug]/page.tsx  │
   └───────────────┬─────────────────────────────┘
                   │ fetch()
                   ▼
   ┌──────────────────────────────────────────────┐
   │ GET /api/storefront/products?category=...    │
   └───────────────┬──────────────────────────────┘
                   │
   ┌───────────────▼──────────────────────────────┐
   │ Proxy: slugToCategoryId("paineis-solares")   │
   │ → "cat_paineis_solares"                      │
   └───────────────┬──────────────────────────────┘
                   │
   ┌───────────────▼──────────────────────────────┐
   │ medusaClient.getPaginated()                  │
   │ - Injeta x-publishable-api-key               │
   │ - credentials: "include"                     │
   │ - Timeout 10s, Retry 2x                      │
   └───────────────┬──────────────────────────────┘
                   │ HTTP
                   ▼
   ┌──────────────────────────────────────────────┐
   │ Medusa Store API                             │
   │ GET /store/products?category_id=cat_...      │
   └───────────────┬──────────────────────────────┘
                   │ JSON Response
                   ▼
   ┌──────────────────────────────────────────────┐
   │ Proxy: normalizeProductSummaries()           │
   │ - Extrai price da primeira variante          │
   │ - Renomeia campos                            │
   │ - Filtra metadata irrelevante                │
   └───────────────┬──────────────────────────────┘
                   │
   ┌───────────────▼──────────────────────────────┐
   │ Proxy: Headers RFC 8288/9111                 │
   │ - Link: rel="next"                           │
   │ - X-Total-Count: 42                          │
   │ - Cache-Control: public, max-age=60, ...     │
   │ - ETag: "abc123"                             │
   └───────────────┬──────────────────────────────┘
                   │ JSON Response
                   ▼
   ┌──────────────────────────────────────────────┐
   │ Server Component recebe ProductSummary[]     │
   │ - Renderiza <ProductCard /> components       │
   │ - HTML enviado ao browser                    │
   └──────────────────────────────────────────────┘

3. Browser recebe HTML renderizado (SSR/ISR)

4. Após 3600s (revalidate), Next.js regenera em background
```

### Fluxo de Erro (404)

```
1. User navega para /produtos/invalid-handle

2. GET /api/storefront/products/invalid-handle
   ┌─────────────────────────────────────────────┐
   │ Proxy chama Medusa: GET /store/products?... │
   └───────────────┬─────────────────────────────┘
                   │ HTTP 200 (array vazio)
                   ▼
   ┌──────────────────────────────────────────────┐
   │ Proxy: !rawProduct → problemJson(404, ...)   │
   └───────────────┬──────────────────────────────┘
                   │ RFC 9457 JSON
                   ▼
   ┌──────────────────────────────────────────────┐
   │ Server Component: notFound() ou error.tsx    │
   │ - Renderiza página 404 customizada           │
   └──────────────────────────────────────────────┘
```

---

## ✅ Gates de Validação

### GATE-INT1: Publishable Key em Todas Chamadas

**Verificação**:

```bash
# Inspecionar network tab no DevTools
# Todas requisições para Medusa devem ter header:
x-publishable-api-key: pk_01HXYZ...
```

**Teste automatizado**:

```typescript
// tests/integration/storefront-api.spec.ts
it('deve usar x-publishable-api-key', async () => {
  // Mock fetch para capturar headers
  const originalFetch = global.fetch;
  global.fetch = async (url, options) => {
    expect(options?.headers?.['x-publishable-api-key']).toBeTruthy();
    return originalFetch(url, options);
  };

  await medusaClient.get('/store/products');
});
```

**Status**: ✅ **PASS** (implementado em `medusaClient`)

---

### GATE-INT2: Mapeamentos Bidirecionais Funcionais

**Verificação**:

```typescript
import { validateMappings } from '@/lib/integration/mappings';

const isValid = validateMappings();
console.log(isValid); // true
```

**Teste automatizado**:

```bash
cd YSH_storefront
pnpm test:integration -- --grep "GATE-INT2"
```

**Status**: ✅ **PASS** (14 categorias validadas)

---

### GATE-INT3: DTOs Normalizados

**Verificação**:

```bash
# Response de /api/storefront/products deve ter campos:
{
  "data": [
    {
      "id": "...",        # ✅ string
      "title": "...",     # ✅ string
      "handle": "...",    # ✅ string
      "thumbnail": "...", # ✅ string (URL)
      "price": 150000,    # ✅ number (centavos)
      "currency_code": "brl", # ✅ string
      "sku": "...",       # ✅ string opcional
      "metadata": {}      # ✅ object opcional
    }
  ],
  "meta": {
    "total": 42,          # ✅ number
    "offset": 0,          # ✅ number
    "limit": 24           # ✅ number
  }
}
```

**Teste automatizado**:

```bash
pnpm test:integration -- --grep "GATE-INT3"
```

**Status**: ✅ **PASS** (todos DTOs conformes)

---

### GATE-INT4: Cache e Revalidação Corretos

**Verificação**:

```bash
curl -I http://localhost:3000/api/storefront/products

# Deve retornar:
Cache-Control: public, max-age=60, stale-while-revalidate=600
ETag: "abc123"
```

**Teste automatizado**:

```bash
pnpm test:integration -- --grep "GATE-INT4"
```

**Status**: ✅ **PASS** (headers presentes)

---

### GATE-INT5: Tratamento de Erros Padronizado

**Verificação**:

```bash
curl http://localhost:3000/api/storefront/products?category=invalid-slug

# Deve retornar 400 com:
Content-Type: application/problem+json

{
  "type": "https://yello.solar/errors/validation",
  "title": "Invalid category",
  "status": 400,
  "detail": "Category slug \"invalid-slug\" not found",
  "instance": "/api/storefront/products"
}
```

**Teste automatizado**:

```bash
pnpm test:integration -- --grep "GATE-INT5"
```

**Status**: ✅ **PASS** (RFC 9457 conforme)

---

### GATE-INT6: CORS Configurado Corretamente

**Verificação**:

```bash
curl -I -X OPTIONS http://localhost:3000/api/storefront/categories

# Deve retornar 204 com:
Access-Control-Allow-Origin: *  # ou origem específica
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, x-publishable-api-key
Vary: Origin
```

**Teste automatizado**:

```bash
pnpm test:integration -- --grep "GATE-INT6"
```

**Status**: ✅ **PASS** (CORS habilitado)

---

## 🔧 Troubleshooting

### ❌ Erro: "Cannot find module '@/lib/integration/medusa-client'"

**Causa**: Path aliases não resolvidos (antes de `pnpm install`).

**Solução**:

```bash
cd YSH_storefront
pnpm install
```

---

### ❌ Erro: "x-publishable-api-key is required"

**Causa**: ENV var `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` não configurada.

**Solução**:

```bash
# 1. Criar key no backend
cd YSH_backend
pnpm medusa exec -- node scripts/create-publishable-key.js

# 2. Copiar key e adicionar em .env.local
echo "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_01HXYZ..." >> .env.local

# 3. Restart frontend
pnpm dev:web
```

---

### ❌ Erro: "Failed to connect to Medusa backend" (503)

**Causa**: Backend Medusa não está rodando.

**Solução**:

```bash
# Terminal 1: Backend
cd YSH_backend
docker compose up -d  # PostgreSQL + Redis
pnpm dev:api

# Aguardar mensagem:
# ✅ Medusa server running on http://localhost:9000
```

---

### ❌ Erro: "Category slug 'paineis-solares' not found" (400)

**Causa**: Seeds não foram executados (banco vazio).

**Solução**:

```bash
cd YSH_backend
pnpm seed:all

# Verificar:
curl http://localhost:9000/store/product-categories | jq '.product_categories | length'
# Deve retornar: 14
```

---

### ❌ Erro: CORS blocked (browser console)

**Causa**: Backend Medusa não permite origem do frontend.

**Solução**:

```typescript
// YSH_backend/medusa-config.ts
module.exports = {
  projectConfig: {
    http: {
      storeCors: 'http://localhost:3000',  // ← Adicionar origem do frontend
    },
  },
};
```

Restart backend:

```bash
cd YSH_backend
pnpm dev:api
```

---

### ❌ Erro: "Timeout after 10000ms"

**Causa**: Backend muito lento ou indisponível.

**Solução 1** (aumentar timeout):

```typescript
// src/lib/integration/medusa-client.ts
const medusaClient = new MedusaClient({
  baseUrl: '...',
  publishableApiKey: '...',
  timeout: 30000, // 30s
});
```

**Solução 2** (otimizar backend):

```bash
# Verificar logs do backend para queries lentas
cd YSH_backend
tail -f logs/medusa.log
```

---

## 🚀 Próximos Passos

### Curto Prazo (1-2 semanas)

1. **Implementar autenticação de usuário**
   - Login/Register via `/api/storefront/auth/*`
   - Integração com Medusa Customer API
   - Sessões persistentes (cookies)

2. **Adicionar filtros avançados**
   - Facets (preço, potência, marca)
   - GET `/api/storefront/facets?category=...`
   - Agregações no Medusa

3. **Otimizar imagens**
   - Substituir Picsum por assets reais
   - Next.js Image Optimization
   - WebP/AVIF formats

### Médio Prazo (1-2 meses)

4. **Implementar checkout completo**
   - Configurar Stripe/PayPal no Medusa
   - POST `/api/storefront/checkout` funcional
   - Payment intents + webhooks

5. **Adicionar busca avançada**
   - Integrar MeiliSearch/Algolia
   - GET `/api/storefront/search?q=...`
   - Autocomplete

6. **Webhooks de revalidação**
   - POST `/api/webhooks/medusa` → `revalidateTag('products')`
   - On-demand ISR quando backend atualiza

### Longo Prazo (3-6 meses)

7. **Multi-região**
   - Suporte a BRL/USD/EUR
   - Geo-routing (Edge Functions)
   - Preços por região

8. **Observabilidade**
   - Logging estruturado (Pino/Winston)
   - Tracing (OpenTelemetry)
   - Métricas (Prometheus)

9. **Performance**
   - Lazy loading de imagens
   - Prefetch de rotas
   - Service Worker (offline-first)

---

## 📚 Referências

- [Medusa v2 Storefront Development](https://docs.medusajs.com/learn/storefront-development)
- [Medusa Store API](https://docs.medusajs.com/api/store)
- [Medusa Publishable API Keys](https://docs.medusajs.com/resources/storefront-development/publishable-api-keys)
- [Next.js 15 Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [RFC 9457 - Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html)
- [RFC 8288 - Link Relations](https://www.rfc-editor.org/rfc/rfc8288.html)
- [RFC 9111 - HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Última Atualização**: 2025-10-06  
**Versão**: 1.0.0  
**Status**: ✅ Implementado e validado (6/6 gates PASS)
