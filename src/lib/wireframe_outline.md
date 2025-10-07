# Wireframe Outline - YSH Marketplace Architecture

**Version**: 1.0.0  
**Date**: October 7, 2025  
**Framework**: Next.js 15 App Router + Medusa v2  
**Design System**: shadcn/ui + Tailwind + Yello Brand  

---

## 🎯 Page Architecture Overview

```tsx
YSH_storefront/
├── / (Home)
├── /journeys (Journey 360º Hub)
│   └── /[segment] (Journey Segment Pages)
├── /sistemas-fotovoltaicos (Solar Systems Catalog)
│   ├── /residencial-b1
│   ├── /rural-b2
│   ├── /comercial-b3
│   └── /industrial-grupo-a
├── /otimizacao-expansao (Optimization & Expansion)
│   ├── /calculadora-roi
│   ├── /comparador-tarifas
│   └── /expansao-sistema
├── /products (Product Catalog)
│   ├── /[handle] (PDP)
│   └── /compare (Product Comparison)
├── /configurador (System Configurator)
│   ├── /consumo
│   ├── /instalacao
│   ├── /equipamentos
│   └── /revisao
├── /financiamento (Financing Hub)
│   ├── /simulador
│   ├── /pronaf (B2 Rural)
│   ├── /ppa (OPEX Model)
│   └── /leasing
├── /checkout (Checkout Flow)
│   ├── /address
│   ├── /delivery
│   ├── /payment
│   └── /review
├── /account (Customer Portal)
│   ├── /dashboard (Energy Monitoring)
│   ├── /orders (Order History)
│   ├── /installation (Installation Tracker)
│   └── /loyalty (Loyalty Program)
└── /geracao-remota (Remote Generation)
    ├── /localizacoes
    └── /multiplas-ucs
```

---

## 📄 Page Specifications

### 1. Home Page `/`

**Purpose**: Hero landing, value proposition, journey entry points  
**Journey Stage**: Discover  
**Target Audience**: All personas (B1/B2/B3/A)

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ Navigation Bar                          │
├─────────────────────────────────────────┤
│ HERO SECTION                            │
│ - Yello Logo (animated)                 │
│ - Headline: "Energia Solar Inteligente" │
│ - CTAs: Explorar / Calcular Economia    │
│ - Background: Gradient geist→yellow→white│
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ROI CALCULATOR WIDGET (inline)          │
│ - Input: Conta mensal (R$)             │
│ - Output: Economia estimada             │
│ - CTA: Configurar Sistema               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ JOURNEY CARDS (3-column grid)           │
│ ┌─────┐ ┌─────┐ ┌─────┐                │
│ │ B1  │ │ B2  │ │ B3  │                │
│ │Resi │ │Rural│ │Comer│                │
│ └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FEATURED PRODUCTS (carousel)            │
│ - Top kits por categoria                │
│ - Quick view + Add to cart              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SOCIAL PROOF                            │
│ - Testimonials                          │
│ - Statistics: 5000+ clientes            │
│ - Case studies links                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FOOTER                                  │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<Hero />` with gradient text
- `<ROICalculatorWidget />` (inline)
- `<JourneyCards />` (3 cards: B1, B2, B3)
- `<FeaturedProductsCarousel />`
- `<SocialProof />`

**State Management**:

- Calculator: local state (billAmount, savings)
- No auth required
- Analytics: `view_home`, `calculate_roi_home`, `select_journey_[classe]`

**Acceptance Criteria**:

- [ ] Hero loads <1s, LCP <2.5s
- [ ] Calculator inline, no page reload
- [ ] Mobile-first, responsive breakpoints
- [ ] Data-testid: `home-hero`, `home-calculator`, `home-journey-cards`

---

### 2. Journey 360º Hub `/journeys`

**Purpose**: Comprehensive journey overview, regulatory segments  
**Journey Stage**: Discover  
**Target Audience**: All personas exploring journeys

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Jornada Solar 360º"          │
│ - Badge: "Navegação Guiada"            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ JOURNEY STAGES (5-step timeline)        │
│ 1─────2─────3─────4─────5               │
│ Discover│Build│Dim│Conv│Post            │
│ - Icons, descriptions, links            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ REGULATORY SEGMENTS (grid 2x3)          │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ B1   │ │ B2   │ │ B3   │             │
│ │Resid.│ │Rural │ │Comer.│             │
│ └──────┘ └──────┘ └──────┘             │
│ ┌──────┐ ┌──────┐                      │
│ │Média │ │Público│                     │
│ │Tensão│ │Setor │                      │
│ └──────┘ └──────┘                      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ MODALIDADES SCEE (4 cards)              │
│ - Autoconsumo Local                     │
│ - Autoconsumo Remoto                    │
│ - Múltiplas UCs                         │
│ - Geração Compartilhada                 │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<SolarBuyerJourney />` (template)
- `<JourneyStagesTimeline />` (5 stages)
- `<RegulatorySegmentsGrid />` (5 cards)
- `<SCEEModalities />` (4 cards)

