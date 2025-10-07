import { NextRequest, NextResponse } from 'next/server'

// Interfaces para o dimensionamento
interface SizingRequest {
  consumption: {
    monthlyKwh: number
    tariffType: 'convencional' | 'branca' | 'azul' | 'verde'
    billAmount?: number
  }
  location: {
    latitude: number
    longitude: number
    city?: string
    state?: string
  }
  preferences: {
    systemType: 'on-grid' | 'off-grid' | 'hybrid'
    batteryBackup?: boolean
    priority: 'cost' | 'performance' | 'reliability'
  }
  constraints?: {
    budget?: number
    roofArea?: number // m²
    roofType?: 'ceramic' | 'metal' | 'concrete' | 'flat'
  }
}

interface SystemRecommendation {
  systemSize: number // kWp
  panelCount: number
  inverterType: string
  inverterPower: number // kW
  batteryCapacity?: number // kWh
  estimatedCost: number
  monthlyGeneration: number // kWh
  coverage: number // %
  paybackYears: number
  roi: number
  co2Savings: number // kg/year
  recommendations: string[]
  annualSavings: number
}

interface SystemAlternative {
  id: string
  name: string
  systemSize: number
  cost: number
  paybackYears: number
  pros: string[]
  cons: string[]
}

// Constantes baseadas em dados brasileiros
const SIZING_CONSTANTS = {
  // Fatores de irradiação solar por região (kWh/m²/dia)
  irradiationFactors: {
    north: 5.8,
    northeast: 5.6,
    centerWest: 5.4,
    southeast: 4.8,
    south: 4.2
  },
  // Eficiências médias
  panelEfficiency: 0.22, // 22%
  systemEfficiency: 0.85, // 85%
  inverterEfficiency: 0.95, // 95%
  // Custos médios brasileiros (R$)
  costs: {
    panelPerWp: 2.8, // R$/Wp
    inverterPerKw: 1200, // R$/kW
    batteryPerKwh: 2500, // R$/kWh
    installationPerKw: 1500, // R$/kW
    structurePerKw: 800 // R$/kW
  },
  // Padrões de dimensionamento
  standards: {
    minSystemSize: 1, // kWp
    maxSystemSize: 50, // kWp
    minCoverage: 70, // %
    maxCoverage: 100 // %
  }
} as const

