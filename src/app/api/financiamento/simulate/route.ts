import { NextRequest, NextResponse } from 'next/server'

// Interfaces para simulação de financiamento
interface FinancingRequest {
  projectValue: number // Valor total do projeto em R$
  financingType: 'bank' | 'consortium' | 'leasing' | 'ppa'
  downPayment?: number // Valor de entrada em R$
  termMonths: number // Prazo em meses
  interestRate?: number // Taxa de juros anual (%)
  location?: {
    state: string // Estado para regras específicas
  }
}

interface FinancingSimulation {
  financingType: string
  projectValue: number
  downPayment: number
  financedAmount: number
  termMonths: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  interestRate: number
  effectiveRate: number
  recommendations: string[]
  alternatives: FinancingAlternative[]
  requirements: string[]
}

interface FinancingAlternative {
  id: string
  name: string
  monthlyPayment: number
  totalPayment: number
  pros: string[]
  cons: string[]
  suitability: 'high' | 'medium' | 'low'
}

// Constantes baseadas no mercado brasileiro
const FINANCING_CONSTANTS = {
  // Taxas de juros médias por modalidade (% ao ano)
  interestRates: {
    bank: {
      default: 12.5,
      min: 9.5,
      max: 18.0
    },
    consortium: {
      default: 8.5,
      min: 6.0,
      max: 12.0
    },
    leasing: {
      default: 10.5,
      min: 8.0,
      max: 14.0
    },
    ppa: {
      default: 0, // PPA é OPEX, sem juros
      min: 0,
      max: 0
    }
  },
  // Requisitos mínimos
  requirements: {
    minDownPayment: 0.20, // 20% mínimo
    maxTermMonths: {
      bank: 120, // 10 anos
      consortium: 180, // 15 anos
      leasing: 84, // 7 anos
      ppa: 240 // 20 anos
    }
  },
  // Regras por estado (simplificado)
  stateRules: {
    SP: { subsidy: 0.05 }, // 5% de subsídio em SP
    RJ: { subsidy: 0.03 },
    MG: { subsidy: 0.04 },
    default: { subsidy: 0 }
  }
} as const

export async function POST(request: NextRequest) {
  try {
    const body: FinancingRequest = await request.json()

    // Validação básica
    if (!body.projectValue || !body.financingType || !body.termMonths) {
      return NextResponse.json(
        { error: 'Valor do projeto, tipo de financiamento e prazo são obrigatórios' },
        { status: 400 }
      )
    }

    if (body.projectValue < 10000) {
      return NextResponse.json(
        { error: 'Valor do projeto deve ser maior que R$ 10.000' },
        { status: 400 }
      )
    }

    // Calcular simulação
    const simulation = calculateFinancingSimulation(body)

    // Gerar alternativas
    const alternatives = generateFinancingAlternatives(body, simulation)

    const result = {
      ...simulation,
      alternatives,
      metadata: {
        calculatedAt: new Date().toISOString(),
        version: '1.0.0',
        disclaimer: 'Cálculos estimativos. Consulte instituições financeiras para condições reais.'
      }
    }

    // Log para analytics
    console.log('financing_simulate', {
      projectValue: body.projectValue,
      financingType: body.financingType,
      termMonths: body.termMonths,
      simulation: result
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Erro na simulação de financiamento:', error)
    return NextResponse.json(
      { error: 'Erro interno na simulação' },
      { status: 500 }
    )
  }
}

function calculateFinancingSimulation(params: FinancingRequest): FinancingSimulation {
  const { projectValue, financingType, downPayment, termMonths, interestRate, location } = params

  // Determinar taxa de juros
  const baseRate = interestRate || FINANCING_CONSTANTS.interestRates[financingType].default
  const stateSubsidy = location?.state ? FINANCING_CONSTANTS.stateRules[location.state]?.subsidy || 0 : 0
  const finalRate = Math.max(0, baseRate - stateSubsidy)

  // Calcular entrada
  const minDownPayment = projectValue * FINANCING_CONSTANTS.requirements.minDownPayment
  const actualDownPayment = downPayment || minDownPayment
  const financedAmount = projectValue - actualDownPayment

  // Validar prazo máximo
  const maxTerm = FINANCING_CONSTANTS.requirements.maxTermMonths[financingType]
  const validTermMonths = Math.min(termMonths, maxTerm)

  // Calcular prestação (fórmula Price - sistema francês de amortização)
  let monthlyPayment = 0
  let totalPayment = 0
  let totalInterest = 0

  if (financingType === 'ppa') {
    // PPA: pagamento mensal baseado em geração estimada
    const estimatedMonthlyGeneration = projectValue / 100000 // Estimativa simplificada
    monthlyPayment = estimatedMonthlyGeneration * 0.15 // R$ 0,15 por kWh estimado
    totalPayment = monthlyPayment * validTermMonths
    totalInterest = 0
  } else {
    // Financiamento tradicional com juros
    const monthlyRate = finalRate / 100 / 12

    if (monthlyRate === 0) {
      monthlyPayment = financedAmount / validTermMonths
    } else {
      monthlyPayment = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, validTermMonths)) /
                      (Math.pow(1 + monthlyRate, validTermMonths) - 1)
    }

    totalPayment = monthlyPayment * validTermMonths
    totalInterest = totalPayment - financedAmount
  }

  // Calcular taxa efetiva (CET)
  const effectiveRate = financingType === 'ppa' ? 0 :
    ((Math.pow(totalPayment / financedAmount, 1 / (validTermMonths / 12)) - 1) * 100)

  // Gerar recomendações
  const recommendations = generateFinancingRecommendations({
    financingType,
    projectValue,
    downPayment: actualDownPayment,
    termMonths: validTermMonths,
    monthlyPayment,
    totalPayment
  })

  // Gerar lista de requisitos
  const requirements = generateRequirements(financingType, projectValue)

  return {
    financingType: getFinancingTypeName(financingType),
    projectValue,
    downPayment: actualDownPayment,
    financedAmount,
    termMonths: validTermMonths,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    interestRate: finalRate,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    recommendations,
    requirements
  }
}

