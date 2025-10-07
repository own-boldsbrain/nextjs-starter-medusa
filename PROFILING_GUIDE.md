# 📊 Guia de Profiling React - Yello Solar Hub

## 🎯 Objetivo

Este guia fornece instruções passo-a-passo para executar profiling real em páginas críticas usando React Profiler, coletar flamegraphs e identificar hotspots de performance.

## 🛠️ Ferramentas Disponíveis

### 1. **withRenderCounter HOC**

- **Localização**: `src/lib/design-system/dev/withRenderCounter.tsx`
- **Uso**: Já aplicado em `Button` e `PanelCard`
- **Funcionalidade**: Conta e registra renders no console

### 2. **ProfilerWrapper Component**

- **Localização**: `src/lib/design-system/dev/ProfilerWrapper.tsx`
- **Funcionalidade**: Wrapper do React Profiler com coleta de dados
- **Recursos**:
  - Coleta de métricas de render (actualDuration, baseDuration, phase)
  - Agregação de estatísticas por componente
  - Exportação de dados em JSON, CSV e formato Flamegraph

### 3. **ProfilingControls Component**

- **Localização**: `src/lib/design-system/dev/ProfilingControls.tsx`
- **Funcionalidade**: Painel de controle flutuante para gerenciar sessão de profiling
- **Recursos**:
  - Visualização de estatísticas em tempo real
  - Top 5 componentes mais lentos
  - Botões para exportar dados
  - Botão para limpar dados acumulados

## 📋 Passo-a-Passo: Como Fazer Profiling

### **Etapa 1: Identificar Páginas Críticas**

Páginas recomendadas para profiling inicial:

- ✅ `/produtos` - Listagem geral de produtos
- ✅ `/produtos/paineis` - Listagem de painéis solares
- ✅ `/produtos/inversores` - Listagem de inversores
- ✅ `/produtos/[slug]` - Página de detalhe de produto
- ✅ `/carrinho` - Página do carrinho
- ✅ `/checkout` - Página de checkout

### **Etapa 2: Instrumentar as Páginas**

#### Opção A: Instrumentar Página Específica

```tsx
// src/app/produtos/page.tsx
import { ProfilerWrapper } from '@/lib/design-system/dev'

export default function ProdutosPage() {
  return (
    <ProfilerWrapper id="ProdutosPage">
      {/* Seu conteúdo da página */}
    </ProfilerWrapper>
  )
}
```

#### Opção B: Instrumentar Layout (para múltiplas páginas)

```tsx
// src/app/produtos/layout.tsx
import { ProfilerWrapper } from '@/lib/design-system/dev'
import { ProfilingControls } from '@/lib/design-system/dev'

export default function ProdutosLayout({ children }) {
  return (
    <>
      <ProfilerWrapper id="ProdutosLayout">
        {children}
      </ProfilerWrapper>
      <ProfilingControls />
    </>
  )
}
```

#### Opção C: Instrumentar Root Layout (para toda aplicação)

```tsx
// src/app/layout.tsx
import { ProfilingControls } from '@/lib/design-system/dev'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ProfilingControls />
      </body>
    </html>
  )
}
```

### **Etapa 3: Iniciar Servidor de Desenvolvimento**

```powershell
cd YSH_storefront
npm run dev
```

### **Etapa 4: Abrir React DevTools Profiler**

1. Abra o navegador (Chrome/Edge recomendado)
2. Navegue para `http://localhost:3000`
3. Abra DevTools (F12)
4. Vá para aba **Profiler**
5. Clique no botão **Record** (círculo vermelho)

### **Etapa 5: Executar Cenários de Teste**

Execute estas ações enquanto o profiler está gravando:

#### Cenário 1: Navegação Inicial

- Carregue a página `/produtos`
- Aguarde renderização completa
- Observe console para render counts

#### Cenário 2: Interação com Filtros

- Aplique filtros (categoria, preço, fabricante)
- Observe re-renders desnecessários
- Verifique se apenas componentes afetados re-renderizam

#### Cenário 3: Scroll de Lista

- Role a lista de produtos
- Verifique lazy loading de imagens
- Observe performance de virtualização (se aplicável)

#### Cenário 4: Adicionar ao Carrinho

- Clique em "Adicionar ao Carrinho" múltiplas vezes
- Observe re-renders de componentes
- Verifique propagação de estado

#### Cenário 5: Navegação Entre Páginas

- Navegue de `/produtos` para `/produtos/[slug]`
- Retorne para `/produtos`
- Verifique mount/unmount performance

### **Etapa 6: Coletar Dados**

#### Via React DevTools

1. Pare a gravação (clique no botão Record novamente)
2. Analise flamegraph no DevTools
3. Clique com botão direito → **Export profile**
4. Salve o arquivo JSON

#### Via ProfilingControls (nosso painel)

