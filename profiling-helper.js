/**
 * Profiling Helper Script
 * Execute este script para preparar dados de profiling para análise
 * 
 * Uso no console do navegador:
 * 1. Abra DevTools (F12)
 * 2. Cole este código no console
 * 3. Use as funções helper abaixo
 */

// @ts-nocheck

/**
 * Exporta dados de profiling como JSON
 */
window.exportProfilingJSON = function () {
    const { downloadProfileData } = require('@/lib/design-system/dev')
    downloadProfileData('json')
    console.log('✅ JSON exportado com sucesso')
}

/**
 * Exporta dados de profiling como CSV
 */
window.exportProfilingCSV = function () {
    const { downloadProfileData } = require('@/lib/design-system/dev')
    downloadProfileData('csv')
    console.log('✅ CSV exportado com sucesso')
}

/**
 * Exporta dados de profiling como Flamegraph
 */
window.exportProfilingFlamegraph = function () {
    const { downloadProfileData } = require('@/lib/design-system/dev')
    downloadProfileData('flamegraph')
    console.log('✅ Flamegraph exportado com sucesso')
}

/**
 * Limpa todos os dados de profiling acumulados
 */
window.clearProfilingData = function () {
    const { clearProfileData } = require('@/lib/design-system/dev')
    clearProfileData()
    console.log('✅ Dados de profiling limpos')
}

/**
 * Mostra estatísticas agregadas no console
 */
window.showProfilingStats = function () {
    const { getAggregatedStats } = require('@/lib/design-system/dev')
    const stats = getAggregatedStats()

    console.group('📊 Estatísticas de Profiling')
    console.table(stats)
    console.groupEnd()

    // Top 5 mais lentos
    const slowest = stats
        .sort((a, b) => b.avgDuration - a.avgDuration)
        .slice(0, 5)

    console.group('🐌 Top 5 Componentes Mais Lentos')
    console.table(slowest.map(s => ({
        Componente: s.id,
        'Média (ms)': s.avgDuration.toFixed(2),
        'Max (ms)': s.maxDuration.toFixed(2),
        'Total Renders': s.totalRenders
    })))
    console.groupEnd()

    return stats
}

/**
 * Inicia uma sessão de profiling
 */
window.startProfilingSession = function (name = 'default') {
    window._profilingSession = {
        name,
        startTime: performance.now(),
        initialStats: window.showProfilingStats()
    }
    console.log(`🎬 Sessão de profiling iniciada: ${name}`)
}

/**
 * Finaliza uma sessão de profiling e mostra relatório
 */
window.endProfilingSession = function () {
    if (!window._profilingSession) {
        console.error('❌ Nenhuma sessão ativa. Use startProfilingSession() primeiro')
        return
    }

    const session = window._profilingSession
    const endTime = performance.now()
    const duration = endTime - session.startTime
    const finalStats = window.showProfilingStats()

    console.group(`📈 Relatório da Sessão: ${session.name}`)
    console.log(`⏱️ Duração: ${(duration / 1000).toFixed(2)}s`)
    console.log(`📊 Componentes rastreados: ${finalStats.length}`)
    console.log(`🔄 Total de renders: ${finalStats.reduce((sum, s) => sum + s.totalRenders, 0)}`)
    console.log(`⚡ Tempo total de render: ${finalStats.reduce((sum, s) => sum + s.totalDuration, 0).toFixed(2)}ms`)
    console.groupEnd()

    window._profilingSession = null

    return {
        name: session.name,
        duration,
        stats: finalStats
    }
}

// Expor no window para uso global
console.log(`
🎯 Profiling Helper carregado!

Funções disponíveis:
- exportProfilingJSON()         - Exporta dados como JSON
- exportProfilingCSV()           - Exporta dados como CSV  
- exportProfilingFlamegraph()    - Exporta dados como Flamegraph
- clearProfilingData()           - Limpa dados acumulados
- showProfilingStats()           - Mostra estatísticas no console
- startProfilingSession(name)    - Inicia sessão de profiling
- endProfilingSession()          - Finaliza sessão e mostra relatório

Exemplo de uso:
  startProfilingSession('teste-produtos')
  // ... navegue e interaja com a aplicação ...
  endProfilingSession()
  exportProfilingFlamegraph()
`)
