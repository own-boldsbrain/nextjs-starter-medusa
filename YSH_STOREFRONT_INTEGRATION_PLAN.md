# YSH Storefront - Design System Integration Report

**Data:** 06 de Outubro de 2025  
**Status:** 🚀 EM IMPLEMENTAÇÃO  

---

## 📋 PLANO DE INTEGRAÇÃO 360º

### Objetivo

Substituir todos os componentes genéricos Medusa UI por componentes do **Yello Solar Hub Design System** em cobertura end-to-end.

---

## 🎯 MÓDULOS IDENTIFICADOS

### 1. **Home Module** ✅ IMPLEMENTADO

**Arquivo:** `src/modules/home/components/hero/index.tsx`

**Mudanças:**

- ❌ Removido: Medusa Button, Heading
- ✅ Adicionado: YelloLogo, Yello Button
- ✅ Hero redesenhado com gradient Yello
- ✅ Logo animado com pulse
- ✅ CTAs com Button primary/outline
- ✅ Features badges com cores brand
- ✅ Background gradient: geist-50 → yello-yellow50 → white

**Componentes Yello:**

- `<YelloLogo />` - 120px hero, 200px/150px background
- `<Button variant="primary" size="lg" />` - CTA principal
- `<Button variant="outline" size="lg" />` - CTA secundário

---

### 2. **Products Module** 🔄 PRÓXIMO

**Arquivos a modificar:**

- `src/modules/products/components/product-actions/index.tsx`
- `src/modules/products/components/product-price/index.tsx`
- `src/modules/products/templates/product-info/index.tsx`

**Componentes Medusa a substituir:**

- `@medusajs/ui` Button → Yello Button
- Headings genéricos → Typography presets Yello
- Cards genéricos → Yello Card

**Plano:**

```tsx
// ANTES (Medusa UI)
<Button variant="primary" className="w-full h-10">
  Add to cart
</Button>

// DEPOIS (Yello Design System)
<Button variant="primary" size="md" fullWidth>
  Add to cart
</Button>
```

---

### 3. **Cart Module** 🔄 PRÓXIMO

**Arquivos a modificar:**

- `src/modules/cart/templates/index.tsx`
- `src/modules/cart/templates/summary.tsx`
- `src/modules/cart/components/item/index.tsx`

**Componentes a integrar:**

- Yello Button (delete, update quantity)
- Yello Card (cart summary)
- Typography Yello (prices, totals)

---

### 4. **Checkout Module** 🔄 PRÓXIMO

**Arquivos críticos:**

- `src/modules/checkout/components/payment-button/index.tsx`
- `src/modules/checkout/components/submit-button/index.tsx`
- `src/modules/checkout/templates/checkout-form/index.tsx`

**Componentes a integrar:**

- Yello Button primary (Place Order)
- Yello Input components (quando implementados)
- Yello Card (payment summary)

---

### 5. **Account Module** 🔄 PENDENTE

**Arquivos:**

- `src/modules/account/components/login/index.tsx`
- `src/modules/account/components/register/index.tsx`
- `src/modules/account/templates/account-layout.tsx`

**Componentes necessários:**

- Yello Button (login, register, save)
- Yello Input (text, email, password) - A CRIAR
- Yello Card (account info)

---

### 6. **Common Components** 🔄 PENDENTE

**Arquivos:**

- `src/modules/common/components/input/index.tsx`
- `src/modules/common/components/checkbox/index.tsx`
- `src/modules/common/components/modal/index.tsx`

**Componentes a criar no Design System:**

- Input (TextInput, TextArea)
- Checkbox
- Modal/Dialog
- Select/Dropdown

---

## 📊 PROGRESSO DE IMPLEMENTAÇÃO

| Módulo | Arquivos | Status | Componentes Integrados |
|--------|----------|--------|------------------------|
| **Home** | 1 | ✅ 100% | YelloLogo, Button (2 variants) |
| **Products** | 5 | 🔴 0% | - |
| **Cart** | 3 | 🔴 0% | - |
| **Checkout** | 8 | 🔴 0% | - |
| **Account** | 12 | 🔴 0% | - |
| **Common** | 10 | 🔴 0% | - |
| **Layout** | 5 | 🔴 0% | - |
| **Order** | 6 | 🔴 0% | - |

**Total:** 50 arquivos  
**Implementados:** 1 (2%)  
**Pendentes:** 49 (98%)

---

## 🎨 MAPEAMENTO DE COMPONENTES

### Medusa UI → Yello Design System