export async function POST(request: NextRequest) {
  try {
    const body: SizingRequest = await request.json()

    // Validação básica
    if (!body.consumption?.monthlyKwh || !body.location || !body.preferences) {
      return NextResponse.json(
        { error: 'Dados de consumo, localização e preferências são obrigatórios' },
        { status: 400 }
      )
    }

    // Determinar região para irradiação solar
    const region = getRegionFromLocation(body.location)
    const irradiation = SIZING_CONSTANTS.irradiationFactors[region]

    // Calcular dimensionamento ótimo
    const recommendation = calculateOptimalSystem({
      ...body,
      irradiation
    })

    // Gerar alternativas
    const alternatives = generateAlternatives(recommendation, body)

    const result = {
      ...recommendation,
      alternatives,
      metadata: {
        region,
        irradiation,
        calculatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    }

    // Log para analytics
    console.log('sizing_recommend', {
      consumption: body.consumption.monthlyKwh,
      location: body.location,
      systemType: body.preferences.systemType,
      recommendation: result
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Erro no dimensionamento:', error)
    return NextResponse.json(
      { error: 'Erro interno no dimensionamento' },
      { status: 500 }
    )
  }
}

function getRegionFromLocation(location: { latitude: number; longitude: number }): keyof typeof SIZING_CONSTANTS.irradiationFactors {
  const { latitude, longitude } = location

  // Lógica simplificada de determinação de região
  if (latitude > -5) return 'north'
  if (longitude < -45 && latitude > -15) return 'northeast'
  if (longitude > -45 && latitude > -15) return 'centerWest'
  if (latitude < -20) return 'south'
  return 'southeast'
}

function calculateOptimalSystem(params: SizingRequest & { irradiation: number }): SystemRecommendation {
  const { consumption, preferences, constraints, irradiation } = params

  // Cálculo da geração mensal necessária
  const requiredMonthlyGeneration = consumption.monthlyKwh / SIZING_CONSTANTS.systemEfficiency

  // Área de painéis necessária (m²)
  const panelArea = requiredMonthlyGeneration / (irradiation * 30 * SIZING_CONSTANTS.panelEfficiency)

  // Potência do sistema (kWp)
  let systemSize = panelArea * SIZING_CONSTANTS.panelEfficiency

  // Aplicar restrições
  if (constraints?.roofArea) {
    const maxSystemSizeFromArea = constraints.roofArea * SIZING_CONSTANTS.panelEfficiency
    systemSize = Math.min(systemSize, maxSystemSizeFromArea)
  }

  // Aplicar limites
  systemSize = Math.max(SIZING_CONSTANTS.standards.minSystemSize,
               Math.min(systemSize, SIZING_CONSTANTS.standards.maxSystemSize))

  // Calcular cobertura
  const actualGeneration = systemSize * irradiation * 30 * SIZING_CONSTANTS.systemEfficiency
  const coverage = (actualGeneration / consumption.monthlyKwh) * 100

  // Dimensionar componentes
  const panelCount = Math.ceil(systemSize / 0.5) // Painéis de 500Wp
  const inverterPower = Math.ceil(systemSize * 1.2) // 20% de sobrecarga
  const inverterType = systemSize <= 5 ? 'String Inverter' :
                      systemSize <= 20 ? 'Hybrid Inverter' : 'Central Inverter'

  // Calcular custos
  const panelCost = systemSize * 1000 * SIZING_CONSTANTS.costs.panelPerWp
  const inverterCost = inverterPower * SIZING_CONSTANTS.costs.inverterPerKw
  const installationCost = systemSize * SIZING_CONSTANTS.costs.installationPerKw
  const structureCost = systemSize * SIZING_CONSTANTS.costs.structurePerKw

  let batteryCapacity = 0
  let batteryCost = 0

  if (preferences.batteryBackup) {
    batteryCapacity = consumption.monthlyKwh * 0.5 / 30 // 50% do consumo diário
    batteryCost = batteryCapacity * SIZING_CONSTANTS.costs.batteryPerKwh
  }

  const totalCost = panelCost + inverterCost + installationCost + structureCost + batteryCost

  // Calcular payback e ROI
  const monthlySavings = consumption.monthlyKwh * getTariffRate(consumption.tariffType) * 0.7
  const annualSavings = monthlySavings * 12
  const annualMaintenance = totalCost * 0.01
  const netAnnualSavings = annualSavings - annualMaintenance

  const paybackYears = totalCost / netAnnualSavings
  const roi = (netAnnualSavings / totalCost) * 100

  // Calcular redução de CO2
  const co2Savings = actualGeneration * 0.12 * 12 // kg CO2 por kWh

  // Gerar recomendações
  const recommendations = generateSizingRecommendations({
    systemSize,
    coverage,
    paybackYears,
    preferences,
    constraints
  })

  return {
    systemSize: Math.round(systemSize * 100) / 100,
    panelCount,
    inverterType,
    inverterPower,
    batteryCapacity: batteryCapacity ? Math.round(batteryCapacity * 100) / 100 : undefined,
    estimatedCost: Math.round(totalCost / 1000) * 1000,
    monthlyGeneration: Math.round(actualGeneration * 100) / 100,
    coverage: Math.round(coverage * 100) / 100,
    paybackYears: Math.round(paybackYears * 100) / 100,
    roi: Math.round(roi * 100) / 100,
    co2Savings: Math.round(co2Savings),
    recommendations,
    annualSavings: Math.round(annualSavings * 100) / 100
  }
}

function getTariffRate(tariffType: string): number {
  const rates = {
    convencional: 0.85,
    branca: 0.92,
    azul: 0.78,
    verde: 0.65
  }
  return rates[tariffType as keyof typeof rates] || 0.85
}

function generateSizingRecommendations(params: {
  systemSize: number
  coverage: number
  paybackYears: number
  preferences: SizingRequest['preferences']
  constraints?: SizingRequest['constraints']
}): string[] {
  const recommendations: string[] = []

  if (params.coverage < 80) {
    recommendations.push('Considere aumentar o tamanho do sistema para maior cobertura')
  } else if (params.coverage > 95) {
    recommendations.push('Sistema oversized - considere reduzir para otimizar payback')
  }

  if (params.paybackYears > 8) {
    recommendations.push('Payback longo - avalie opções de financiamento ou leasing')
  }

  if (params.preferences.systemType === 'off-grid' && !params.preferences.batteryBackup) {
    recommendations.push('Sistema off-grid requer bateria para armazenamento')
  }

  if (params.constraints?.roofArea && params.systemSize > params.constraints.roofArea * 0.15) {
    recommendations.push('Verifique se a área do telhado é suficiente para a instalação')
  }

  recommendations.push('Consulte um instalador credenciado para avaliação in loco')

  return recommendations
}

function generateAlternatives(main: SystemRecommendation, request: SizingRequest): SystemAlternative[] {
  const alternatives: SystemAlternative[] = []

  // Alternativa menor
  if (main.systemSize > 2) {
    const smallerSize = main.systemSize * 0.8
    const smallerCost = main.estimatedCost * 0.8
    const smallerPayback = smallerCost / (main.annualSavings * 0.8)

    alternatives.push({
      id: 'smaller',
      name: 'Sistema Compacto',
      systemSize: Math.round(smallerSize * 100) / 100,
      cost: Math.round(smallerCost / 1000) * 1000,
      paybackYears: Math.round(smallerPayback * 100) / 100,
      pros: ['Menor investimento inicial', 'Payback mais rápido'],
      cons: ['Menor economia mensal', 'Menor independência energética']
    })
  }

  // Alternativa maior
  if (main.systemSize < 20) {
    const largerSize = main.systemSize * 1.2
    const largerCost = main.estimatedCost * 1.2
    const largerPayback = largerCost / (main.annualSavings * 1.2)

    alternatives.push({
      id: 'larger',
      name: 'Sistema Premium',
      systemSize: Math.round(largerSize * 100) / 100,
      cost: Math.round(largerCost / 1000) * 1000,
      paybackYears: Math.round(largerPayback * 100) / 100,
      pros: ['Maior economia mensal', 'Maior independência energética'],
      cons: ['Maior investimento inicial', 'Payback mais longo']
    })
  }

  // Alternativa com bateria (se não tiver)
  if (!request.preferences.batteryBackup && request.preferences.systemType !== 'off-grid') {
    const batteryCost = main.estimatedCost + 5000
    const batteryPayback = batteryCost / main.annualSavings

    alternatives.push({
      id: 'with-battery',
      name: 'Com Bateria',
      systemSize: main.systemSize,
      cost: batteryCost,
      paybackYears: Math.round(batteryPayback * 100) / 100,
      pros: ['Backup de energia', 'Otimização tarifa branca'],
      cons: ['Maior investimento', 'Manutenção adicional']
    })
  }

  return alternatives
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Sizing API is running',
    version: '1.0.0'
  })
}