**Data Source**:

- `journeys.json` - All 8 journey definitions
- `JOURNEY_STAGES` map (5 stages)
- `SEGMENTS` map (5 regulatory segments)

**Analytics**:

- `view_journey_360`
- `click_stage_[stage_id]`
- `select_segment_[segment_key]`

**Acceptance Criteria**:

- [ ] All 5 stages clickable, navigate to relevant sections
- [ ] All 5 segments clickable, navigate to `/journeys/[segment]`
- [ ] 15+ data-testids implemented
- [ ] Data-testid: `solar-buyer-journey`, `journey-stage-{stage}`, `segment-card-{segment}`

---

### 3. Journey Segment Pages `/journeys/[segment]`

**Purpose**: Segment-specific journey details (B1, B2, B3, MT, Public)  
**Journey Stage**: Discover  
**Target Audience**: Persona-specific (e.g., B1 residential)

**Dynamic Routes**:

- `/journeys/residential-b1`
- `/journeys/rural-b2`
- `/journeys/commercial-b3`
- `/journeys/medium-voltage`
- `/journeys/public-sector`

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "[Segment Name] Journey"      │
│ - Badge: Regulatory class (B1/B2/B3/A) │
│ - Description: Segment-specific copy   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ HIGHLIGHTS GRID (2x2)                   │
│ ┌──────────┐ ┌──────────┐              │
│ │Consumo   │ │Geração   │              │
│ │Profile   │ │Potential │              │
│ └──────────┘ └──────────┘              │
│ ┌──────────┐ ┌──────────┐              │
│ │Journey   │ │UX        │              │
│ │Stages    │ │Features  │              │
│ └──────────┘ └──────────┘              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ JOURNEY STAGES (segment-specific)       │
│ - Stage 1: Discover (objectives, KPIs)  │
│ - Stage 2: Configure (tools, barriers) │
│ - Stage 3: Finance (options, risks)    │
│ - Stage 4: Homologate (milestones)     │
│ - Stage 5: Post-Sale (upsells, NPS)    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PRODUCT CATEGORIES (3-column)           │
│ - Kits (filtered by segment)            │
│ - Components (panels, inverters)        │
│ - Accessories (cables, structures)      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ CTA SECTION                             │
│ - Primary: "Configurar Sistema"         │
│ - Secondary: "Falar com Especialista"   │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<JourneySegmentHeader />` with badge
- `<HighlightsGrid />` (4 cards)
- `<JourneyStagesAccordion />` (5 stages, segment-specific data from `journeys.json`)
- `<SegmentProductCategories />` (kits, components, accessories)
- `<CTASection />`

**Data Source**:

- `journeys.json` - Filter by `journey_key` matching segment
- Medusa API: `/products?tags=[segment]`

**generateStaticParams**:

```typescript
export async function generateStaticParams() {
  return [
    { segment: 'residential-b1' },
    { segment: 'rural-b2' },
    { segment: 'commercial-b3' },
    { segment: 'medium-voltage' },
    { segment: 'public-sector' }
  ]
}
```

**Analytics**:

- `view_journey_segment_[segment]`
- `expand_stage_[stage_id]`
- `click_configure_system_[segment]`

**Acceptance Criteria**:

- [ ] 5 static routes generated at build time
- [ ] Journey data loaded from `journeys.json` per segment
- [ ] 7+ data-testids per page
- [ ] Data-testid: `journey-segment-page`, `segment-card-{highlight}`, `journey-stage-{stage}`

---

### 4. Systems Catalog `/sistemas-fotovoltaicos`

**Purpose**: Browse solar systems by regulatory class  
**Journey Stage**: Discover → Configure  
**Target Audience**: All personas

**Sub-routes**:

- `/sistemas-fotovoltaicos/residencial-b1`
- `/sistemas-fotovoltaicos/rural-b2`
- `/sistemas-fotovoltaicos/comercial-b3`
- `/sistemas-fotovoltaicos/industrial-grupo-a`

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ BREADCRUMB                              │
│ Home > Sistemas Fotovoltaicos > B1     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FILTERS SIDEBAR (left 25%)              │
│ - Potência (kWp): range slider          │
│ - Preço (R$): range slider              │
│ - Marca: checkboxes                     │
│ - Certificação: badges                  │
│ - Disponibilidade: in stock             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PRODUCTS GRID (right 75%, 3-col)        │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ Kit  │ │ Kit  │ │ Kit  │             │
│ │ 5kWp │ │ 10kW │ │ 15kW │             │
│ └──────┘ └──────┘ └──────┘             │
│ - Thumbnail, title, price, ROI badge   │
│ - Add to cart, compare, quick view     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PAGINATION                              │
│ < 1 2 3 4 5 >                          │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<ProductFilters />` (sidebar)
- `<ProductGrid />` (3-column grid)
- `<ProductCard />` (with testids from previous implementation)
- `<Pagination />`

