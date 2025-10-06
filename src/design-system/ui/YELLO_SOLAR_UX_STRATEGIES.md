# Yello Solar Hub - Estratégias UX/UI Writing

**Tom de Voz:** Hélio - "Marrento Certo"
*"Eu cuido do chato. Você curte a economia."*

---

## 🎯 Estratégias Implementadas

### 1. Sistema de Internacionalização PT-BR
- **Arquivo:** `packages/design-system/ui/src/constants.ts`
- **Hook:** `packages/design-system/ui/src/hooks/use-texts.ts`
- **Cobertura:** Textos do sistema, CTAs, mensagens de erro/sucesso

### 2. Buyer Journey Proprietários Residenciais
- **Arquivo:** `buyers-journeys/proprietarios-residenciais.md`
- **Foco:** Jornada end-to-end com estratégias UX Writing
- **Persona:** Família brasileira típica (2-4 pessoas, consumo 300-800 kWh)

### 3. Agentes de Sizing e Geração vs Consumo
- **Sizing Tiers:** `agents/sizing/AGENTS.md`
- **Geração vs Consumo:** `agents/generation-vs-consumption/AGENTS.md`
- **Base Técnica:** ANEEL, HSP, PR, TIERs YSH

### 4. Design System com Stroke Gradiente
- **Gradientes:** Yello Solar (#FFCE00 → #FF6600 → #FF0066)
- **Componentes:** YelloSolarButton, backgrounds, borders
- **Uso:** CTAs de destaque, elementos de branding

---

## 📝 Princípios do Tom "Marrento Certo"

### ✅ Do
- **Número primeiro:** "Economia R$ 1.890/ano. Payback 4 anos."
- **Direto:** "Conta cara? Bora ver economia real."
- **Confiante:** "A gente cuida. Você curte."
- **Útil:** Um CTA por mensagem

### ❌ Don't
- Blábláblá desnecessário
- Adjetivos vazios ("incrível", "fantástico")
- Drama em erros ("Ops, algo deu errado")
- Múltiplos CTAs confusos

---

## 🎨 Componentes Yello Solar

### YelloSolarButton
```tsx
import { YelloSolarButton } from "@medusajs/ui"

// CTA principal
<YelloSolarButton>Simular economia</YelloSolarButton>

// Variantes
<YelloSolarButton variant="stroke">Ver proposta</YelloSolarButton>
<YelloSolarButton variant="outline">Agendar visita</YelloSolarButton>
```

### Gradientes Disponíveis
```css
/* CSS Variables */
--gradient-yello-solar: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);
--gradient-yello-solar-stroke: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);

/* Tailwind Classes */
bg-yello-solar        /* Background gradiente */
stroke-yello-solar    /* Stroke gradiente */
border-yello-solar    /* Border gradiente */
```

---

## 📱 Exemplos de UX Writing por Canal

### WhatsApp (Primário)
```
Usuário: Conta de luz alta
Hélio: Manda foto da conta. Eu calculo em 2 min. Sem enrolação.

Usuário: Recebe proposta
Hélio: 4.2 kWp, payback 4.8 anos, economia R$ 1.890/ano. Bora assinar?
```

### Email (Nurturing)
```
Assunto: Sua economia solar: R$ 1.890/ano confirmada

Corpo:
Sistema gerando desde ontem.
Performance: 82% (ótimo).
Próxima conta cai ~25%.

Dúvidas? Respondo rapidinho.
```

### App (Dashboard)
```
Notificação: "Gerando 18 kWh hoje. Conta vai cair R$ 89."

Card: "Payback restante: 3.8 anos"
       "CO₂ evitado: 2.3 toneladas"
```

---

## 🔄 Buyer Journey - Proprietários Residenciais

### Fases e CTAs
1. **Awareness** → "Simular economia"
2. **Consideration** → "Ver proposta"
3. **Decision** → "Assinar proposta"
4. **Purchase** → "Agendar obra"
5. **Onboarding** → "Baixar app"
6. **Advocacy** → "Indicar amigo"

### Métricas-Chave
- **Conversão Global:** 15-20%
- **CAC:** R$ 800-1.200
- **LTV:** R$ 25.000-35.000
- **Payback Marketing:** 6-8 meses

---

## 🤖 Agentes Técnicos

### Sizing por TIERs
- **Entrada:** Consumo mensal, histórico, localização
- **Saída:** kWp, tier YSH, recomendações técnicas
- **TIERs:** XPP (0.5-2 kWp) → XGG (300 kWp-3 MWp)

### Geração vs Consumo
- **Metas:** 115% (padrão), 130% (moderado), 140% (consciente), 160% (acelerado)
- **Base:** Histórico, planos expansão, contexto local

---

## 📊 Estratégias de Conversão

### Pontos de Atrito Identificados
1. **Dúvida Técnica (35% abandono)** → Vídeos curtos + glossário
2. **Medo do Investimento (28%)** → Garantia performance + seguro
3. **Complexidade Regulatória (20%)** → "A gente cuida de tudo"
4. **Concorrência de Preço (17%)** → ROI total + diferenciais

### Soluções Implementadas
- **ROI na mesa** sempre visível
- **Payback em destaque** (4-5 anos típico)
- **Garantias claras** (performance, obra, suporte)
- **Processo simples** (upload conta + CEP = proposta)

---

## 🎯 Próximos Passos

### Fase 1: Implementação Core
- [x] Sistema i18n PT-BR
- [x] Buyer journey residencial
- [x] Agentes sizing e GC
- [x] Design system gradiente
- [ ] Componentes Yello Solar finais
- [ ] Testes de usabilidade

### Fase 2: Outras Buyer Journeys
- [ ] Comerciais (lojas, escritórios)
- [ ] Industriais (fábricas, galpões)
- [ ] Rurais (fazendas, sítios)
- [ ] Condomínios

### Fase 3: Otimização
- [ ] A/B tests de copy
- [ ] Análise de funil
- [ ] Otimização conversão
- [ ] Expansão produto

---

**Resumo Hélio:** "Número primeiro, conversa depois. Sem blábláblá, só resultado. ROI na mesa, obra no prazo, suporte que resolve. Fim do papo."