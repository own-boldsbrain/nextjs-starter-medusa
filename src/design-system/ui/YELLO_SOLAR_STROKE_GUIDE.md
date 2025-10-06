# Yello Solar Hub - Design System Updates

## Stroke Degradê para Rebrand

### Visão Geral
O design system foi atualizado para incluir suporte ao stroke degradê do Yello Solar Hub, baseado no gradiente amarelo-laranja-rosa do logo fornecido.

### Gradiente Yello Solar
- **Cores**: `#FFCE00` (amarelo) → `#FF6600` (laranja) → `#FF0066` (rosa)
- **Direção**: 135° (diagonal)
- **Uso**: Para elementos de destaque e branding

### Variáveis CSS Adicionadas
```css
:root {
  --gradient-yello-solar: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);
  --gradient-yello-solar-stroke: linear-gradient(135deg, #FFCE00 0%, #FF6600 50%, #FF0066 100%);
}
```

### Classes Tailwind Disponíveis

#### Background Gradiente
```html
<!-- Background com gradiente -->
<div class="bg-yello-solar">
  Conteúdo com fundo gradiente
</div>

<!-- Background stroke gradiente -->
<div class="bg-yello-solar-stroke">
  Conteúdo com fundo stroke gradiente
</div>
```

#### Stroke Gradiente
```html
<!-- Elemento com stroke gradiente -->
<div class="stroke-yello-solar border-2 border-transparent" style="border-image: var(--gradient-yello-solar-stroke) 1">
  Elemento com borda gradiente
</div>
```

### Exemplo de Implementação

#### Botão com Stroke Degradê
```html
<button class="
  px-6 py-3
  bg-transparent
  text-yello-solar
  border-2
  border-transparent
  rounded-lg
  font-medium
  transition-all
  hover:bg-yello-solar/10
  focus:outline-none
  focus:ring-2
  focus:ring-yello-solar/50
" style="border-image: var(--gradient-yello-solar-stroke) 1">
  Yello Solar Hub
</button>
```

#### Card com Destaque Gradiente
```html
<div class="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent" style="border-image: var(--gradient-yello-solar-stroke) 1">
  <h3 class="text-xl font-bold text-gray-800 mb-2">Solar as a Service</h3>
  <p class="text-gray-600">Plataforma completa para energia solar fotovoltaica</p>
</div>
```

### Componentes Suportados

#### Badge com Stroke
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-transparent text-yello-solar border border-transparent" style="border-image: var(--gradient-yello-solar-stroke) 1">
  Premium
</span>
```

#### Input com Foco Gradiente
```html
<input
  type="text"
  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-transparent focus:outline-none transition-colors"
  style="focus:border-image: var(--gradient-yello-solar-stroke) 1"
  placeholder="Digite seu email"
/>
```

### Considerações Técnicas

1. **Compatibilidade**: O `border-image` é suportado em todos os navegadores modernos
2. **Performance**: Gradientes CSS são otimizados e não impactam performance
3. **Acessibilidade**: Contraste mantido com cores adequadas sobre o gradiente
4. **Responsividade**: Gradientes se adaptam automaticamente ao tamanho do elemento

### Próximos Passos

- [ ] Implementar componentes específicos do Yello Solar Hub
- [ ] Criar paleta de cores derivadas do gradiente principal
- [ ] Desenvolver animações baseadas no gradiente
- [ ] Testar acessibilidade e contraste das cores

---

*Atualização implementada para rebrand Medusa.js → Yello Solar Hub - Solar as a Service*