| Medusa Component | Yello Equivalent | Status | Notas |
|------------------|------------------|--------|-------|
| `Button` | `Button` | ✅ | 5 variants disponíveis |
| `Heading` | Typography presets | ✅ | Use classes Tailwind |
| `Text` | Typography presets | ✅ | body, bodySmall, etc |
| `Label` | `caption` preset | ✅ | text-xs + semibold |
| `Input` | `TextInput` | 🔴 | A CRIAR |
| `Textarea` | `TextArea` | 🔴 | A CRIAR |
| `Select` | `Select` | 🔴 | A CRIAR |
| `Checkbox` | `Checkbox` | 🔴 | A CRIAR |
| `Radio` | `Radio` | 🔴 | A CRIAR |
| `Modal` | `Modal` | 🔴 | A CRIAR |
| `Toast` | `Toast` | 🔴 | A CRIAR |
| `Badge` | `Badge` | 🔴 | A CRIAR |
| `Spinner` | `Spinner` | 🔴 | A CRIAR |
| Card-like divs | `Card` | ✅ | 7 variants disponíveis |

---

## 🚀 PRÓXIMOS PASSOS

### Fase 1: Componentes Base Faltantes (6-8h)

**Priority 1 - Input Components:**

1. TextInput (text, email, tel, number, password)
2. TextArea (multiline text)
3. Select (dropdown)
4. Checkbox (boolean)
5. Radio (single choice)

**Arquivo a criar:** `src/lib/design-system/components/Input.tsx`

```tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full rounded-lg border transition-all focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default: 'border-geist-200 focus:border-yello-orange focus:ring-yello-orange/20',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, variant, size, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-geist-700">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ variant: error ? 'error' : variant, size, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
```

### Fase 2: Integração Products Module (4h)

**Arquivos prioritários:**

1. `product-actions/index.tsx` - Button "Add to cart"
2. `product-price/index.tsx` - Typography presets
3. `product-info/index.tsx` - Card component

### Fase 3: Integração Cart Module (3h)

**Arquivos prioritários:**

1. `cart/templates/index.tsx` - Layout com Card
2. `cart/templates/summary.tsx` - Card summary
3. `cart/components/item/index.tsx` - Button delete

### Fase 4: Integração Checkout Module (5h)

**Arquivos prioritários:**

1. `payment-button/index.tsx` - Button primary "Place Order"
2. `checkout-form/index.tsx` - Input components (quando prontos)
3. `checkout-summary/index.tsx` - Card summary

### Fase 5: Integração Account Module (4h)

**Arquivos:**

1. Login form - Button + Input
2. Register form - Button + Input
3. Account layout - Card components

### Fase 6: Common Components (2h)

**Migração de utilities:**

1. Replace generic inputs com Yello Input
2. Replace generic modals
3. Update iconography

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Design System Core

- [x] Color tokens (39)
- [x] Typography (14 presets)
- [x] Spacing (27 tokens)
- [x] Button component
- [x] Card component
- [x] YelloLogo component

### Input Components (A FAZER)

- [ ] TextInput
- [ ] TextArea
- [ ] Select
- [ ] Checkbox
- [ ] Radio
- [ ] Switch

### Feedback Components (A FAZER)

- [ ] Alert
- [ ] Toast
- [ ] Modal
- [ ] Spinner
- [ ] Badge

### Módulos Integrados

- [x] Home (Hero)
- [ ] Products
- [ ] Cart
- [ ] Checkout
- [ ] Account
- [ ] Common
- [ ] Layout
- [ ] Order

---

## 📈 ESTIMATIVA DE TEMPO

| Fase | Descrição | Tempo | Prioridade |
|------|-----------|-------|------------|
| **1** | Input Components | 6-8h | CRÍTICO |
| **2** | Products Module | 4h | ALTO |
| **3** | Cart Module | 3h | ALTO |
| **4** | Checkout Module | 5h | CRÍTICO |
| **5** | Account Module | 4h | MÉDIO |
| **6** | Common Components | 2h | MÉDIO |
| **7** | Layout/Nav | 3h | BAIXO |
| **8** | Order Module | 2h | BAIXO |
| **TOTAL** | End-to-end 360º | **29-31h** | - |

---

## 🎯 MÉTRICAS DE SUCESSO

### Cobertura de Componentes

- **Meta:** 100% componentes Medusa substituídos
- **Atual:** 2% (1/50 arquivos)

### Consistência Visual

- **Meta:** 100% páginas com Yello branding
- **Atual:** 10% (apenas /design-system e home)

### Performance

- **Meta:** 0 importações Medusa UI no bundle final
- **Atual:** ~98% ainda usando Medusa UI

### Type Safety

- **Meta:** 100% componentes type-safe
- **Atual:** 100% (componentes existentes)

---

## 🔗 REFERÊNCIAS

- [YSH_DESIGN_SYSTEM_SPEC.md](../YSH/YSH_DESIGN_SYSTEM_SPEC.md)
- [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md)
- [Medusa UI Docs](https://docs.medusajs.com/ui/overview)
- [Vercel Geist](https://vercel.com/geist/introduction)

---

**Status:** 🚀 FASE 1 INICIADA (Home Module)  
**Próximo:** Criar Input Components → Integrar Products Module  
**ETA para 100%:** 29-31 horas
