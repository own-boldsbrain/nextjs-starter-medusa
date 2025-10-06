# 🌐 Yello Solar Hub — API Documentation

**Version**: 1.0.0  
**Base URL**: `http://localhost:3000` (dev) | `https://yello.solar` (prod)  
**OpenAPI Spec**: [`/api-spec/openapi.yaml`](../public/api-spec/openapi.yaml)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Quickstart](#-quickstart)
- [Autenticação](#-autenticação)
- [Endpoints](#-endpoints)
  - [System](#system-endpoints)
  - [Catalog](#catalog-endpoints)
  - [Kits](#kits-endpoints)
  - [Checkout](#checkout-endpoints)
- [Padrões HTTP](#-padrões-http)
  - [Paginação (RFC 8288)](#paginação-rfc-8288)
  - [Cache (RFC 9111)](#cache-rfc-9111)
  - [Erros (RFC 9457)](#erros-rfc-9457)
  - [CORS](#cors)
- [Exemplos](#-exemplos)
- [Testes](#-testes)

---

## 🎯 Visão Geral

A API do Yello Solar Hub é uma **API RESTful** construída com **Next.js 15 App Router** que atua como orquestrador/proxy para o backend **Medusa v2**. A API normaliza dados do domínio solar (kits fotovoltaicos, painéis, inversores, baterias) e implementa padrões modernos de HTTP.

### Características

- ✅ **OpenAPI 3.1** (JSON Schema Draft 2020-12)
- ✅ **RFC 9457** - Problem Details para erros padronizados
- ✅ **RFC 8288** - Link header para paginação
- ✅ **RFC 9111** - Cache HTTP (Cache-Control, ETag)
- ✅ **CORS** completo com preflight (OPTIONS)
- ✅ **TypeScript** strict mode
- ✅ **Testes** de contrato e smoke

### Taxonomia Solar

**14 Categorias**:

- **5 Kits**: On-Grid, Off-Grid Interativo, Zero-Grid, Híbrido, Antiapagão
- **9 Produtos**: Painéis Solares, Baterias, Inversores, Carregadores EV, Medidor Grid-Zero, String Box, Estruturas, Bomba de Água, Transformador

**42 Produtos** (3 por categoria) com metadados (potência, marca, SKU)

---

## 🚀 Quickstart

### 1. Iniciar Stack

```bash
# Terminal 1: Infra (PostgreSQL + Redis)
docker compose up -d

# Terminal 2: Backend Medusa
cd YSH_backend
pnpm dev:api

# Terminal 3: Frontend + API
cd YSH_storefront
pnpm dev:web
```

### 2. Testar Health Check

```bash
curl http://localhost:3000/api/health
```

**Response 200**:

```json
{
  "ok": true,
  "timestamp": "2025-10-06T12:00:00Z",
  "service": "yello-solar-hub-storefront",
  "version": "1.0.0"
}
```

### 3. Listar Categorias

```bash
curl http://localhost:3000/api/catalog/categories
```

**Response 200** (headers):

```
Cache-Control: public, max-age=60, stale-while-revalidate=600
ETag: "abc123"
X-Total-Count: 14
Vary: Origin
```

**Response 200** (body):

```json
{
  "data": [
    {
      "id": "cat_kit_on_grid",
      "name": "Kit On-Grid",
      "handle": "kit-on-grid",
      "parent_id": null,
      "description": "Sistemas solares conectados à rede elétrica"
    }
  ],
  "meta": {
    "total": 14
  }
}
```

### 4. Buscar Produtos

```bash
curl "http://localhost:3000/api/catalog/products?category=cat_paineis_solares&limit=5"
```

**Response 200**:

```json
{
  "data": [
    {
      "id": "prod_01HXYZ",
      "title": "Painel Solar 550W",
      "handle": "painel-solar-550w",
      "thumbnail": "https://picsum.photos/seed/prod-1/800/600",
      "price": 1250.00,
      "currency": "BRL",
      "sku": "SKU-PAINEL-550W"
    }
  ],
  "meta": {
    "total": 3,
    "facets": {
      "price": { "min": 1000, "max": 2000 },
      "power_watts": [550, 600, 650]
    }
  }
}
```

---

## 🔐 Autenticação

A API pública **não requer autenticação** para operações de leitura (GET). Internamente, todas as chamadas ao Medusa Store API incluem:

- **Header**: `x-publishable-api-key` (configurado via `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`)
- **Credentials**: `include` (para manter sessão/cookies)

Para operações de checkout (POST), o carrinho é gerenciado via cookies de sessão do Medusa.

---

## 📡 Endpoints

### System Endpoints

#### GET `/api/health`

Health check do serviço.

**Response 200**:

```json
{
  "ok": true,
  "timestamp": "2025-10-06T12:00:00Z",
  "service": "yello-solar-hub-storefront",
  "version": "1.0.0"
}
```

**Headers**:

- `Cache-Control: no-cache, no-store, must-revalidate`

---

#### GET `/api/version`

Informações de versão e build.

**Response 200**:

```json
{
  "version": "1.0.0",
  "commit": "abc123def456",
  "builtAt": "2025-10-06T10:00:00Z",
  "environment": "production"
}
```

**Headers**:

- `Cache-Control: public, max-age=3600`

---

### Catalog Endpoints

#### GET `/api/catalog/categories`

Lista categorias com paginação.

**Query Parameters**:

- `limit` (1-100, default 20): Máximo de itens por página
- `cursor` (string): Cursor de paginação (opaco)
- `parent` (string): Filtrar por categoria pai (ID ou handle)
- `q` (string): Busca textual

**Example**:

```bash
curl "http://localhost:3000/api/catalog/categories?limit=10&q=solar"
```

**Response 200**:

```json
{
  "data": [
    {
      "id": "cat_paineis_solares",
      "name": "Painéis Solares",
      "handle": "paineis-solares",
      "parent_id": null
    }
  ],
  "meta": {
    "total": 14
  }
}
```

**Headers** (RFC 8288 + RFC 9111):

```
Link: </api/catalog/categories?cursor=20&limit=10>; rel="next"
X-Total-Count: 14
Cache-Control: public, max-age=60, stale-while-revalidate=600
ETag: "abc123"
Vary: Origin
```

---

#### GET `/api/catalog/products`

Lista produtos com filtros, ordenação e paginação.

**Query Parameters**:

- `limit` (1-100, default 24): Máximo de itens
- `cursor` (string): Cursor de paginação
- `category` (string): Filtrar por categoria (ID ou handle)
- `q` (string): Busca textual
- `sort` (string): Ordenação
  - `price.asc` / `price.desc`
  - `title.asc` / `title.desc`
  - `created_at.desc`

**Example**:

```bash
curl "http://localhost:3000/api/catalog/products?category=cat_kit_on_grid&sort=price.asc&limit=24"
```

**Response 200**:

```json
{
  "data": [
    {
      "id": "prod_01HXYZ",
      "title": "Kit On-Grid 5kWp",
      "handle": "kit-on-grid-5kwp",
      "thumbnail": "https://picsum.photos/seed/kit-1/800/600",
      "description": "Kit completo para geração solar",
      "price": 25000.00,
      "currency": "BRL",
      "sku": "SKU-KIT-ON-GRID-5KWP"
    }
  ],
  "meta": {
    "total": 42,
    "facets": {
      "price": { "min": 5000, "max": 50000 },
      "brands": ["Intelbras", "Fronius"],
      "power_watts": [5000, 10000, 15000]
    }
  }
}
```

---

#### GET `/api/products/:idOrHandle`

Detalhes de um produto por ID ou handle (slug).

**Example**:

```bash
curl http://localhost:3000/api/products/kit-on-grid-5kwp
```

**Response 200**:

```json
{
  "data": {
    "id": "prod_01HXYZ",
    "title": "Kit On-Grid 5kWp",
    "handle": "kit-on-grid-5kwp",
    "description": "Kit completo...",
    "images": [
      "https://picsum.photos/800/600",
      "https://picsum.photos/800/601"
    ],
    "variants": [
      {
        "id": "variant_01",
        "title": "Padrão",
        "sku": "SKU-KIT-ON-GRID-5KWP",
        "prices": [
          { "amount": 25000.00, "currency_code": "BRL" }
        ]
      }
    ],
    "categories": [
      { "id": "cat_kit_on_grid", "name": "Kit On-Grid", "handle": "kit-on-grid" }
    ]
  }
}
```

**Headers**:

- `Cache-Control: public, max-age=120, stale-while-revalidate=600`
- `ETag: "xyz789"`

**Response 404** (RFC 9457):

```json
{
  "type": "https://yello.solar/errors/not-found",
  "title": "Produto não encontrado",
  "status": 404,
  "detail": "O produto com identificador 'invalid-id' não foi encontrado",
  "instance": "/api/products/invalid-id"
}
```

---

#### GET `/api/facets`

Agregações para filtros (faixa de preço, marcas, potências).

**Query Parameters**:

- `category` (string): Filtrar facets por categoria
- `q` (string): Busca textual

**Example**:

```bash
curl "http://localhost:3000/api/facets?category=cat_paineis_solares"
```

**Response 200**:

```json
{
  "data": {
    "price": {
      "min": 1000.00,
      "max": 2000.00
    },
    "brands": ["Canadian Solar", "Jinko", "Trina"],
    "power_watts": [550, 600, 650]
  }
}
```

---

### Kits Endpoints

#### GET `/api/kits/:type`

Produtos de um tipo específico de kit solar.

**Tipos Válidos**:

- `on-grid` → Sistema conectado à rede
- `off-grid-interativo` → Sistema isolado com backup
- `zero-grid` → Consumo zero da rede
- `hibrido` → On-grid + baterias
- `antiapagao` → Backup para quedas de energia

**Example**:

```bash
curl http://localhost:3000/api/kits/on-grid
```

**Response 200**:

```json
{
  "data": [
    {
      "id": "prod_kit_on_grid_1",
      "title": "Kit On-Grid 5kWp",
      "handle": "kit-on-grid-5kwp",
      "price": 25000.00,
      "currency": "BRL"
    }
  ],
  "meta": {
    "total": 3,
    "kitType": "on-grid",
    "categoryId": "cat_kit_on_grid"
  }
}
```

**Response 400** (tipo inválido):

```json
{
  "type": "https://yello.solar/errors/validation",
  "title": "Tipo de kit inválido",
  "status": 400,
  "detail": "O tipo 'invalid' não é válido. Tipos válidos: on-grid, off-grid-interativo, ...",
  "instance": "/api/kits/invalid",
  "errors": [
    { "path": "type", "message": "Tipo de kit inválido" }
  ]
}
```

---

### Checkout Endpoints

#### POST `/api/checkout/carts`

Cria novo carrinho de compras.

**Request Body** (JSON):

```json
{
  "region_id": "reg_01HXYZ",
  "country_code": "BR",
  "email": "cliente@example.com"
}
```

**Response 201**:

```json
{
  "data": {
    "id": "cart_01HXYZ",
    "email": "cliente@example.com",
    "items": [],
    "subtotal": 0,
    "total": 0,
    "currency_code": "BRL"
  }
}
```

---

#### POST `/api/checkout/carts/:id/line-items`

Adiciona item ao carrinho.

**Request Body**:

```json
{
  "variant_id": "variant_01HXYZ",
  "quantity": 2
}
```

**Response 200**:

```json
{
  "data": {
    "id": "cart_01HXYZ",
    "items": [
      {
        "id": "item_01",
        "variant_id": "variant_01HXYZ",
        "title": "Kit On-Grid 5kWp",
        "quantity": 2,
        "unit_price": 25000.00,
        "total": 50000.00
      }
    ],
    "subtotal": 50000.00,
    "total": 50000.00
  }
}
```

**Response 400** (validação):

```json
{
  "type": "https://yello.solar/errors/validation",
  "title": "Dados inválidos",
  "status": 400,
  "detail": "O campo variant_id é obrigatório",
  "instance": "/api/checkout/carts/cart_01/line-items",
  "errors": [
    { "path": "variant_id", "message": "Campo obrigatório" }
  ]
}
```

---

#### POST `/api/checkout/sessions`

Inicia sessão de checkout/pagamento.

**Request Body**:

```json
{
  "cart_id": "cart_01HXYZ",
  "provider_id": "stripe"
}
```

**Response 201**:

```json
{
  "data": {
    "id": "session_01",
    "cart_id": "cart_01HXYZ",
    "status": "pending"
  }
}
```

---

## 📏 Padrões HTTP

### Paginação (RFC 8288)

Listas usam **cursor-based pagination** com o header `Link` (RFC 8288):

**Headers**:

```
Link: </api/catalog/products?cursor=24&limit=24>; rel="next", </api/catalog/products?cursor=0&limit=24>; rel="prev"
X-Total-Count: 42
```

**Parâmetros**:

- `limit`: 1-100 (default depende do endpoint)
- `cursor`: String opaca (geralmente offset numérico)

---

### Cache (RFC 9111)

Todas as rotas GET incluem headers de cache:

**Headers**:

```
Cache-Control: public, max-age=60, stale-while-revalidate=600
ETag: "abc123def456"
Vary: Origin
```

**Valores típicos**:

- **Catálogo** (categories, products): `max-age=60, swr=600`
- **Detalhe** (product detail): `max-age=120, swr=600`
- **Facets**: `max-age=120, swr=600`
- **Health**: `no-cache, no-store, must-revalidate`
- **Version**: `max-age=3600`

---

### Erros (RFC 9457)

Todos os erros 4xx/5xx seguem **RFC 9457 - Problem Details**:

**Media Type**: `application/problem+json`

**Estrutura**:

```json
{
  "type": "https://yello.solar/errors/validation",
  "title": "Parâmetro inválido",
  "status": 400,
  "detail": "O parâmetro 'limit' deve estar entre 1 e 100",
  "instance": "/api/catalog/products",
  "errors": [
    {
      "path": "limit",
      "message": "Valor deve estar entre 1 e 100"
    }
  ]
}
```

**Campos**:

- `type` (required): URI identificando o tipo de erro
- `title` (required): Resumo legível
- `status` (required): Código HTTP
- `detail` (optional): Explicação detalhada
- `instance` (optional): URI da ocorrência específica
- `errors` (optional): Array de erros de validação

**Tipos comuns**:

- `https://yello.solar/errors/validation` → 400
- `https://yello.solar/errors/not-found` → 404
- `https://yello.solar/errors/internal` → 500

---

### CORS

Todas as rotas suportam **CORS** com preflight (OPTIONS):

**Headers**:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, x-publishable-api-key
Access-Control-Max-Age: 86400
Vary: Origin
```

**Preflight (OPTIONS)**:

```bash
curl -X OPTIONS http://localhost:3000/api/catalog/categories \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET"
```

**Response 204** (sem body).

---

## 💡 Exemplos

### Exemplo 1: Listar Kits On-Grid com Preços Crescentes

```bash
curl "http://localhost:3000/api/kits/on-grid?sort=price.asc&limit=10"
```

**Response**:

```json
{
  "data": [
    { "id": "prod_1", "title": "Kit On-Grid 3kWp", "price": 15000.00 },
    { "id": "prod_2", "title": "Kit On-Grid 5kWp", "price": 25000.00 },
    { "id": "prod_3", "title": "Kit On-Grid 10kWp", "price": 45000.00 }
  ],
  "meta": { "total": 3, "kitType": "on-grid" }
}
```

---

### Exemplo 2: Buscar Painéis com Potência ≥600W

```bash
# 1. Obter facets
curl "http://localhost:3000/api/facets?category=cat_paineis_solares"

# 2. Filtrar produtos (cliente-side ou backend customizado)
curl "http://localhost:3000/api/catalog/products?category=cat_paineis_solares"
# Filtrar no cliente: data.filter(p => p.metadata.power_watts >= 600)
```

---

### Exemplo 3: Adicionar Produto ao Carrinho

```bash
# 1. Criar carrinho
CART=$(curl -X POST http://localhost:3000/api/checkout/carts \
  -H "Content-Type: application/json" \
  -d '{"country_code":"BR","email":"cliente@example.com"}' \
  | jq -r '.data.id')

# 2. Adicionar item
curl -X POST "http://localhost:3000/api/checkout/carts/$CART/line-items" \
  -H "Content-Type: application/json" \
  -d '{"variant_id":"variant_01HXYZ","quantity":2}'
```

---

### Exemplo 4: Verificar Cache com ETag

```bash
# 1. Primeira requisição
curl -i http://localhost:3000/api/catalog/categories

# Response headers:
# ETag: "abc123"
# Cache-Control: public, max-age=60, stale-while-revalidate=600

# 2. Segunda requisição (com ETag)
curl -i http://localhost:3000/api/catalog/categories \
  -H "If-None-Match: \"abc123\""

# Response: 304 Not Modified (se não houver mudanças)
```

---

## 🧪 Testes

### Rodar Testes

```bash
# Instalar dependências de teste
pnpm install

# Smoke tests (básicos)
pnpm test:api:smoke

# Contract tests (valida OpenAPI)
pnpm test:api:contract

# Todos os testes API
pnpm test:api

# Watch mode
pnpm test:watch
```

### Validar OpenAPI Spec

```bash
# Validar sintaxe YAML
pnpm validate:openapi

# Ou manualmente
swagger-cli validate public/api-spec/openapi.yaml
```

### Coverage Esperado

- ✅ **G-API1**: OpenAPI 3.1 válido (JSON Schema Draft 2020-12)
- ✅ **G-API2**: Erros 4xx/5xx usam RFC 9457 (`application/problem+json`)
- ✅ **G-API3**: Listas incluem `Link` header (RFC 8288) + `X-Total-Count`
- ✅ **G-API4**: GETs com `Cache-Control` + `ETag` (RFC 9111)
- ✅ **G-API5**: CORS correto (OPTIONS 204 + headers)
- ✅ **G-API6**: Chamadas Medusa usam `x-publishable-api-key`

---

## 🔗 Referências

### RFCs & Normas

- [RFC 9457 - Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html)
- [RFC 8288 - Web Linking](https://www.rfc-editor.org/rfc/rfc8288.html)
- [RFC 9111 - HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
- [RFC 9110 - HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### Medusa Docs

- [Medusa Store API](https://docs.medusajs.com/api/store)
- [Publishable API Keys](https://docs.medusajs.com/modules/sales-channels/publishable-api-keys)

### Next.js Docs

- [Route Handlers (App Router)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 📝 Changelog

### v1.0.0 (2025-10-06)

**Entregas**:

- ✅ 10 rotas API implementadas (health, version, catalog, kits, checkout)
- ✅ OpenAPI 3.1 spec completa (1000+ linhas)
- ✅ RFC 9457 (Problem Details) para todos os erros
- ✅ RFC 8288 (Link header) para paginação
- ✅ RFC 9111 (Cache-Control + ETag) em GETs
- ✅ CORS completo com OPTIONS
- ✅ Medusa v2 Store API integration (x-publishable-api-key)
- ✅ Testes smoke + contract (30+ casos)
- ✅ Documentação completa (este arquivo)

**Decisões Técnicas**:

- **Cursor-based pagination** (offset numérico como cursor) para simplicidade
- **ETag simples** (hash do conteúdo) - considerar MD5/SHA256 em produção
- **Facets básicos** (agregação local) - considerar search engine (Meilisearch) para filtros complexos
- **CORS permissivo** (`*` em dev) - restringir em produção

**Próximos Passos**:

1. Rate limiting (draft RFC - RateLimit/RateLimit-Policy headers)
2. WebSockets para atualizações em tempo real (estoque, preços)
3. GraphQL endpoint alternativo
4. API versioning (v2, v3)
5. Compressão (gzip/brotli) para responses grandes
6. CDN para assets (imagens Picsum → S3/CloudFront)

---

**Contato**: <support@yello.solar>  
**License**: MIT