function getFinancingTypeName(type: string): string {
  const names = {
    bank: 'Financiamento Bancário',
    consortium: 'Consórcio',
    leasing: 'Leasing/Arrendamento',
    ppa: 'PPA (Power Purchase Agreement)'
  }
  return names[type as keyof typeof names] || type
}

function generateFinancingRecommendations(params: {
  financingType: string
  projectValue: number
  downPayment: number
  termMonths: number
  monthlyPayment: number
  totalPayment: number
}): string[] {
  const recommendations: string[] = []

  // Recomendações baseadas no tipo
  if (params.financingType === 'bank') {
    recommendations.push('Considere programas governamentais como o BNDES para taxas reduzidas')
  } else if (params.financingType === 'consortium') {
    recommendations.push('Consórcio oferece maior poder de negociação na contemplação')
  } else if (params.financingType === 'leasing') {
    recommendations.push('Leasing permite dedução fiscal e preservação de capital')
  } else if (params.financingType === 'ppa') {
    recommendations.push('PPA elimina investimento inicial e riscos tecnológicos')
  }

  // Recomendações baseadas no valor
  if (params.monthlyPayment > params.projectValue * 0.02) {
    recommendations.push('Prestação elevada - considere aumentar entrada ou estender prazo')
  }

  // Recomendações baseadas no prazo
  if (params.termMonths > 120) {
    recommendations.push('Prazo longo aumenta custo total - avalie alternativas')
  }

  recommendations.push('Consulte múltiplas instituições para comparar condições')
  recommendations.push('Verifique benefícios fiscais disponíveis (Lei 14.300/2022)')

  return recommendations
}

function generateRequirements(financingType: string, projectValue: number): string[] {
  const requirements: string[] = [
    'Comprovante de renda',
    'Certidão negativa de débitos',
    'Projeto técnico aprovado',
    'ART do responsável técnico'
  ]

  if (financingType === 'bank') {
    requirements.push('Avaliação do imóvel')
    requirements.push('Seguro do sistema fotovoltaico')
  } else if (financingType === 'consortium') {
    requirements.push('Carta de crédito contemplada')
    requirements.push('Aporte mínimo de 10%')
  } else if (financingType === 'leasing') {
    requirements.push('Contrato de manutenção')
    requirements.push('Garantia residual')
  }

  if (projectValue > 50000) {
    requirements.push('Laudo de viabilidade técnica')
  }

  return requirements
}

function generateFinancingAlternatives(originalRequest: FinancingRequest, main: FinancingSimulation): FinancingAlternative[] {
  const alternatives: FinancingAlternative[] = []

  // Alternativa com entrada maior
  if (originalRequest.downPayment && originalRequest.downPayment < originalRequest.projectValue * 0.4) {
    const higherDownPayment = originalRequest.projectValue * 0.4
    const altRequest = { ...originalRequest, downPayment: higherDownPayment }
    const altSimulation = calculateFinancingSimulation(altRequest)

    alternatives.push({
      id: 'higher-down-payment',
      name: 'Maior Entrada (40%)',
      monthlyPayment: altSimulation.monthlyPayment,
      totalPayment: altSimulation.totalPayment,
      pros: ['Menor prestação mensal', 'Menor juros totais'],
      cons: ['Maior desembolso inicial'],
      suitability: 'high'
    })
  }

  // Alternativa com prazo menor
  if (originalRequest.termMonths > 60) {
    const shorterTerm = Math.max(36, originalRequest.termMonths - 36)
    const altRequest = { ...originalRequest, termMonths: shorterTerm }
    const altSimulation = calculateFinancingSimulation(altRequest)

    alternatives.push({
      id: 'shorter-term',
      name: 'Prazo Menor',
      monthlyPayment: altSimulation.monthlyPayment,
      totalPayment: altSimulation.totalPayment,
      pros: ['Menor juros totais', 'Quitação mais rápida'],
      cons: ['Maior prestação mensal'],
      suitability: 'medium'
    })
  }

  // Alternativa PPA (se não for PPA)
  if (originalRequest.financingType !== 'ppa') {
    const ppaRequest = { ...originalRequest, financingType: 'ppa' as const }
    const ppaSimulation = calculateFinancingSimulation(ppaRequest)

    alternatives.push({
      id: 'ppa-alternative',
      name: 'PPA (OPEX)',
      monthlyPayment: ppaSimulation.monthlyPayment,
      totalPayment: ppaSimulation.totalPayment,
      pros: ['Sem investimento inicial', 'Custos operacionais previsíveis'],
      cons: ['Custo total maior no longo prazo', 'Dependência do fornecedor'],
      suitability: 'high'
    })
  }

  return alternatives
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Financing Simulation API is running',
    version: '1.0.0',
    supportedTypes: ['bank', 'consortium', 'leasing', 'ppa']
  })
}
