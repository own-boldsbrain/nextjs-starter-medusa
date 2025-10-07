# 🎨 Medusa UX/UI Audit Report — Yello Solar Hub

**Data**: 06 de outubro de 2025  
**Fonte**: Análise de 5 repositórios oficiais Medusa.js  
**Objetivo**: Elevar qualidade UX/UI da implementação Yello ao nível dos starters enterprise oficiais

---

## 📚 Repositórios Analisados

1. ✅ **[nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa)** (2.5k ⭐)  
   *Starter padrão Next.js 15 + Medusa v2 — referência B2C*

2. ✅ **[b2b-starter-medusa](https://github.com/medusajs/b2b-starter-medusa)** (323 ⭐)  
   *Starter B2B enterprise com approval workflows, company management e quotes*

3. ✅ **[medusa](https://github.com/medusajs/medusa)** (30.8k ⭐)  
   *Core Medusa v2 — padrões de arquitetura e módulos*

4. ✅ **[examples](https://github.com/medusajs/examples)** (157 ⭐)  
   *40+ exemplos de features: subscriptions, marketplace, approvals, etc.*

---

## 🏆 Padrões de Excellence Identificados

### 1️⃣ **Navigation Architecture**

#### ✅ **Next.js Starter (B2C)**

```tsx
// src/modules/layout/templates/nav/index.tsx
<nav className="sticky top-0 inset-x-0 z-50 group">
  <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
    <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
      <SideMenu regions={regions} />
      <LocalizedClientLink href="/" className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase">
        Medusa Store
      </LocalizedClientLink>
      <CartButton />
      <AccountButton />
    </nav>
  </header>
</nav>
```

**Características**:

- Sticky header com `z-50`
- Border bottom sutil (`border-ui-border-base`)
- Typography hierarchy (`txt-compact-xlarge-plus` > `txt-xsmall-plus`)
- Hover states consistentes (`hover:text-ui-fg-base`)

#### ✅ **B2B Starter (Enterprise)**

```tsx
// storefront/src/modules/layout/templates/nav/index.tsx
<div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 small:p-4 p-2 text-sm border-b duration-200 border-ui-border-base z-50">
  <header className="flex w-full content-container relative small:mx-auto justify-between">
    <LocalizedClientLink href="/" className="hover:text-ui-fg-base flex items-center w-fit">
      <h1 className="small:text-base text-sm font-medium flex items-center">
        <LogoIcon className="inline mr-2" />
        Medusa B2B Starter
      </h1>
    </LocalizedClientLink>
    
    <nav>
      <ul className="space-x-4 hidden small:flex">
        <li><Suspense fallback={<SkeletonMegaMenu />}><MegaMenuWrapper /></Suspense></li>
      </ul>
    </nav>
    
    <CartButton />
    <AccountButton />
  </header>
</div>
```

**Diferencial B2B**:

- Logo + texto da empresa (branding forte)
- MegaMenu com **Suspense boundary** (performance)
- Skeleton loaders para cart/account (perceived performance)

---

### 2️⃣ **Cart & Checkout Flow**

#### ✅ **Cart Dropdown Component** (Next.js Starter)

```tsx
// src/modules/layout/components/cart-dropdown/index.tsx
<Popover>
  <PopoverButton className="relative">
    <ShoppingBag />
    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cart?.items?.length || 0}
    </span>
  </PopoverButton>
  
  <Transition>
    <PopoverPanel className="absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px]">
      <div className="p-4 flex items-center justify-center">
        <h3 className="text-large-semi">Cart</h3>
      </div>
      
      <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
        {cartState.items.map(item => (
          <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
            <Thumbnail thumbnail={item.thumbnail} size="square" />
            <div className="flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <h3 className="text-base-regular overflow-hidden text-ellipsis w-[180px]">
                  <LocalizedClientLink href={`/products/${item.product_handle}`}>
                    {item.title}
                  </LocalizedClientLink>
                </h3>
                <DeleteButton id={item.id} />
              </div>
              <LineItemOptions variant={item.variant} />
              <span data-testid="cart-item-quantity">{item.quantity} x</span>
              <LineItemPrice item={item} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{convertToLocale({ amount: cartState.subtotal, currency_code: cartState.currency_code })}</span>
        </div>
        <LocalizedClientLink href="/cart">
          <Button className="w-full">Go to cart</Button>
        </LocalizedClientLink>
      </div>
    </PopoverPanel>
  </Transition>
</Popover>
```

**Características**:

- Badge de contagem (`-top-1 -right-1` positioning)
- Grid layout `[122px_1fr]` (thumbnail + detalhes)
- Max height com scroll (`max-h-[402px]`)
- CTA footer (`Go to cart` em destaque)

#### ✅ **Checkout Multi-Step** (B2C)

```tsx
// src/modules/checkout/templates/checkout-form/index.tsx
<div className="w-full grid grid-cols-1 gap-y-8">
  <Addresses cart={cart} customer={customer} />
  <Shipping cart={cart} availableShippingMethods={shippingMethods} />
  <Payment cart={cart} availablePaymentMethods={paymentMethods} />
  <Review cart={cart} />
</div>
```

**Padrão de steps**:

1. **Addresses** → `?step=address`
2. **Shipping** → `?step=delivery`
3. **Payment** → `?step=payment`
4. **Review** → `?step=review`

Cada step com:

- Check icon quando completo (`<CheckCircleSolid />`)
- Disabled state quando incompleto (`opacity-50 pointer-events-none`)
- Heading + description consistente

---

### 3️⃣ **Product Display Patterns**

#### ✅ **Product Preview Card** (Padrão B2C)

```tsx
// src/modules/products/components/product-preview/index.tsx
<LocalizedClientLink href={`/products/${product.handle}`} className="group">
  <div data-testid="product-wrapper">
    <Thumbnail thumbnail={product.thumbnail} images={product.images} size="full" isFeatured={isFeatured} />
    <div className="flex txt-compact-medium mt-4 justify-between">
      <Text className="text-ui-fg-subtle" data-testid="product-title">
        {product.title}
      </Text>
      <div className="flex items-center gap-x-2">
        {product.variants?.length > 1 && <Text className="text-ui-fg-muted">From</Text>}
        <Text data-testid="product-price">
          {cheapestPrice && convertToLocale({ amount: cheapestPrice.amount, currency_code: cheapestPrice.currency_code })}
        </Text>
      </div>
    </div>
  </div>
</LocalizedClientLink>
```

**Características**:

- Grupo hover (`group` + `group-hover:` modifiers)
- Thumbnail com aspect ratio consistente
- Price display com "From" label (multi-variant)
- Spacing consistente (`mt-4`, `gap-x-2`)

#### ✅ **Product Page Layout** (Template)

```tsx
// src/modules/products/templates/index.tsx
<div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
  <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  
  <div className="block w-full relative">
    <ImageGallery images={product.images} />
  </div>
  
  <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
    <ProductActionsWrapper id={product.id} region={region}>
      <ProductActions product={product} region={region} />
    </ProductActionsWrapper>
  </div>
</div>
```

**Layout Structure**:

- Grid 3 colunas: `[Info | Gallery | Actions]`
- Sticky sidebars (`sticky top-48`)
- Responsive: stack em mobile (`flex-col small:flex-row`)

---

### 4️⃣ **B2B Enterprise Features** (Approval Workflows)

#### ✅ **Approval Status Banner**

```tsx
// storefront/src/modules/cart/components/approval-status-banner/index.tsx
<Container className="flex gap-2 self-stretch relative w-full h-fit overflow-hidden items-center">
  {cartApprovalStatus === ApprovalStatusType.PENDING && (
    <>
      <LockClosedSolid className="w-4 h-4" />
      <Text className="text-left">This cart is locked for approval.</Text>
    </>
  )}
  
  {cartApprovalStatus === ApprovalStatusType.REJECTED && (
    <>
      <XMarkMini className="w-4 h-4" />
      <Text className="text-left">
        This cart has been rejected. You can re-request approval from the{" "}
        <LocalizedClientLink href="/checkout" className="text-ui-bg-interactive hover:text-ui-fg-interactive-hover">
          checkout page
        </LocalizedClientLink>.
      </Text>
    </>
  )}
  
  {cartApprovalStatus === ApprovalStatusType.APPROVED && (
    <>
      <CheckMini className="w-4 h-4" />
      <Text className="text-left">This cart has been approved and can now be completed.</Text>
    </>
  )}
</Container>
```

**Padrão de estados**:

- **Pending**: Lock icon + mensagem informativa
- **Rejected**: X icon + link para re-request
- **Approved**: Check icon + confirmação

#### ✅ **Approval Card** (Admin Dashboard)

```tsx
// storefront/src/modules/account/components/approval-card/index.tsx
<Container className="bg-white flex small:flex-row flex-col p-4 rounded-md small:justify-between small:items-center gap-y-2 items-start">
  <div className="flex gap-x-4 items-center pl-3">
    <div className="flex min-w-10">
      {cart.items?.slice(0, 3).map((i, index) => (
        <div className="block w-7 h-7 border border-white bg-neutral-100 p-2 bg-cover bg-center rounded-md ml-[-5px] rotate-3">
          <Image src={i.thumbnail!} alt={i.title} />
        </div>
      ))}
    </div>
    
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-1">
        {cartApprovalStatus === ApprovalStatusType.PENDING && (
          <>
            <LockClosedSolidMini className="inline-block" />
            <span>Awaiting Approval</span>
          </>
        )}
      </div>
      <span className="text-xs text-neutral-500">
        Created at {createdAt.toLocaleDateString()}
      </span>
    </div>
  </div>
  
  <div className="flex gap-x-4">
    <div className="flex items-center text-small-regular">
      <span>{convertToLocale({ amount: cart.total, currency_code: cart.currency_code })}</span>
      {"·"}
      <span>{numberOfLines} items</span>
    </div>
    
    {type === "admin" && (
      <>
        <Button variant="secondary" size="small" onClick={handleReject}>
          <XMarkMini /> Reject
        </Button>
        <Button variant="primary" size="small" onClick={handleApprove}>
          <CheckMini /> Approve
        </Button>
      </>
    )}
  </div>
</Container>
```

**Características**:

- Thumbnails stacked com rotate (-5px overlap + rotate-3)
- Status badge com icon
- Total + item count separator (`{"·"}`)
- Admin actions (Reject/Approve) condicionais

---

### 5️⃣ **Loading States & Skeletons**

#### ✅ **Skeleton Patterns** (Next.js Starter)

```tsx
// src/modules/skeletons/components/skeleton-cart-item/index.tsx
<Table.Row className="w-full m-4">
  <Table.Cell className="!pl-0 p-4 w-24">
    <div className="flex w-24 h-24 p-4 bg-gray-200 rounded-large animate-pulse" />
  </Table.Cell>
  <Table.Cell className="text-left">
    <div className="flex flex-col gap-y-2">
      <div className="w-32 h-4 bg-gray-200 animate-pulse" />
      <div className="w-24 h-4 bg-gray-200 animate-pulse" />
    </div>
  </Table.Cell>
  <Table.Cell>
    <div className="flex gap-2 items-center">
      <div className="w-6 h-8 bg-gray-200 animate-pulse" />
      <div className="w-14 h-10 bg-gray-200 animate-pulse" />
    </div>
  </Table.Cell>
</Table.Row>
```

**Regras de Skeletons**:

- `bg-gray-200 animate-pulse` (cor + animação)
- Widths representativos do conteúdo real (`w-32`, `w-24`)
- Heights consistentes com componente final
- Gap matching (`gap-y-2`)

---

### 6️⃣ **Error Handling & Feedback**

#### ✅ **Error Message Component**

```tsx
// src/modules/checkout/components/error-message/index.tsx
const ErrorMessage = ({ error, 'data-testid': dataTestid }: ErrorMessageProps) => {
  if (!error) {
    return null
  }

  return (
    <div className="py-2 text-rose-500 text-small-regular" data-testid={dataTestid}>
      <span>{error}</span>
    </div>
  )
}
```

**Características**:

- Color `text-rose-500` (consistency)
- Small padding (`py-2`)
- Typography scale (`text-small-regular`)
- Null handling (conditional render)

#### ✅ **Toast Notifications** (B2B Starter)

```tsx
import { toast } from "@medusajs/ui"

// Success
toast.success("Cart approved successfully")

// Error
toast.error("Failed to approve cart")

// Info
toast.info("Approval request sent")
```

---

### 7️⃣ **Accessibility & Testing**

#### ✅ **Data TestIDs Pattern**

```tsx
<div data-testid="cart-container">
  <Table data-testid="items-table">
    <Table.Row data-testid="cart-item">
      <Button data-testid="go-to-cart-button">Go to cart</Button>
    </Table.Row>
  </Table>
</div>
```

**Convenções**:

- Kebab-case (`cart-item`, `go-to-cart-button`)
- Sufixos descritivos (`-button`, `-container`, `-link`)
- Hierarquia consistente

#### ✅ **ARIA Labels**

```tsx
<nav aria-label="Navegação principal">
  <button aria-busy={loading ? 'true' : undefined}>
    {loading && <Spinner aria-hidden />}
    Submit
  </button>
</nav>
```

---

### 8️⃣ **Typography System** (@medusajs/ui)

#### ✅ **Heading Hierarchy**

```tsx
import { Heading, Text } from "@medusajs/ui"

<Heading level="h1" className="text-3xl-semi">Main Title</Heading>
<Heading level="h2" className="text-2xl-semi">Section Title</Heading>
<Heading level="h3" className="text-xl-semi">Subsection</Heading>
```

#### ✅ **Text Variants**

- `text-large-semi` → Body large semibold
- `text-base-regular` → Body base regular
- `text-small-regular` → Body small regular
- `text-xsmall-regular` → Caption/meta
- `txt-compact-medium` → Compact buttons/labels

---

### 9️⃣ **Color Tokens** (Medusa UI Design System)

#### ✅ **Foreground Colors**

```scss
text-ui-fg-base         // Primary text (#000000)
text-ui-fg-subtle       // Secondary text (#6B7280)
text-ui-fg-muted        // Tertiary text (#9CA3AF)
text-ui-fg-disabled     // Disabled text (#D1D5DB)
text-ui-fg-interactive  // Links/actions (#3B82F6)
```

#### ✅ **Background Colors**

```scss
bg-ui-bg-base           // White (#FFFFFF)
bg-ui-bg-subtle         // Gray 50 (#F9FAFB)
bg-ui-bg-component      // Component bg (#F3F4F6)
bg-ui-bg-field          // Input bg (#FFFFFF)
bg-ui-bg-interactive    // Interactive bg (#3B82F6)
```

#### ✅ **Border Colors**

```scss
border-ui-border-base   // Default border (#E5E7EB)
border-ui-border-strong // Strong border (#D1D5DB)
border-ui-border-loud   // Emphasis border (#9CA3AF)
```

---

### 🔟 **Spacing & Layout System**

#### ✅ **Container Pattern**

```tsx
<div className="content-container">  {/* max-w-7xl mx-auto px-4 */}
  <div className="py-12">
    <div className="grid grid-cols-1 small:grid-cols-2 gap-x-6 gap-y-8">
      {/* Content */}
    </div>
  </div>
</div>
```

**Breakpoints**:

- `small:` → 768px (md)
- `medium:` → 1024px (lg)
- `large:` → 1280px (xl)

#### ✅ **Spacing Scale**

```scss
gap-x-2  → 0.5rem (8px)
gap-x-4  → 1rem (16px)
gap-x-6  → 1.5rem (24px)
gap-x-8  → 2rem (32px)
gap-y-4  → 1rem (16px)
gap-y-6  → 1.5rem (24px)
gap-y-8  → 2rem (32px)
gap-y-12 → 3rem (48px)
```

---

## 🚨 Gaps Identificados (Yello vs Medusa Starters)

| Feature | Medusa Starters | Yello Solar Hub | Gap |
|---------|-----------------|-----------------|-----|
| **Skeleton Loaders** | ✅ Comprehensive | ⚠️ Ausentes | Alto |
| **Cart Dropdown** | ✅ Popover com preview | ❌ Sem dropdown | Médio |
| **Error States** | ✅ Component dedicado | ⚠️ Inline básico | Médio |
| **Loading States** | ✅ `isLoading` props | ⚠️ Sem feedback | Alto |
| **Approval Workflows** | ✅ B2B starter completo | ❌ N/A (B2C) | Baixo* |
| **Typography System** | ✅ `@medusajs/ui` tokens | ⚠️ Mix Tailwind/custom | Médio |
| **Color Tokens** | ✅ Semantic (`ui-fg-*`) | ⚠️ Mix Yello/Geist | Baixo |
| **Data TestIDs** | ✅ Comprehensive | ❌ Ausentes | Alto |
| **Sticky Navigation** | ✅ `sticky top-0 z-50` | ✅ Implementado | ✅ OK |
| **Mega Menu** | ✅ Suspense boundary | ✅ Implementado | ✅ OK |
| **Mobile Actions** | ✅ Bottom sheet drawer | ❌ Sem mobile UX | Alto |

*Baixo porque Yello é B2C, mas pode inspirar workflows de orçamento/projeto

---

## 🎯 Recomendações de Implementação

### 🔴 **Prioridade ALTA** (1-2 sprints)

#### 1. **Skeleton Loaders**

```tsx
// YSH_storefront/src/modules/skeletons/components/skeleton-product-grid.tsx
export default function SkeletonProductGrid() {
  return (
    <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
      {repeat(6).map((index) => (
        <li key={index}>
          <div className="flex flex-col gap-y-4">
            <div className="w-full h-64 bg-gray-200 rounded-large animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-200 animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-200 animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  )
}
```

Aplicar em:

- Product grid (`/store`, `/equipamentos`)
- Journey cards (`/journeys`)
- Cart items (`/cart`)

#### 2. **Cart Dropdown**

```tsx
// YSH_storefront/src/modules/layout/components/cart-dropdown/index.tsx
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

export default function CartDropdown({ cart }) {
  return (
    <Popover>
      <PopoverButton className="relative">
        <ShoppingBag className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-yello-magenta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cart?.items?.length || 0}
        </span>
      </PopoverButton>
      
      <PopoverPanel className="absolute top-full right-0 mt-2 w-[420px] bg-white border border-geist-200 shadow-2xl rounded-xl">
        {/* Cart preview com CTAs */}
      </PopoverPanel>
    </Popover>
  )
}
```

#### 3. **Loading States**

```tsx
// Aplicar em todos os Buttons
<Button yelloVariant="primary" loading={isSubmitting}>
  {isSubmitting ? <Spinner /> : "Adicionar ao Carrinho"}
</Button>

// Adicionar prop `loading` no Button.tsx
export interface ButtonProps {
  loading?: boolean
  // ...
}
```

#### 4. **Data TestIDs**

```tsx
// Padrão a seguir em todos os componentes
<div data-testid="journey-container">
  <h1 data-testid="journey-title">{title}</h1>
  <Button data-testid="journey-cta-button">Ver jornada</Button>
</div>
```

---

### 🟡 **Prioridade MÉDIA** (3-4 sprints)

#### 5. **Error Component**

```tsx
// YSH_storefront/src/lib/design-system/components/ErrorMessage.tsx
export function ErrorMessage({ error }: { error?: string | null }) {
  if (!error) return null

  return (
    <div className="flex items-center gap-x-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-600">
      <ExclamationCircle className="h-5 w-5" />
      <span>{error}</span>
    </div>
  )
}
```

#### 6. **Mobile Actions Drawer** (Product Page)

```tsx
// YSH_storefront/src/modules/products/components/mobile-actions.tsx
<Transition show={show}>
  <Dialog onClose={close} className="fixed inset-0 z-50 lg:hidden">
    <Transition.Child>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
    </Transition.Child>
    
    <Transition.Child>
      <Dialog.Panel className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl p-6 shadow-2xl">
        {/* Options + Add to Cart */}
      </Dialog.Panel>
    </Transition.Child>
  </Dialog>
</Transition>
```

#### 7. **Typography Migration**

Substituir classes Tailwind diretas por tokens `@medusajs/ui`:

```tsx
// ❌ Antes
<h1 className="text-5xl font-black">Título</h1>

// ✅ Depois
<Heading level="h1" className="text-3xl-semi">Título</Heading>
```

---

### 🟢 **Prioridade BAIXA** (5+ sprints / Nice-to-have)

#### 8. **Approval Workflows** (Inspiração B2B)

Se Yello adotar orçamentos/projetos:

- Approval status banner
- Multi-step quote flow
- Admin dashboard para aprovar orçamentos

#### 9. **Toast Notifications**

```tsx
import { Toaster, toast } from "@medusajs/ui"

// Root layout
<Toaster />

// Actions
toast.success("Produto adicionado ao carrinho!")
toast.error("Erro ao carregar produtos")
```

#### 10. **Analytics & Testing**

- Playwright E2E tests com data-testids
- Lighthouse CI para performance
- Sentry para error tracking

---

## 📊 Scorecard de Qualidade UX

| Critério | Yello Atual | Meta (Medusa Level) | Gap |
|----------|-------------|---------------------|-----|
| **Navigation** | 8/10 | 10/10 | -2 |
| **Loading States** | 3/10 | 10/10 | -7 |
| **Error Handling** | 4/10 | 10/10 | -6 |
| **Accessibility** | 7/10 | 10/10 | -3 |
| **Mobile UX** | 6/10 | 10/10 | -4 |
| **Cart Experience** | 5/10 | 10/10 | -5 |
| **Typography** | 7/10 | 10/10 | -3 |
| **Skeleton Loaders** | 0/10 | 10/10 | -10 |
| **Testing** | 2/10 | 10/10 | -8 |

**Score Médio**: 4.7/10 → **Meta**: 10/10

---

## 🛠️ Action Plan (Sequencial)

### **Sprint 1-2** (Prioridade ALTA)

1. ✅ Criar skeleton components (`SkeletonProductGrid`, `SkeletonJourneyCard`, etc.)
2. ✅ Implementar Cart Dropdown com Popover
3. ✅ Adicionar loading states em todos os Buttons
4. ✅ Adicionar data-testids em componentes principais

### **Sprint 3-4** (Prioridade MÉDIA)

5. ✅ Criar `ErrorMessage` component reutilizável
6. ✅ Implementar Mobile Actions Drawer para product page
7. ✅ Migrar typography para `@medusajs/ui` tokens
8. ✅ Adicionar Toast notifications

### **Sprint 5+** (Prioridade BAIXA)

9. ⏳ Avaliar necessidade de Approval Workflows
10. ⏳ Setup Playwright + CI/CD

---

## 🔗 Referências Técnicas

### **Design System**

- [Medusa UI Docs](https://docs.medusajs.com/ui)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Headless UI](https://headlessui.com/)

### **Code Examples**

- [Next.js Starter Storefront](https://github.com/medusajs/nextjs-starter-medusa/tree/main/src/modules)
- [B2B Starter Storefront](https://github.com/medusajs/b2b-starter-medusa/tree/main/storefront/src/modules)

### **Testing**

- [Playwright](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 📝 Checklist de Implementação

- [ ] **Skeletons**: Product grid, Journey cards, Cart items
- [ ] **Cart Dropdown**: Popover com preview + CTA
- [ ] **Loading States**: Todos os Buttons com `loading` prop
- [ ] **Data TestIDs**: Coverage > 80% dos componentes
- [ ] **Error Component**: Mensagens consistentes
- [ ] **Mobile Drawer**: Product actions para mobile
- [ ] **Typography**: Migração para `@medusajs/ui`
- [ ] **Toast**: Success/Error notifications
- [ ] **Tests**: E2E com Playwright

---

**Relatório gerado automaticamente por Copilot GitHub**  
*Para questões técnicas, consultar: DESIGN_SYSTEM_IMPLEMENTATION.md | JOURNEYS_DIAGNOSTIC_REPORT.md*