1. Clique no botão **"📊 Profiler"** (canto inferior direito)
2. Visualize estatísticas agregadas
3. Veja top 5 componentes mais lentos
4. Clique em **"JSON"**, **"CSV"** ou **"Flame"** para exportar
5. Clique em **"🔄 Refresh Stats"** para atualizar dados
6. Clique em **"🗑️ Clear Data"** para resetar entre testes

### **Etapa 7: Analisar Dados no Console**

Abra console do DevTools para ver logs detalhados:

```
[render] Button: 1
[render] PanelCard: 1
[Profiler] ProdutosPage (mount) {
  render: 1,
  actualDuration: '45.20ms',
  baseDuration: '42.80ms',
  startTime: '1234.56ms',
  commitTime: '1279.76ms'
}
[Profiler] ProdutosPage (update) {
  render: 2,
  actualDuration: '12.30ms',
  baseDuration: '42.80ms',
  startTime: '2345.67ms',
  commitTime: '2357.97ms'
}
```

### **Etapa 8: Interpretar Resultados**

#### Métricas Importantes

- **actualDuration**: Tempo real de render (incluindo children)
  - ✅ < 16ms: Excelente (60 FPS)
  - ⚠️ 16-50ms: Aceitável
  - 🔴 > 50ms: Problemático

- **baseDuration**: Tempo sem memoization
  - Compare com actualDuration para ver efetividade de memo

- **phase**: "mount" ou "update"
  - Mount deve ser mais lento que update
  - Updates frequentes indicam problema

- **Total Renders**: Número de re-renders
  - Alto número de updates → investigar dependências

#### Sinais de Alerta

🔴 **Componente re-renderiza sem mudança de props**

- Solução: Adicionar React.memo ou verificar parent

🔴 **Componente com actualDuration > 50ms**

- Solução: Otimizar lógica ou virtualizar lista

🔴 **Muitos updates em cascata**

- Solução: Revisar estrutura de estado e callbacks

🔴 **baseDuration >> actualDuration**

- ✅ Memoization funcionando bem

### **Etapa 9: Exportar Flamegraph**

#### Formato de Exportação

```json
{
  "name": "root",
  "value": 0,
  "children": [
    {
      "name": "ProdutosPage",
      "value": 245.67,
      "children": [
        { "name": "mount", "value": 1 },
        { "name": "update", "value": 5 }
      ]
    }
  ]
}
```

#### Visualizar Flamegraph

1. Acesse: <https://www.speedscope.app/>
2. Clique em **"Browse"** e selecione JSON exportado
3. Analise flamegraph interativo
4. Identifique funções/componentes lentos

### **Etapa 10: Documentar Findings**

Crie relatório com:

- Screenshots de flamegraphs
- Métricas antes/depois
- Componentes problemáticos identificados
- Recomendações de otimização

## 🎯 Checklist de Profiling

- [ ] Páginas críticas identificadas
- [ ] ProfilerWrapper adicionado às páginas
- [ ] ProfilingControls adicionado ao layout
- [ ] Servidor dev iniciado
- [ ] React DevTools aberto
- [ ] Profiler gravando
- [ ] Cenários de teste executados
- [ ] Dados exportados (JSON + CSV + Flamegraph)
- [ ] Console logs analisados
- [ ] Flamegraph visualizado no speedscope
- [ ] Hotspots identificados
- [ ] Relatório documentado

## 📊 Exemplo de Análise

### Antes da Otimização

```
Component: PanelCard
Total Renders: 127
Avg Duration: 48.50ms
Max Duration: 125.30ms
```

### Após React.memo + useCallback

```
Component: PanelCard
Total Renders: 12
Avg Duration: 8.20ms
Max Duration: 15.40ms
```

**Melhoria**: 90% redução em renders, 83% redução em tempo médio

## 🚀 Próximos Passos

1. **Virtualização**: Implementar react-window/react-virtualized para listas longas
2. **Code Splitting**: Lazy load componentes pesados
3. **Suspense**: Adicionar boundaries para carregamento assíncrono
4. **Web Workers**: Mover cálculos pesados para thread separado
5. **Lighthouse**: Medir Core Web Vitals antes/depois

## 🔗 Recursos Adicionais

- [React Profiler API](https://react.dev/reference/react/Profiler)
- [Speedscope Flamegraph Viewer](https://www.speedscope.app/)
- [Chrome DevTools Profiling](https://developer.chrome.com/docs/devtools/performance/)
- [Web Vitals](https://web.dev/vitals/)

---

**Notas Importantes**:

- ⚠️ Profiling tools apenas funcionam em `NODE_ENV=development`
- ⚠️ Resultados em produção podem variar (bundle minificado, sem DevTools)
- ⚠️ Use Chrome/Edge para melhor suporte a DevTools
- ⚠️ Desabilite extensões do navegador para medições precisas
