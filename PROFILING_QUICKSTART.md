# 🚀 Quick Start - React Profiling

## Início Rápido (5 minutos)

### 1️⃣ Iniciar Dev Server

```powershell
cd YSH_storefront
npm run dev
```

### 2️⃣ Abrir Navegador

- Chrome/Edge: `http://localhost:3000`
- Abrir DevTools: `F12`

### 3️⃣ Usar Painel de Profiling

Clique no botão flutuante **📊 Profiler** (canto inferior direito)

### 4️⃣ Testar Páginas

Navegue pelas páginas instrumentadas:

- `/us/products/[slug]` - Detalhes de produto
- `/us/collections/[handle]` - Listagem de coleção
- `/us/categories/[handle]` - Listagem de categoria
- `/us/cart` - Carrinho de compras

### 5️⃣ Exportar Dados

No painel:

- **JSON** - Dados brutos
- **CSV** - Análise em planilha
- **Flame** - Flamegraph visual

### 6️⃣ Visualizar Flamegraph

1. Download do arquivo Flame
2. Acesse: <https://www.speedscope.app/>
3. Arraste o arquivo JSON
4. Analise hotspots

## 📊 Páginas Instrumentadas

| Página | ID Profiler | Métricas |
|--------|-------------|----------|
| Produto | `ProductPage` | Render de detalhe |
| Coleção | `CollectionPage` | Listagem de produtos |
| Categoria | `CategoryPage` | Listagem por categoria |
| Carrinho | `CartPage` | Itens do carrinho |

## 🎯 Métricas Chave

- **actualDuration** < 16ms = ✅ Excelente
- **actualDuration** 16-50ms = ⚠️ Aceitável
- **actualDuration** > 50ms = 🔴 Problema

## 📝 Console Logs

Formato dos logs:

```
[render] Button: 3
[Profiler] ProductPage (mount) {
  render: 1,
  actualDuration: '45.20ms',
  baseDuration: '42.80ms'
}
```

## 🛠️ Ferramentas

- **withRenderCounter**: Componentes `Button`, `PanelCard`
- **ProfilerWrapper**: Páginas críticas
- **ProfilingControls**: Painel de controle

## 📖 Documentação Completa

- [PROFILING_IMPLEMENTATION.md](./PROFILING_IMPLEMENTATION.md) - Status e uso
- [PROFILING_GUIDE.md](./PROFILING_GUIDE.md) - Guia passo-a-passo

## 🚨 Notas Importantes

⚠️ **Apenas funciona em desenvolvimento** (`NODE_ENV=development`)

⚠️ **Backend Medusa necessário** para páginas dinâmicas

⚠️ **Desabilitar extensões** do navegador para medições precisas
