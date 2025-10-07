# 🎯 Implementação de Profiling React - Yello Solar Hub

## ✅ Status da Implementação

### Componentes de Desenvolvimento Criados

1. **withRenderCounter HOC** ✅
   - Localização: `src/lib/design-system/dev/withRenderCounter.tsx`
   - Aplicado em: `Button`, `PanelCard`
   - Funcionalidade: Conta e registra renders no console

2. **ProfilerWrapper Component** ✅
   - Localização: `src/lib/design-system/dev/ProfilerWrapper.tsx`
   - Funcionalidade: Wrapper do React Profiler com coleta de dados
   - Recursos:
     - Coleta de métricas (actualDuration, baseDuration, phase)
     - Agregação de estatísticas por componente
     - Exportação em JSON, CSV e Flamegraph

3. **ProfilingControls Component** ✅
   - Localização: `src/lib/design-system/dev/ProfilingControls.tsx`
   - Funcionalidade: Painel flutuante de controle
   - Recursos:
     - Estatísticas em tempo real
     - Top 5 componentes mais lentos
     - Exportação de dados (JSON, CSV, Flamegraph)
     - Limpeza de dados acumulados

### Páginas Instrumentadas

✅ **Layout Principal**

- Arquivo: `src/app/[countryCode]/(main)/layout.tsx`
- Instrumentação: `<ProfilingControls />` adicionado ao layout
- Alcance: Todas as páginas do app

✅ **Página de Produto**

- Arquivo: `src/app/[countryCode]/(main)/products/[handle]/page.tsx`
- Instrumentação: `<ProfilerWrapper id="ProductPage">`
- Métricas: Render de template de produto

✅ **Página de Coleção**

- Arquivo: `src/app/[countryCode]/(main)/collections/[handle]/page.tsx`
- Instrumentação: `<ProfilerWrapper id="CollectionPage">`
- Métricas: Render de listagem de coleção

✅ **Página de Carrinho**

- Arquivo: `src/app/[countryCode]/(main)/cart/page.tsx`
- Instrumentação: `<ProfilerWrapper id="CartPage">`
- Métricas: Render de carrinho de compras

✅ **Página de Categoria**

- Arquivo: `src/app/[countryCode]/(main)/categories/[...category]/page.tsx`
- Instrumentação: `<ProfilerWrapper id="CategoryPage">`
- Métricas: Render de listagem de categoria

## 🚀 Como Usar

### 1. Iniciar Servidor de Desenvolvimento

```powershell
cd YSH_storefront
npm run dev
```

### 2. Acessar a Aplicação

Navegue para: `http://localhost:3000`

### 3. Abrir Painel de Profiling

- Clique no botão flutuante **"📊 Profiler"** no canto inferior direito
- O painel mostrará estatísticas em tempo real

### 4. Navegar e Coletar Dados

Execute as seguintes ações para coletar dados:

#### Cenários de Teste

1. **Navegação em Produtos**
   - Acesse `/us/products/medusa-tshirt` (ou qualquer produto)
   - Observe no painel: "ProductPage" com métricas de mount
   - Verifique console para logs detalhados

2. **Scroll em Coleções**
   - Acesse `/us/collections/new-arrivals` (ou qualquer coleção)
   - Role a lista de produtos
   - Observe re-renders e performance

3. **Interação com Carrinho**
   - Adicione itens ao carrinho
   - Acesse `/us/cart`
   - Modifique quantidades
   - Observe re-renders dos itens

4. **Filtros em Categorias**
   - Acesse `/us/categories/shirts` (ou qualquer categoria)
   - Aplique filtros e ordenação
   - Observe impacto no render

### 5. Visualizar Dados no Painel

O painel mostra:

- **Components Tracked**: Número de componentes instrumentados
- **Total Renders**: Total de renders capturados
- **Total Duration**: Tempo acumulado de render
- **Slowest Components**: Top 5 mais lentos (média)

### 6. Exportar Dados

Clique em um dos botões de exportação:

- **JSON**: Dados brutos para análise programática
- **CSV**: Para análise em Excel/Google Sheets
- **Flame**: Para visualização em flamegraph

### 7. Visualizar Flamegraph

1. Clique em **Flame** para baixar o JSON
2. Acesse: <https://www.speedscope.app/>
3. Arraste o arquivo JSON baixado
4. Analise o flamegraph interativo

