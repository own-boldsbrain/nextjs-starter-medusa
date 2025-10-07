'use client'

import { useState, useCallback } from 'react'
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react'

interface ROICalculation {
  monthlySavings: number
  annualSavings: number
  roi: number
  paybackYears: number
  systemSize: number
  estimatedCost: number
}

interface ROICalculatorWidgetProps {
  className?: string
}

type TariffType = 'convencional' | 'branca' | 'azul' | 'verde'

const TARIFF_RATES = {
  convencional: 0.85, // R$/kWh - tarifa média residencial
  branca: 0.92,    // R$/kWh - tarifa branca média
  azul: 0.78,      // R$/kWh - tarifa azul média
  verde: 0.65      // R$/kWh - tarifa verde média
} as const

const SOLAR_GENERATION_FACTOR = 0.85 // Eficiência média do sistema
const SYSTEM_COST_PER_KWP = 8500 // R$/kWp - custo médio brasileiro
const ANNUAL_MAINTENANCE = 0.01 // 1% do investimento anual

export function ROICalculatorWidget({ className = '' }: ROICalculatorWidgetProps) {
  const [inputType, setInputType] = useState<'bill' | 'consumption'>('bill')
  const [billAmount, setBillAmount] = useState<string>('')
  const [consumption, setConsumption] = useState<string>('')
  const [tariffType, setTariffType] = useState<TariffType>('convencional')
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<ROICalculation | null>(null)
  const [error, setError] = useState<string>('')

  const calculateROI = useCallback(async () => {
    setIsCalculating(true)
    setError('')
    setResult(null)

    try {
      // Validar inputs
      const billValue = inputType === 'bill' ? parseFloat(billAmount) : 0
      const consumptionValue = inputType === 'consumption' ? parseFloat(consumption) : 0

      if (inputType === 'bill' && (!billValue || billValue < 50)) {
        throw new Error('Valor da conta deve ser maior que R$ 50')
      }

      if (inputType === 'consumption' && (!consumptionValue || consumptionValue < 50)) {
        throw new Error('Consumo deve ser maior que 50 kWh')
      }

      // Estimar consumo baseado na conta ou usar valor direto
      const monthlyConsumption = inputType === 'bill'
        ? billValue / TARIFF_RATES[tariffType]
        : consumptionValue

      // Calcular tamanho do sistema necessário (regra básica: 85% do consumo)
      const systemSize = monthlyConsumption * SOLAR_GENERATION_FACTOR / 30 / 5 // kWp

      // Estimar custo do sistema
      const systemCost = systemSize * SYSTEM_COST_PER_KWP

      // Calcular economia mensal (70% da conta atual - manutenção)
      const monthlySavings = billValue * 0.7 // 70% de redução típica
      const annualSavings = monthlySavings * 12

      // Calcular ROI e payback
      const annualMaintenance = systemCost * ANNUAL_MAINTENANCE
      const netAnnualSavings = annualSavings - annualMaintenance
      const roi = (netAnnualSavings / systemCost) * 100
      const paybackYears = systemCost / netAnnualSavings

      const calculation: ROICalculation = {
        monthlySavings,
        annualSavings,
        roi,
        paybackYears,
        systemSize: Math.round(systemSize * 100) / 100,
        estimatedCost: Math.round(systemCost / 1000) * 1000 // Arredondar para milhares
      }

      setResult(calculation)

      // Telemetria
      console.log(`calculate_roi_${tariffType}`, {
        inputType,
        billAmount: billValue,
        consumption: monthlyConsumption,
        tariffType,
        result: calculation
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cálculo')
    } finally {
      setIsCalculating(false)
    }
  }, [inputType, billAmount, consumption, tariffType])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const formatYears = (value: number) => {
    return `${value.toFixed(1)} anos`
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-2 border-[#FFCE00] ${className}`} data-testid="roi-calculator">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#FFCE00] rounded-lg">
          <Calculator className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Calculadora de Economia</h3>
          <p className="text-sm text-gray-600">Descubra seu potencial de economia com energia solar</p>
        </div>
      </div>

      {/* Input Type Selector */}
      <div className="mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setInputType('bill')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputType === 'bill'
              ? 'bg-[#FF6600] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            data-testid="input-type-bill"
          >
            Conta de Luz
          </button>
          <button
            onClick={() => setInputType('consumption')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputType === 'consumption'
              ? 'bg-[#FF6600] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            data-testid="input-type-consumption"
          >
            Consumo (kWh)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        {inputType === 'bill' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da conta mensal (R$)
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Ex: 350"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              data-testid="roi-input-bill"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo mensal (kWh)
            </label>
            <input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              placeholder="Ex: 400"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              data-testid="roi-input-consumption"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Tarifa
          </label>
          <select
            value={tariffType}
            onChange={(e) => setTariffType(e.target.value as TariffType)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
            data-testid="roi-tariff-select"
            aria-label="Selecione o tipo de tarifa de energia"
          >
            <option value="convencional">Convencional (R$ 0,85/kWh)</option>
            <option value="branca">Tarifa Branca (R$ 0,92/kWh)</option>
            <option value="azul">Tarifa Azul (R$ 0,78/kWh)</option>
            <option value="verde">Tarifa Verde (R$ 0,65/kWh)</option>
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateROI}
        disabled={isCalculating || (!billAmount && !consumption)}
        className="w-full bg-[#FF0066] hover:bg-[#CC0052] disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
        data-testid="roi-calculate-button"
      >
        {isCalculating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Calculando...
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5" />
            Calcular Economia
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6" data-testid="roi-result">
          <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Sua Economia Potencial
          </h4>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(result.monthlySavings)}</p>
              <p className="text-sm text-green-700">Economia Mensal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(result.annualSavings)}</p>
              <p className="text-sm text-green-700">Economia Anual</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{formatPercent(result.roi)}</p>
              <p className="text-xs text-blue-700">ROI Anual</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">{formatYears(result.paybackYears)}</p>
              <p className="text-xs text-purple-700">Payback</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-orange-600">{result.systemSize} kWp</p>
              <p className="text-xs text-orange-700">Sistema</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Investimento Estimado:</span>
              <span className="font-bold text-gray-900">{formatCurrency(result.estimatedCost)}</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-green-700 text-center">
            * Cálculos baseados em condições médias brasileiras. Consulte um especialista para avaliação precisa.
          </div>
        </div>
      )}
    </div>
  )
}
