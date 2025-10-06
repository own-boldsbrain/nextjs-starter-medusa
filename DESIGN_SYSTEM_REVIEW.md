# 🎨 YELLO SOLAR HUB - DESIGN SYSTEM REVIEW

**Data**: 2025-10-06  
**Status**: Integração Medusa.js + Vercel Geist + Yello Brand

---

## 📊 ANÁLISE ATUAL

### ✅ O que está implementado

#### 1. **Cores Yello Solar Hub**

```typescript
// Gradient Brand: #FFCE00 → #FF6600 → #FF0066
yello: {
  yellow: '#FFEE00',
  orange: '#FF6600',
  magenta: '#FF0066',
  // Escalas 50-500
}
```

#### 2. **Medusa UI Preset**

- ✅ Token system do Medusa (`--button-danger`, `--bg-base`, etc.)
- ✅ Gradiente Yello adicionado: `--gradient-yello-solar`
- ✅ Modos dark/light prontos

#### 3. **Componentes Base**

- ✅ `Button` (5 variants: primary, secondary, tertiary, ghost, outline)
- ✅ `Card` (elevations + colored variants)
- ✅ `YelloLogo` (SVG gradient)

#### 4. **Tailwind Config**

- ✅ Yello colors integrados
- ✅ Geist gray scale
- ✅ Medusa UI preset carregado

---

## ⚠️ PROBLEMAS IDENTIFICADOS

### 1. **Conflito de Nomenclatura**

```typescript
// lib/design-system/colors.ts usa:
yelloBrand.yellow  // ❌ Não acessível no Tailwind

// tailwind.config.js define:
yello.yellow  // ✅ Acessível como bg-yello-yellow
```

**Solução**: Unificar para `yello.*` em todo codebase.

---

### 2. **Medusa UI Tokens não usados nos componentes**

```tsx
// Button.tsx atual usa classes hard-coded:
'bg-yello-yellow'  // ❌ Não aproveita tokens Medusa

// Deveria usar:
'bg-[var(--button-primary)]'  // ✅ Token system
```

**Solução**: Mapear Yello → Medusa tokens.

---

### 3. **Falta de Componentes Medusa nativos**

Medusa UI oferece componentes prontos não utilizados:

- ❌ `Input`, `Select`, `Checkbox`, `Radio`
- ❌ `Badge`, `Label`, `Tooltip`
- ❌ `Table`, `Pagination`
- ❌ `Modal`, `Drawer`, `Toast`

**Solução**: Importar e customizar componentes Medusa.

---

### 4. **Gradiente não aplicado corretamente**

```css
/* Definido mas não usado: */
--gradient-yello-solar: linear-gradient(...)

/* Deveria ter classes utilitárias: */
.bg-gradient-yello
.text-gradient-yello
```

**Solução**: Adicionar utilities no Tailwind plugin.

---

## 🎯 PLANO DE INTEGRAÇÃO

### Fase 1: Unificar Token System (1h)

**Objetivo**: Alinhar Yello Brand → Medusa Tokens

```typescript
// 1. Atualizar lib/design-system/colors.ts
export const medusaYelloTokens = {
  '--button-primary': '#FFCE00',        // Yello Yellow
  '--button-primary-hover': '#FFB800',
  '--button-secondary': '#FF6600',      // Yello Orange
  '--button-secondary-hover': '#E65C00',
  '--button-tertiary': '#FF0066',       // Yello Magenta
  '--button-tertiary-hover': '#E60059',
  
  '--bg-highlight': '#FFF9E6',          // Yellow 50
  '--border-interactive': '#FF6600',    // Orange
  '--fg-interactive': '#FF0066',        // Magenta
};

// 2. Injetar no globals.css
:root {
  @apply light;
  /* Yello Solar Hub overrides */
  --button-neutral: var(--yello-yellow);
  --bg-interactive: var(--yello-orange);
  --border-interactive: var(--yello-magenta);
}
```

---

### Fase 2: Refatorar Componentes (2h)

**Objetivo**: Usar Medusa UI components + Yello theme

```tsx
// Button.tsx - Versão Medusa-aware
import { Button as MedusaButton } from '@medusajs/ui';

const Button = ({ variant = 'primary', ...props }) => {
  const variantMap = {
    primary: 'default',     // Mapeia Yello → Medusa
    secondary: 'secondary',
    tertiary: 'danger',     // Reutiliza danger com cor magenta
    ghost: 'transparent',
    outline: 'outline',
  };
  
  return (
    <MedusaButton
      variant={variantMap[variant]}
      className={cn(
        variant === 'primary' && 'bg-yello-yellow hover:bg-yello-yellow400',
        variant === 'tertiary' && 'bg-yello-magenta hover:bg-yello-magenta400'
      )}
      {...props}
    />
  );
};
```

---

### Fase 3: Adicionar Componentes Medusa (3h)

**Objetivo**: Criar wrappers Yello para componentes Medusa

```tsx
// lib/design-system/components/Input.tsx
import { Input as MedusaInput } from '@medusajs/ui';
export const Input = (props) => (
  <MedusaInput 
    className="focus:border-yello-orange focus:ring-yello-orange/20"
    {...props}
  />
);

// lib/design-system/components/Badge.tsx
import { Badge as MedusaBadge } from '@medusajs/ui';
export const Badge = ({ variant = 'default', ...props }) => (
  <MedusaBadge
    className={cn(
      variant === 'yellow' && 'bg-yello-yellow50 text-yello-yellow500',
      variant === 'orange' && 'bg-yello-orange50 text-yello-orange500',
      variant === 'magenta' && 'bg-yello-magenta50 text-yello-magenta500',
    )}
    {...props}
  />
);
```

