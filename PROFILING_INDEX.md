# 📊 React Profiling - Documentação Central

> Sistema completo de profiling React para análise de performance do Yello Solar Hub

---

## 🚀 Início Rápido

**Quer começar agora?** → [PROFILING_QUICKSTART.md](./PROFILING_QUICKSTART.md)

**Tempo**: 5 minutos para primeira coleta de dados

---

## 📚 Documentação

### 1. **Executive Summary** 📋
**Arquivo**: [PROFILING_EXECUTIVE_SUMMARY.md](./PROFILING_EXECUTIVE_SUMMARY.md)

**Para**: Gerentes, Tech Leads, Stakeholders

**Conteúdo**:
- ✅ Entregas realizadas (ferramentas, componentes, páginas)
- ✅ Funcionalidades implementadas
- ✅ Métricas coletadas
- ✅ Thresholds de performance
- ✅ Próximos passos recomendados
- ✅ Validação da entrega

### 2. **Quick Start Guide** ⚡
**Arquivo**: [PROFILING_QUICKSTART.md](./PROFILING_QUICKSTART.md)

**Para**: Desenvolvedores que querem começar rápido

**Conteúdo**:
- Comandos essenciais (npm run dev)
- Páginas instrumentadas
- Métricas chave
- Console logs esperados
- Links para docs completas

### 3. **Implementation Status** 📊
**Arquivo**: [PROFILING_IMPLEMENTATION.md](./PROFILING_IMPLEMENTATION.md)

**Para**: Desenvolvedores implementando novas instrumentações

**Conteúdo**:
- Status completo de componentes criados
- Páginas já instrumentadas
- Como usar cada ferramenta
- Cenários de teste detalhados
- Interpretação de métricas
- Exportação e visualização de dados
- Exemplos de código para adicionar profiling

### 4. **Complete Guide** 📖
**Arquivo**: [PROFILING_GUIDE.md](./PROFILING_GUIDE.md)

**Para**: Análise profunda de performance

**Conteúdo**:
- Passo-a-passo detalhado completo
- Todas as ferramentas disponíveis
- Cenários de teste extensivos
- Interpretação avançada de resultados
- Exportação de flamegraphs
- Análise com speedscope
- Checklist completo
- Próximos passos de otimização

### 5. **Helper Script** 🛠️
**Arquivo**: [profiling-helper.js](./profiling-helper.js)

**Para**: Uso no console do navegador

**Funções**:
```javascript
exportProfilingJSON()        // Exporta dados como JSON
exportProfilingCSV()         // Exporta dados como CSV
exportProfilingFlamegraph()  // Exporta flamegraph
clearProfilingData()         // Limpa dados acumulados
showProfilingStats()         // Mostra estatísticas
startProfilingSession(name)  // Inicia sessão
endProfilingSession()        // Finaliza sessão
```

---

## 🏗️ Arquitetura

### Ferramentas de Desenvolvimento

```
src/lib/design-system/dev/
├── withRenderCounter.tsx     # HOC para contar renders
├── ProfilerWrapper.tsx       # Wrapper do React Profiler
├── ProfilingControls.tsx     # Painel de controle UI
└── index.ts                  # Exports centralizados
```

### Componentes Instrumentados

| Componente | Localização | Instrumentação |
|-----------|------------|----------------|
| `Button` | `src/lib/design-system/components/Button.tsx` | withRenderCounter |
| `PanelCard` | `src/lib/design-system/components/PanelCard.tsx` | withRenderCounter |

### Páginas Instrumentadas

| Página | Localização | ID Profiler |
|--------|------------|-------------|
| Layout | `src/app/[countryCode]/(main)/layout.tsx` | ProfilingControls |
| Produto | `src/app/[countryCode]/(main)/products/[handle]/page.tsx` | `ProductPage` |
| Coleção | `src/app/[countryCode]/(main)/collections/[handle]/page.tsx` | `CollectionPage` |
| Categoria | `src/app/[countryCode]/(main)/categories/[...category]/page.tsx` | `CategoryPage` |
| Carrinho | `src/app/[countryCode]/(main)/cart/page.tsx` | `CartPage` |

---

## 🎯 Fluxo de Trabalho Recomendado

### Fase 1: Coleta de Baseline (1 dia)
1. Ler [PROFILING_QUICKSTART.md](./PROFILING_QUICKSTART.md)
2. Iniciar dev server: `npm run dev`
3. Navegar pelas 4 páginas instrumentadas
4. Exportar dados baseline (JSON + Flamegraph)
5. Documentar métricas iniciais

### Fase 2: Análise (2-3 dias)
1. Ler [PROFILING_GUIDE.md](./PROFILING_GUIDE.md) seção "Interpretação"
2. Identificar top 5 componentes mais lentos
3. Analisar flamegraphs no speedscope
4. Documentar hotspots e causas raiz
5. Priorizar otimizações (impacto vs esforço)