### 8. Console DevTools

Abra DevTools (F12) e vá para Console para ver logs detalhados:

```
[render] Button: 1
[render] PanelCard: 3
[Profiler] ProductPage (mount) {
  render: 1,
  actualDuration: '45.20ms',
  baseDuration: '42.80ms',
  startTime: '1234.56ms',
  commitTime: '1279.76ms'
}
```

## 📊 Interpretação de Métricas

### Métricas Importantes

- **actualDuration**: Tempo real de render (incluindo children)
  - ✅ < 16ms: Excelente (60 FPS)
  - ⚠️ 16-50ms: Aceitável
  - 🔴 > 50ms: Problemático

- **baseDuration**: Tempo sem otimizações
  - Compare com actualDuration para ver efetividade

- **phase**: "mount" | "update" | "nested-update"
  - Mount: Primeira renderização
  - Update: Re-renderização
  - Nested-update: Update dentro de outro update

- **Total Renders**: Contador de re-renders
  - Muitos updates → investigar dependências

### Sinais de Alerta

🔴 **Componente re-renderiza sem mudança de props**

- Causa: Parent re-renderiza ou contexto muda
- Solução: React.memo ou otimizar parent

🔴 **actualDuration > 50ms**

- Causa: Lógica pesada ou muitos elementos
- Solução: Virtualização, memoização, code splitting

🔴 **Updates em cascata**

- Causa: Estado mal estruturado
- Solução: Revisar arquitetura de estado

🔴 **baseDuration >> actualDuration**

- Sinal: Memoização funcionando bem ✅

## 🛠️ Desenvolvimento

### Adicionar ProfilerWrapper a Nova Página

```tsx
// src/app/[countryCode]/(main)/minha-pagina/page.tsx
import { ProfilerWrapper } from '@/lib/design-system/dev'

export default function MinhaPagina() {
  return (
    <ProfilerWrapper id="MinhaPagina">
      {/* Seu conteúdo */}
    </ProfilerWrapper>
  )
}
```

### Adicionar Render Counter a Componente

```tsx
// src/lib/design-system/components/MeuComponente.tsx
import { withRenderCounter } from '@/lib/design-system/dev'

const MeuComponenteInner = () => {
  // ...
}

const MeuComponente = React.memo(MeuComponenteInner)

const ExportedMeuComponente = 
  process.env.NODE_ENV === 'development' 
    ? withRenderCounter(MeuComponente, 'MeuComponente')
    : MeuComponente

export { ExportedMeuComponente as MeuComponente }
```

### Configurar Callback Customizado

```tsx
<ProfilerWrapper 
  id="MyComponent"
  onProfileData={(data) => {
    // Processar dados customizado
    console.log('Custom processing:', data)
  }}
  logToConsole={false}  // Desabilitar logs automáticos
  aggregateStats={true} // Habilitar agregação
>
  {children}
</ProfilerWrapper>
```

## 📈 Próximos Passos

### Otimizações Identificadas

1. **Virtualização de Listas**
   - Implementar react-window em listagens grandes
   - Target: Coleções com > 50 produtos

2. **Code Splitting**
   - Lazy load de componentes pesados
   - Dynamic imports para modais/overlays

3. **Memoização de Cálculos**
   - useMemo para cálculos complexos
   - useCallback para handlers estáveis

4. **Suspense Boundaries**
   - Adicionar boundaries para loading states
   - Melhorar UX de carregamento assíncrono

### Métricas a Coletar

- [ ] Lighthouse Score (antes/depois)
- [ ] Core Web Vitals (LCP, FID, CLS)
- [ ] Time to Interactive (TTI)
- [ ] First Contentful Paint (FCP)
- [ ] Bundle size analysis

### Testes de Regressão

- [ ] Criar testes de performance automatizados
- [ ] Definir thresholds de performance
- [ ] Integrar no CI/CD pipeline

## 🔗 Recursos

- [Guia Completo de Profiling](./PROFILING_GUIDE.md)
- [React Profiler API](https://react.dev/reference/react/Profiler)
- [Speedscope](https://www.speedscope.app/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/performance/)

---

**⚠️ Nota**: Ferramentas de profiling apenas funcionam em `NODE_ENV=development`