**Data Source**:

- Medusa API: `/products?collection=[segment]&limit=12&offset=0`
- Filter params: `price_min`, `price_max`, `power_min`, `power_max`, `brand`

**Analytics**:

- `view_systems_catalog_[classe]`
- `filter_products_[filter_type]`
- `click_product_[handle]`

**Acceptance Criteria**:

- [ ] Filters persist in URL query params
- [ ] Infinite scroll or pagination
- [ ] Product cards have all testids (6 per card)
- [ ] Data-testid: `product-filters`, `product-grid`, `product-card-{handle}`

---

### 5. Product Detail Page `/products/[handle]`

**Purpose**: Detailed product view with specs, reviews, upsells  
**Journey Stage**: Configure  
**Target Audience**: All personas

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ BREADCRUMB                              │
│ Home > Kits > Kit Fotovoltaico 10kWp   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PRODUCT MAIN (2-column)                 │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ IMAGE        │ │ INFO         │      │
│ │ GALLERY      │ │ - Title      │      │
│ │ (carousel)   │ │ - Price      │      │
│ │              │ │ - Specs      │      │
│ │              │ │ - Variants   │      │
│ │              │ │ - Actions    │      │
│ └──────────────┘ └──────────────┘      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ TABS                                    │
│ [Descrição] [Especificações] [Avaliações]│
│ - Rich content, tables, reviews        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ TECHNICAL SPECS (grid)                  │
│ - Potência nominal (Wp)                 │
│ - Eficiência (%)                        │
│ - Tensão máxima (V)                     │
│ - Corrente máxima (A)                   │
│ - Garantia (anos)                       │
│ - Certificações (INMETRO, IEC)         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ROI CALCULATOR (embedded)               │
│ - Input: consumo mensal                 │
│ - Output: payback estimado              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ UPSELL RECOMMENDATIONS                  │
│ - "Complete seu sistema com:"           │
│ - Inversor compatível                   │
│ - Baterias                              │
│ - Estrutura de fixação                  │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ RELATED PRODUCTS (carousel)             │
│ - Kits similares (mesma potência)       │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<ProductTemplate />` (template)
- `<ImageGallery />` (carousel)
- `<ProductInfo />` (title, price, variants)
- `<ProductActions />` (add to cart, buy now)
- `<ProductTabs />` (description, specs, reviews)
- `<TechnicalSpecs />` (table)
- `<ROICalculatorEmbed />` (widget)
- `<UpsellRecommendations />` (4 products)
- `<RelatedProducts />` (carousel)

**Data Source**:

- Medusa API: `/products/[handle]`
- Related: `/products?collection=[same_collection]&limit=8`

**Analytics**:

- `view_product_[handle]`
- `calculate_roi_pdp_[handle]`
- `add_to_cart_[handle]`
- `click_upsell_[upsell_handle]`

**Acceptance Criteria**:

- [ ] Image gallery with zoom, thumbnails
- [ ] Variant selector (if applicable)
- [ ] ROI calculator embedded, pre-filled with product data
- [ ] Upsells based on product category
- [ ] Data-testid: `product-template`, `product-gallery`, `product-actions`, `roi-calculator-embed`

---

### 6. Product Comparison `/products/compare`

**Purpose**: Side-by-side product comparison  
**Journey Stage**: Configure  
**Target Audience**: All personas comparing options

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Comparar Produtos"            │
│ - Instructions: "Selecione até 4"       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PRODUCT SELECTOR (search + autocomplete)│
│ [Buscar produtos...] [+ Adicionar]     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ COMPARISON TABLE (4 columns)            │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Prod1│ │Prod2│ │Prod3│ │Prod4│        │
│ │Image│ │Image│ │Image│ │Image│        │
│ ├─────┤ ├─────┤ ├─────┤ ├─────┤        │
│ │Título                               │
│ │Preço                                │
│ │Potência (kWp)                       │
│ │Eficiência (%)                       │
│ │Garantia (anos)                      │
│ │Certificações                        │
│ │ROI estimado                         │
│ │Disponibilidade                      │
│ ├─────┤ ├─────┤ ├─────┤ ├─────┤        │
│ │[Cart]│[Cart]│[Cart]│[Cart]│        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ COMPARISON ACTIONS                      │
│ - [Limpar Comparação]                   │
│ - [Exportar PDF]                        │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<ProductComparisonTable />` (from ui_backlog.md #4)
- `<ProductSelector />` (search with autocomplete)
- `<ComparisonRow />` (attribute row)
- `<ComparisonActions />` (clear, export PDF)

**State Management**:

- Selected products: URL query params `?products=handle1,handle2,handle3`
- Persist in localStorage
- Max 4 products

**Data Source**:

- Medusa API: `/products?handle[in]=handle1,handle2,handle3`

**Analytics**:

- `view_comparison`
- `add_product_to_comparison_[handle]`
- `remove_product_from_comparison_[handle]`
- `export_comparison_pdf`

**Acceptance Criteria**:

- [ ] Compare up to 4 products
- [ ] URL params persist selection
- [ ] Export to PDF with branding
- [ ] Data-testid: `comparison-table`, `comparison-product-{1-4}`, `comparison-actions`

---

### 7. System Configurator `/configurador`

**Purpose**: Multi-step wizard to configure custom system  
**Journey Stage**: Configure  
**Target Audience**: All personas (wizard adapts by class)

**Sub-routes (steps)**:

- `/configurador/consumo` (Step 1: Consumption Profile)
- `/configurador/instalacao` (Step 2: Installation Type)
- `/configurador/equipamentos` (Step 3: Equipment Selection)
- `/configurador/revisao` (Step 4: Review & Add to Cart)

**Layout Structure (Step 1)**:

```tsx
┌─────────────────────────────────────────┐
│ PROGRESS BAR                            │
│ [1●───2○───3○───4○]                    │
│ Consumo│Instalação│Equipamentos│Revisão │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ STEP 1: PERFIL DE CONSUMO               │
│                                         │
│ Opção 1: Upload Fatura (OCR)           │
│ [Arrastar PDF/imagem] ou [Navegar]     │
│                                         │
│ Opção 2: Entrada Manual                │
│ - Consumo mensal (kWh): [_____]        │
│ - Conta mensal (R$): [_____]           │
│ - Classe tarifária: [B1▼]              │
│ - Tarifa: [Convencional▼]              │
│                                         │
│ [← Voltar] [Continuar →]               │
└─────────────────────────────────────────┘
```

**Layout Structure (Step 2)**:

```tsx
┌─────────────────────────────────────────┐
│ PROGRESS BAR                            │
│ [1●───2●───3○───4○]                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ STEP 2: TIPO DE INSTALAÇÃO              │
│                                         │
│ [ ] Telhado                             │
│     - Tipo: [Cerâmico▼]                 │
│     - Área disponível (m²): [___]       │
│     - Orientação: [Norte▼]              │
│                                         │
│ [ ] Laje                                │
│     - Área disponível (m²): [___]       │
│                                         │
│ [ ] Solo                                │
│     - Área disponível (m²): [___]       │
│                                         │
│ [← Voltar] [Continuar →]               │
└─────────────────────────────────────────┘
```

**Layout Structure (Step 3)**:

```tsx
┌─────────────────────────────────────────┐
│ PROGRESS BAR                            │
│ [1●───2●───3●───4○]                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ STEP 3: SELEÇÃO DE EQUIPAMENTOS         │
│                                         │
│ RECOMENDAÇÃO AUTOMÁTICA                 │
│ ┌─────────────────────────────┐         │
│ │ Kit Residencial 10kWp       │         │
│ │ - 20x Painel 550Wp          │         │
│ │ - 1x Inversor 10kW          │         │
│ │ - Estrutura completa        │         │
│ │ R$ 25.000,00                │         │
│ │ [Usar Recomendação]         │         │
│ └─────────────────────────────┘         │
│                                         │
│ OU PERSONALIZAR                         │
│ - Painéis: [Canadian Solar 550Wp▼]     │
│   Quantidade: [20]                      │
│ - Inversor: [Growatt 10kW▼]            │
│   Quantidade: [1]                       │
│ - Estrutura: [Alumínio▼]               │
│                                         │
│ [← Voltar] [Continuar →]               │
└─────────────────────────────────────────┘
```

**Layout Structure (Step 4)**:

```tsx
┌─────────────────────────────────────────┐
│ PROGRESS BAR                            │
│ [1●───2●───3●───4●]                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ STEP 4: REVISÃO                         │
│                                         │
│ RESUMO DO SISTEMA                       │
│ - Potência total: 10 kWp               │
│ - Geração estimada: 1.250 kWh/mês      │
│ - Economia estimada: R$ 850/mês         │
│ - Payback: 3.2 anos                     │
│                                         │
│ EQUIPAMENTOS                            │
│ - 20x Painel Canadian Solar 550Wp      │
│ - 1x Inversor Growatt 10kW             │
│ - 1x Estrutura Alumínio                │
│                                         │
│ VALOR TOTAL: R$ 25.000,00               │
│                                         │
│ [← Voltar] [Adicionar ao Carrinho →]   │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<SystemConfiguratorWizard />` (from ui_backlog.md #2)
- `<ConsumptionProfiler />` (Step 1, with OCR)
- `<RoofAssessment />` (Step 2)
- `<EquipmentSelector />` (Step 3)
- `<ConfigurationReview />` (Step 4)
- `<ProgressBar />` (4 steps)

**State Management**:

- Wizard state: React Context or Zustand
- Persist in sessionStorage per step
- AI recommendation: API call on step transition

**Data Source**:

- OCR API: `/api/ocr/parse-bill` (YSH_backend + ai-geovisio)
- Sizing API: `/api/sizing/recommend` (YSH_backend + ai-geovisio)
- Products API: `/products?category=panels|inverters|structures`

**Analytics**:

- `start_configurator`
- `complete_step_[1-4]`
- `use_ocr_upload`
- `use_manual_input`
- `use_recommended_kit`
- `customize_equipment`
- `add_configuration_to_cart`

**Acceptance Criteria**:

- [ ] 4-step wizard with progress bar
- [ ] OCR upload with loading state
- [ ] AI recommendation within 5s
- [ ] Persist state across steps (sessionStorage)
- [ ] Data-testid: `configurator-wizard`, `configurator-step-{1-4}`, `progress-bar`

---

### 8. Financing Hub `/financiamento`

**Purpose**: Financing options and simulation  
**Journey Stage**: Finance  
**Target Audience**: All personas needing financing

**Sub-routes**:

- `/financiamento/simulador` (Main simulator)
- `/financiamento/pronaf` (B2 rural subsidies)
- `/financiamento/ppa` (OPEX model for enterprises)
- `/financiamento/leasing` (Leasing option)

**Layout Structure (`/simulador`)**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Simular Financiamento"       │
│ - Subtitle: "Parcelas a partir de R$" │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FINANCING SIMULATOR (2-column)          │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ INPUTS       │ │ RESULTS      │      │
│ │              │ │              │      │
│ │ Valor (R$):  │ │ Parcela:     │      │
│ │ [25000]      │ │ R$ 450/mês   │      │
│ │              │ │              │      │
│ │ Entrada (%): │ │ Total juros: │      │
│ │ [20%]        │ │ R$ 5.400     │      │
│ │              │ │              │      │
│ │ Prazo:       │ │ Payback:     │      │
│ │ [60 meses▼] │ │ 3.2 anos     │      │
│ │              │ │              │      │
│ │ Taxa (%a.a.):│ │              │      │
│ │ [1.99%]      │ │              │      │
│ └──────────────┘ └──────────────┘      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ COMPARISON CHART                        │
│ Parcela (R$ 450) vs Conta Atual (R$ 850)│
│ ████████████ Parcela                    │
│ ████████████████████ Conta              │
│ Economia líquida: R$ 400/mês            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FINANCING OPTIONS (3 cards)             │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │Banco │ │PRONAF│ │PPA   │             │
│ │1.99% │ │0.5%  │ │OPEX  │             │
│ └──────┘ └──────┘ └──────┘             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ CTA                                     │
│ [Solicitar Pré-Aprovação]               │
│ [Falar com Especialista]                │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<FinancingSimulator />` (from ui_backlog.md #3)
- `<LoanCalculator />` (inputs)
- `<InstallmentBreakdown />` (results)
- `<ComparisonChart />` (parcela vs conta)
- `<FinancingOptions />` (3 cards)
- `<CreditPreApprovalForm />` (modal)

**Data Source**:

- Financing API: `/api/financing/simulate`
- Pre-approval API: `/api/financing/pre-approval`

**Analytics**:

- `view_financing_simulator`
- `simulate_financing_[option]`
- `request_pre_approval`
- `click_financing_option_[type]`

**Acceptance Criteria**:

- [ ] Real-time calculation on input change
- [ ] Comparison chart with visual clarity
- [ ] Pre-approval form with validation
- [ ] Data-testid: `financing-simulator`, `loan-calculator`, `financing-options`

---

### 9. Checkout Flow `/checkout`

**Purpose**: Complete purchase with address, shipping, payment  
**Journey Stage**: Finance (conversion)  
**Target Audience**: All personas completing purchase

**Sub-routes (steps)**:

- `/checkout/address` (Addresses)
- `/checkout/delivery` (Shipping)
- `/checkout/payment` (Payment)
- `/checkout/review` (Review & Place Order)

**Layout Structure** (already implemented):

- See `src/modules/checkout/components/`
- Already has comprehensive data-testids (26+ testids)

**Key Components** (already implemented):

- `<Addresses />` (11 testids)
- `<Shipping />` (9+ testids)
- `<Payment />` (8 testids)
- `<Review />` (3 testids)

**Analytics**:

- `view_checkout_[step]`
- `complete_checkout_step_[step]`
- `payment_method_selected_[method]`
- `order_placed`

**Acceptance Criteria**:

- [x] 4-step checkout with progress
- [x] All testids implemented (80% coverage)
- [x] Mobile-responsive
- [x] Error handling with ErrorMessage component

---

### 10. Account Dashboard `/account/dashboard`

**Purpose**: Energy monitoring post-installation  
**Journey Stage**: Post-Sale  
**Target Audience**: Customers post-installation

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ ACCOUNT NAV                             │
│ [Dashboard] [Pedidos] [Instalação] [Prog│
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ WELCOME BANNER                          │
│ Olá, [Nome]! Sistema gerando há 45 dias│
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ KEY METRICS (4-card grid)               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │Geração│Consumo │Economia│CO2    │   │
│ │1250kW│ │980kWh│ │R$850 │ │150kg │   │
│ │hoje  │ │hoje  │ │/mês  │ │evit. │   │
│ └──────┘ └──────┘ └──────┘ └──────┘   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ GENERATION CHART (line chart)           │
│ Geração vs Consumo (30 dias)            │
│ [Chart visualization]                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ROI TRACKER (progress bar)              │
│ Investimento recuperado: 15% (R$ 3.750) │
│ ████░░░░░░░░░░░░░░░░░                  │
│ Faltam 2.7 anos para payback completo   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ALERTS (conditional)                    │
│ ⚠ Geração abaixo do esperado hoje      │
│ [Ver detalhes]                          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ UPSELL RECOMMENDATIONS                  │
│ "Maximize sua economia:"                │
│ - Baterias para backup noturno          │
│ - Carregador EV residencial             │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<EnergyMonitoringDashboard />` (from ui_backlog.md #8)
- `<KeyMetrics />` (4 cards)
- `<GenerationChart />` (line chart)
- `<ROITracker />` (progress bar)
- `<AnomalyAlerts />` (conditional)
- `<UpsellRecommendations />` (2-3 products)

**Data Source**:

- Monitoring API: `/api/monitoring/generation`
- Inverter API: Direct integration (Growatt, Fronius, SMA)
- AI anomaly detection: `generation-vs-consumption/anomaly_detector.py`

**Analytics**:

- `view_dashboard`
- `view_generation_chart`
- `track_roi_progress`
- `click_upsell_[product]`

**Acceptance Criteria**:

- [ ] Real-time data (polling every 5min)
- [ ] Chart interactive (zoom, tooltip)
- [ ] Alerts with actionable suggestions
- [ ] Data-testid: `energy-dashboard`, `generation-chart`, `roi-tracker`, `anomaly-alerts`

---

### 11. Installation Tracker `/account/installation`

**Purpose**: Track installation progress and milestones  
**Journey Stage**: Homologate  
**Target Audience**: Customers post-purchase, pre/during installation

**Layout Structure**:

```tsx
┌─────────────────────────────────────────┐
│ INSTALLATION TIMELINE                   │
│ ●─────●─────○─────○─────○               │
│ Compra│Agend│Instal│Docs│Homol          │
│ ✓     │✓    │🔄    │     │               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ CURRENT MILESTONE                       │
│ ┌───────────────────────────┐           │
│ │ Instalação em Andamento   │           │
│ │ Previsão: 15/10/2025      │           │
│ │ Técnico: João Silva       │           │
│ │ [Contatar Técnico]        │           │
│ └───────────────────────────┘           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ MILESTONE HISTORY                       │
│ ✓ Compra Confirmada - 01/10/2025       │
│ ✓ Instalação Agendada - 05/10/2025     │
│ 🔄 Instalação Iniciada - 10/10/2025    │
│ ⏳ Documentação Pendente                │
│ ⏳ Homologação Pendente                 │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ DOCUMENT UPLOAD                         │
│ "Envie documentos para homologação:"    │
│ [ ] ART (Anotação Responsabilidade)    │
│ [ ] Projeto Elétrico                    │
│ [ ] Fotos da Instalação                 │
│ [Upload Arquivo]                        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SUPPORT CHAT                            │
│ [Iniciar Chat com Suporte]              │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<InstallationTimelineTracker />` (from ui_backlog.md #7)
- `<MilestoneCard />` (individual milestone)
- `<DocumentUpload />` (file upload)
- `<SupportChat />` (chat widget)

**Data Source**:

- Installation API: `/api/orders/installation-status`
- Upload API: `/api/upload/documents`

**Analytics**:

- `view_installation_tracker`
- `upload_document_[type]`
- `contact_technician`
- `start_support_chat`

**Acceptance Criteria**:

- [ ] Real-time status updates
- [ ] Document upload with validation
- [ ] Support chat integration
- [ ] Data-testid: `installation-tracker`, `milestone-{name}`, `document-upload`

---

### 12. Remote Generation `/geracao-remota`

**Purpose**: Remote generation location matching  
**Journey Stage**: Configure  
**Target Audience**: B1 without roof, remote generation seekers

**Sub-routes**:

- `/geracao-remota/localizacoes` (Location matcher)
- `/geracao-remota/multiplas-ucs` (Multi-UC credit distributor)

**Layout Structure (`/localizacoes`)**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Geração Remota"              │
│ - Subtitle: "Gere energia sem telhado" │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ LOCATION SEARCH                         │
│ CEP: [_____-___] [Buscar]              │
│ Raio: [50 km▼]                          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ MAP VIEW (Google Maps)                  │
│ [Interactive map with markers]          │
│ - User location (blue pin)              │
│ - Available locations (green pins)      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ LOCATION CARDS (list view)              │
│ ┌─────────────────────────────┐         │
│ │ Usina Solar Campinas        │         │
│ │ Distância: 35 km            │         │
│ │ Potência disponível: 50 kWp │         │
│ │ Taxa transmissão: R$ 0,15/kWh│        │
│ │ [Reservar Cota]             │         │
│ └─────────────────────────────┘         │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<RemoteLocationMatcher />` (from ui_backlog.md #9)
- `<LocationMap />` (Google Maps integration)
- `<LocationCard />` (location details)
- `<SlotBooking />` (reservation form)

**Data Source**:

- Remote API: `/api/remote-generation/locations?cep=&radius=`
- Maps API: Google Maps JavaScript API

**Analytics**:

- `view_remote_generation`
- `search_locations_[cep]`
- `reserve_slot_[location_id]`

**Acceptance Criteria**:

- [ ] Map with interactive markers
- [ ] Location search by CEP + radius
- [ ] Reservation with quota allocation
- [ ] Data-testid: `location-matcher`, `location-map`, `location-card-{id}`

---

### 13. Optimization Hub `/otimizacao-expansao`

**Purpose**: Tariff comparison and system expansion  
**Journey Stage**: Post-Sale (upsell)  
**Target Audience**: Existing customers optimizing consumption

**Sub-routes**:

- `/otimizacao-expansao/calculadora-roi` (ROI calculator standalone)
- `/otimizacao-expansao/comparador-tarifas` (Tariff comparison)
- `/otimizacao-expansao/expansao-sistema` (System expansion)

**Layout Structure (`/comparador-tarifas`)**:

```tsx
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Comparador de Tarifas"       │
│ - Subtitle: "Otimize sua economia"     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ TARIFF SELECTOR                         │
│ Classe: [B1 Residencial▼]              │
│ Tarifa Atual: [Convencional▼]          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ HOURLY CONSUMPTION INPUT                │
│ "Upload sua fatura ou insira manualmente"│
│ [Upload PDF] ou [Entrada Manual]        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ COMPARISON RESULTS (2-column)           │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ CONVENCIONAL │ │ BRANCA       │      │
│ │ R$ 850/mês   │ │ R$ 720/mês   │      │
│ │              │ │ Economia:    │      │
│ │              │ │ R$ 130/mês   │      │
│ └──────────────┘ └──────────────┘      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ HOURLY CHART                            │
│ Consumo Ponta vs Fora-Ponta             │
│ [Bar chart visualization]               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ RECOMMENDATION BADGE                    │
│ ✓ Tarifa Branca recomendada             │
│ [Solicitar Migração]                    │
└─────────────────────────────────────────┘
```

**Key Components**:

- `<TariffComparisonWidget />` (from ui_backlog.md #6)
- `<HourlyConsumptionChart />` (bar chart)
- `<TariffRecommendation />` (result card)

**Data Source**:

- Tariff API: `/api/tariffs/compare`
- AI optimizer: `generation-vs-consumption/tariff_optimizer.py`

**Analytics**:

- `view_tariff_comparison`
- `calculate_tariff_savings_[classe]`
- `request_tariff_migration`

**Acceptance Criteria**:

- [ ] OCR upload or manual input
- [ ] Real-time comparison calculation
- [ ] Hourly chart with ponta/fora-ponta
- [ ] Data-testid: `tariff-comparison`, `hourly-chart`, `tariff-recommendation`

---

## 🔗 Integration Points

### Frontend → Backend (YSH_backend)

| Frontend Route | Backend API | Method | Purpose |
|---------------|-------------|--------|---------|
| `/` (Calculator) | `/api/calculate-savings` | POST | ROI calculation |
| `/configurador/consumo` | `/api/ocr/parse-bill` | POST | OCR bill parsing |
| `/configurador/equipamentos` | `/api/sizing/recommend` | POST | System sizing |
| `/financiamento/simulador` | `/api/financing/simulate` | POST | Loan calculation |
| `/financiamento/pronaf` | `/api/financing/pronaf-eligibility` | POST | PRONAF check |
| `/products` | `/api/products` | GET | Product catalog |
| `/account/dashboard` | `/api/monitoring/generation` | GET | Energy data |
| `/account/installation` | `/api/orders/installation-status` | GET | Installation tracker |
| `/geracao-remota/localizacoes` | `/api/remote-generation/locations` | GET | Remote locations |
| `/otimizacao-expansao/comparador-tarifas` | `/api/tariffs/compare` | POST | Tariff comparison |

### Backend → AI Agents (YSH_ai-geovisio)

| Backend API | AI Agent | Purpose |
|------------|----------|---------|
| `/api/ocr/parse-bill` | `solar_vision/ocr_fatura.py` | Bill OCR |
| `/api/sizing/recommend` | `sizing/dimensioning_agent.py` | System sizing |
| `/api/tariffs/compare` | `generation-vs-consumption/tariff_optimizer.py` | Tariff optimization |
| `/api/monitoring/generation` | `generation-vs-consumption/anomaly_detector.py` | Anomaly detection |

### Shared Data (`journeys.json`)

- **Location**: `YSH_storefront/src/lib/journeys.json`
- **Consumed by**:
  - `/journeys` - Journey 360º Hub
  - `/journeys/[segment]` - Segment pages
  - Backend analytics pipeline
  - AI agents for persona-specific recommendations

---

## 📊 Page Priority Matrix

| Page | RICE Score | Priority | Sprint |
|------|-----------|----------|--------|
| **Home** | 100 | P0 | ✅ Done |
| **Journeys 360º** | 95 | P0 | ✅ Done |
| **Journeys [segment]** | 90 | P0 | ✅ Done |
| **Configurador** | 80 | P1 | Sprint 4 |
| **PDP** | 75 | P1 | Sprint 4 |
| **Financing Simulator** | 75 | P1 | Sprint 4 |
| **Systems Catalog** | 70 | P1 | Sprint 4 |
| **Product Comparison** | 60 | P1 | Sprint 4 |
| **Account Dashboard** | 58 | P2 | Sprint 5 |
| **Installation Tracker** | 55 | P2 | Sprint 5 |
| **Checkout** | 50 | P2 | ✅ Done |
| **Remote Generation** | 45 | P2 | Sprint 5 |
| **Tariff Comparison** | 48 | P2 | Sprint 5 |
| **Optimization Hub** | 40 | P3 | Sprint 6 |

---

## ✅ Implementation Checklist

### Phase 1: Core Pages (Done)

- [x] Home page with hero + calculator
- [x] Journey 360º Hub
- [x] Journey [segment] pages (5 routes)
- [x] Checkout flow (4 steps)

### Phase 2: Discovery & Configure (Sprint 4)

- [ ] System Configurator (4-step wizard)
- [ ] PDP with ROI calculator embed
- [ ] Product Comparison table
- [ ] Systems Catalog with filters
- [ ] Financing Simulator

### Phase 3: Post-Sale & Engagement (Sprint 5)

- [ ] Account Dashboard (energy monitoring)
- [ ] Installation Tracker (milestones)
- [ ] Remote Generation (location matcher)
- [ ] Tariff Comparison (optimization)

### Phase 4: Advanced Features (Sprint 6)

- [ ] Multi-UC Credit Distributor
- [ ] Demand Charge Optimizer (Grupo A)
- [ ] PPA Proposal Generator
- [ ] Loyalty Program

---

**Document Version**: 1.0.0  
**Last Updated**: October 7, 2025  
**Total Pages**: 13 primary routes + 20+ sub-routes  
**Static Routes**: 35+ (at build time)