### Fase 3: Otimização (1-2 semanas)
1. Ler [PROFILING_IMPLEMENTATION.md](./PROFILING_IMPLEMENTATION.md) seção "Desenvolvimento"
2. Implementar otimizações priorizadas
3. Re-executar profiling após cada otimização
4. Comparar métricas antes/depois
5. Documentar melhorias obtidas

### Fase 4: Validação (1 dia)
1. Executar todos cenários de teste novamente
2. Confirmar thresholds de performance atingidos
3. Criar relatório de melhorias (% de redução)
4. Atualizar documentação com findings

---

## 📊 Métricas e Thresholds

### Thresholds Recomendados

| Métrica | 🟢 Excelente | 🟡 Aceitável | 🔴 Crítico |
|---------|-------------|-------------|-----------|
| **actualDuration** | < 16ms | 16-50ms | > 50ms |
| **Renders/interação** | 1-3 | 4-10 | > 10 |
| **Total página** | < 100ms | 100-300ms | > 300ms |
| **LCP** | < 2.5s | 2.5-4s | > 4s |
| **FID** | < 100ms | 100-300ms | > 300ms |

### Métricas Coletadas

- ✅ **actualDuration**: Tempo real de render
- ✅ **baseDuration**: Tempo sem memoização
- ✅ **phase**: mount | update | nested-update
- ✅ **totalRenders**: Contagem de renderizações
- ✅ **avgDuration**: Tempo médio de render
- ✅ **minDuration**: Tempo mínimo
- ✅ **maxDuration**: Tempo máximo

---

## 🛠️ Uso das Ferramentas

### ProfilingControls (Painel UI)

**Localização**: Botão flutuante "📊 Profiler" (canto inferior direito)

**Funcionalidades**:
- 📊 Ver estatísticas em tempo real
- 🐌 Top 5 componentes mais lentos
- 🔄 Refresh stats
- 💾 Exportar JSON/CSV/Flamegraph
- 🗑️ Limpar dados

### ProfilerWrapper (Componente)

```tsx
import { ProfilerWrapper } from '@/lib/design-system/dev'

<ProfilerWrapper id="MyComponent">
  {/* Conteúdo a ser perfilado */}
</ProfilerWrapper>
```

### withRenderCounter (HOC)

```tsx
import { withRenderCounter } from '@/lib/design-system/dev'

const MyComponent = React.memo(MyComponentInner)

export default process.env.NODE_ENV === 'development'
  ? withRenderCounter(MyComponent, 'MyComponent')
  : MyComponent
```

---

## 🔗 Links Externos

### Ferramentas
- **Speedscope**: https://www.speedscope.app/ (visualização de flamegraphs)
- **Chrome DevTools**: F12 → Profiler tab
- **React DevTools**: Profiler extension

### Documentação
- **React Profiler API**: https://react.dev/reference/react/Profiler
- **Performance Profiling**: https://react.dev/learn/profiling-performance
- **Web Vitals**: https://web.dev/vitals/
- **Chrome Performance**: https://developer.chrome.com/docs/devtools/performance/

---

## ❓ FAQ

### Como adicionar profiling a nova página?

```tsx
import { ProfilerWrapper } from '@/lib/design-system/dev'

export default function MyPage() {
  return (
    <ProfilerWrapper id="MyPage">
      {/* conteúdo */}
    </ProfilerWrapper>
  )
}
```

### Como visualizar dados coletados?

1. Clicar em "📊 Profiler" (canto inferior direito)
2. Ver estatísticas no painel
3. Abrir console (F12) para logs detalhados
4. Exportar dados para análise offline

### Como exportar flamegraph?

1. Clicar no botão "Flame" no painel
2. Arquivo JSON será baixado automaticamente
3. Acessar https://www.speedscope.app/
4. Arrastar arquivo JSON para o site
5. Analisar flamegraph interativo

### Por que não vejo dados?

- ✅ Verificar que está em desenvolvimento (`npm run dev`)
- ✅ Verificar que navegou por páginas instrumentadas
- ✅ Verificar console do navegador (F12)
- ✅ Clicar em "Refresh Stats" no painel

### Como limpar dados antigos?

- Clicar no botão "🗑️ Clear Data" no painel
- Ou usar `clearProfilingData()` no console

---

## 📞 Suporte

### Documentação
- Quick Start: [PROFILING_QUICKSTART.md](./PROFILING_QUICKSTART.md)
- Guia Completo: [PROFILING_GUIDE.md](./PROFILING_GUIDE.md)
- Implementação: [PROFILING_IMPLEMENTATION.md](./PROFILING_IMPLEMENTATION.md)
- Executive: [PROFILING_EXECUTIVE_SUMMARY.md](./PROFILING_EXECUTIVE_SUMMARY.md)

### Issues Comuns
- Backend não conecta → Normal em build, use `npm run dev`
- Painel não aparece → Verificar NODE_ENV=development
- Dados não exportam → Verificar se há dados coletados
- Flamegraph vazio → Navegar e interagir antes de exportar

---

**Última Atualização**: 06 de Outubro de 2025  
**Versão da Documentação**: 1.0.0  
**Status**: ✅ Completo e Operacional
