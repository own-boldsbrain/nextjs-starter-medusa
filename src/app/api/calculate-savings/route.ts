import { NextRequest, NextResponse } from 'next/server'

// Tarifas médias brasileiras por modalidade (R$/kWh)
const TARIFF_RATES = {
  convencional: 0.85,
  branca: 0.92,
  azul: 0.78,
  verde: 0.65
} as const

// Fatores de cálculo baseados em dados brasileiros
const CALCULATION_CONSTANTS = {
  // Eficiência média do sistema fotovoltaico
  systemEfficiency: 0.85,
  // Custo médio por kWp instalado (R$)
  costPerKwp: 8500,
  // Fator de geração mensal médio (horas de sol equivalente)
  monthlyGenerationFactor: 140, // horas/mês
  // Taxa de manutenção anual (%)
  annualMaintenanceRate: 0.01,
  // Fator de redução de conta de luz (%)
  billReductionFactor: 0.70,
  // Tempo de payback médio (anos)
  averagePaybackYears: 6.5,
  // ROI médio anual (%)
  averageAnnualRoi: 15.4
} as const

interface CalculationRequest {
  inputType: 'bill' | 'consumption'
  billAmount?: number
  consumptionKwh?: number
  tariffType: keyof typeof TARIFF_RATES
  location?: {
    latitude: number
    longitude: number
  }
}

interface CalculationResult {
  monthlySavings: number
  annualSavings: number
  roi: number
  paybackYears: number
  systemSize: number
  estimatedCost: number
  tariffRate: number
  monthlyConsumption: number
  generationPotential: number
  co2Reduction: number
  energyIndependence: number
  recommendations: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json()

    // Validação dos inputs
    if (!body.inputType || !body.tariffType) {
      return NextResponse.json(
        { error: 'inputType e tariffType são obrigatórios' },
        { status: 400 }
      )
    }

    if (body.inputType === 'bill' && (!body.billAmount || body.billAmount < 50)) {
      return NextResponse.json(
        { error: 'Valor da conta deve ser maior que R$ 50' },
        { status: 400 }
      )
    }

    if (body.inputType === 'consumption' && (!body.consumptionKwh || body.consumptionKwh < 50)) {
      return NextResponse.json(
        { error: 'Consumo deve ser maior que 50 kWh' },
        { status: 400 }
      )
    }

    if (!TARIFF_RATES[body.tariffType]) {
      return NextResponse.json(
        { error: 'Tipo de tarifa inválido' },
        { status: 400 }
      )
    }

    // Cálculos principais
    const tariffRate = TARIFF_RATES[body.tariffType]
    const monthlyConsumption = body.inputType === 'bill'
      ? body.billAmount! / tariffRate
      : body.consumptionKwh!

    // Dimensionamento do sistema (regra básica brasileira)
    const systemSize = monthlyConsumption * CALCULATION_CONSTANTS.systemEfficiency / CALCULATION_CONSTANTS.monthlyGenerationFactor

    // Custo estimado do sistema
    const estimatedCost = systemSize * CALCULATION_CONSTANTS.costPerKwp

    // Economia mensal (70% de redução típica no Brasil)
    const monthlySavings = body.inputType === 'bill'
      ? body.billAmount! * CALCULATION_CONSTANTS.billReductionFactor
      : monthlyConsumption * tariffRate * CALCULATION_CONSTANTS.billReductionFactor

    const annualSavings = monthlySavings * 12

    // Cálculo de ROI e payback
    const annualMaintenance = estimatedCost * CALCULATION_CONSTANTS.annualMaintenanceRate
    const netAnnualSavings = annualSavings - annualMaintenance
    const roi = (netAnnualSavings / estimatedCost) * 100
    const paybackYears = estimatedCost / netAnnualSavings

    // Cálculos adicionais
    const generationPotential = systemSize * CALCULATION_CONSTANTS.monthlyGenerationFactor
    const co2Reduction = generationPotential * 0.12 // kg CO2 por kWh evitado
    const energyIndependence = Math.min((generationPotential / monthlyConsumption) * 100, 100)

    // Recomendações baseadas no perfil
    const recommendations = generateRecommendations({
      systemSize,
      monthlyConsumption,
      tariffType: body.tariffType,
      paybackYears,
      roi
    })

    const result: CalculationResult = {
      monthlySavings: Math.round(monthlySavings * 100) / 100,
      annualSavings: Math.round(annualSavings * 100) / 100,
      roi: Math.round(roi * 100) / 100,
      paybackYears: Math.round(paybackYears * 100) / 100,
      systemSize: Math.round(systemSize * 100) / 100,
      estimatedCost: Math.round(estimatedCost / 1000) * 1000, // Arredonda para milhares
      tariffRate,
      monthlyConsumption: Math.round(monthlyConsumption * 100) / 100,
      generationPotential: Math.round(generationPotential * 100) / 100,
      co2Reduction: Math.round(co2Reduction * 100) / 100,
      energyIndependence: Math.round(energyIndependence * 100) / 100,
      recommendations
    }

    // Log para analytics (será conectado ao GA4 depois)
    console.log('calculate_savings', {
      inputType: body.inputType,
      tariffType: body.tariffType,
      result
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Erro no cálculo de savings:', error)
    return NextResponse.json(
      { error: 'Erro interno no cálculo' },
      { status: 500 }
    )
  }
}

function generateRecommendations(params: {
  systemSize: number
  monthlyConsumption: number
  tariffType: keyof typeof TARIFF_RATES
  paybackYears: number
  roi: number
}): string[] {
  const recommendations: string[] = []

  // Recomendações baseadas no tamanho do sistema
  if (params.systemSize < 2) {
    recommendations.push('Sistema residencial pequeno - ideal para consumo básico')
  } else if (params.systemSize < 5) {
    recommendations.push('Sistema residencial médio - boa relação custo-benefício')
  } else {
    recommendations.push('Sistema residencial grande - máxima economia e independência')
  }

  // Recomendações baseadas no payback
  if (params.paybackYears < 5) {
    recommendations.push('Excelente payback - investimento recupera rapidamente')
  } else if (params.paybackYears < 8) {
    recommendations.push('Bom payback - investimento recupera em tempo razoável')
  } else {
    recommendations.push('Payback longo - considere opções de financiamento')
  }

  // Recomendações baseadas na tarifa
  if (params.tariffType === 'branca') {
    recommendations.push('Tarifa branca detectada - considere bateria para otimização')
  } else if (params.tariffType === 'azul') {
    recommendations.push('Tarifa azul - foco em geração durante horário de ponta')
  }

  // Recomendação geral
  recommendations.push('Consulte um instalador credenciado para avaliação precisa')

  return recommendations
}

// Endpoint GET para health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Calculate Savings API is running',
    version: '1.0.0'
  })
}