---

### Fase 4: Utilitários CSS (1h)

**Objetivo**: Adicionar classes gradient e effects

```css
/* globals.css */
@layer utilities {
  .bg-gradient-yello {
    background: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);
  }
  
  .text-gradient-yello {
    background: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .border-gradient-yello {
    border-image: linear-gradient(135deg, #FFCE00, #FF6600, #FF0066) 1;
  }
  
  .shadow-yello {
    box-shadow: 0 4px 20px rgba(255, 206, 0, 0.3);
  }
  
  .shadow-yello-lg {
    box-shadow: 0 8px 40px rgba(255, 206, 0, 0.4);
  }
}
```

---

### Fase 5: Componentes Solares (4h)

**Objetivo**: Criar componentes específicos do domínio

```tsx
// components/solar/PanelCard.tsx
export const PanelCard = ({ panel }) => (
  <Card variant="default" interactive>
    <CardHeader>
      <div className="flex items-center gap-3">
        <Badge variant="yellow">{panel.power}W</Badge>
        <CardTitle>{panel.manufacturer}</CardTitle>
      </div>
      <CardDescription>{panel.model}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={panel.image} className="rounded-lg" />
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-geist-500">Eficiência</span>
          <span className="font-medium">{panel.efficiency}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-geist-500">Tecnologia</span>
          <span className="font-medium">{panel.technology}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <span className="text-2xl font-bold text-gradient-yello">
        R$ {panel.price.toLocaleString('pt-BR')}
      </span>
      <Button variant="primary" size="sm">Ver detalhes</Button>
    </CardFooter>
  </Card>
);

// components/solar/InverterCard.tsx
// components/solar/KitCard.tsx
// components/solar/TierBadge.tsx
```

---

## 📦 ESTRUTURA FINAL RECOMENDADA

```tsx
src/
├── lib/
│   └── design-system/
│       ├── index.ts                    # Export tudo
│       ├── colors.ts                   # Tokens Yello + Medusa
│       ├── typography.ts               # Scales Geist
│       ├── spacing.ts                  # Scales 4px base
│       └── components/
│           ├── primitives/             # Wrappers Medusa UI
│           │   ├── Button.tsx
│           │   ├── Input.tsx
│           │   ├── Badge.tsx
│           │   ├── Card.tsx
│           │   └── ...
│           ├── solar/                  # Domain-specific
│           │   ├── PanelCard.tsx
│           │   ├── InverterCard.tsx
│           │   ├── KitCard.tsx
│           │   ├── TierBadge.tsx
│           │   └── ProductComparator.tsx
│           └── layout/                 # Layouts
│               ├── Header.tsx
│               ├── Footer.tsx
│               └── Sidebar.tsx
│
├── app/
│   ├── (catalog)/
│   │   ├── produtos/
│   │   │   ├── page.tsx               # Grid produtos
│   │   │   ├── paineis/page.tsx
│   │   │   ├── inversores/page.tsx
│   │   │   └── [slug]/page.tsx        # Detalhes
│   │   └── kits/page.tsx
│   ├── dimensionamento/
│   │   ├── page.tsx                   # Wizard
│   │   └── resultado/page.tsx
│   └── design-system/
│       └── page.tsx                   # Showcase
│
└── styles/
    └── globals.css                     # Medusa base + Yello overrides
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Foundation (2h)

- [ ] Unificar nomenclatura colors (`yelloBrand` → `yello`)
- [ ] Mapear Yello tokens → Medusa variables
- [ ] Atualizar `globals.css` com overrides
- [ ] Adicionar utilities gradient/shadow

### Fase 2: Components (4h)

- [ ] Refatorar Button usando Medusa base
- [ ] Criar wrappers: Input, Select, Checkbox
- [ ] Criar wrappers: Badge, Label, Tooltip
- [ ] Testar todos componentes no `/design-system`

### Fase 3: Solar Domain (6h)

- [ ] PanelCard component
- [ ] InverterCard component
- [ ] KitCard component
- [ ] TierBadge component
- [ ] ProductFilters component
- [ ] ProductComparator component

### Fase 4: Integration (4h)

- [ ] Criar API routes para catálogo
- [ ] Integrar componentes solares com dados reais
- [ ] Criar página `/produtos` com grid
- [ ] Criar página `/produtos/paineis`
- [ ] Criar página `/produtos/inversores`

### Fase 5: Polish (2h)

- [ ] Dark mode adjustments
- [ ] Responsiveness check
- [ ] Performance optimization
- [ ] Accessibility audit (a11y)

**Total estimado**: 18 horas (~3 dias)

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **Agora**: Unificar token system (1h)
2. **Hoje**: Refatorar Button + Card (2h)
3. **Amanhã**: Criar componentes solares (6h)
4. **Depois**: Integração com catálogo real (4h)

---

## 📚 REFERÊNCIAS

- **Medusa UI Docs**: <https://docs.medusajs.com/ui>
- **Vercel Geist**: <https://vercel.com/geist>
- **Tailwind Plugins**: <https://tailwindcss.com/docs/plugins>
- **CVA (Class Variance Authority)**: <https://cva.style/docs>

---

**Status**: ✅ Análise completa  
**Próxima ação**: Implementar Fase 1 (Foundation)
