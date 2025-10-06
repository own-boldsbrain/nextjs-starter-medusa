// use-texts.ts - Hook para textos em português brasileiro
import { TEXTS, MESSAGES, interpolate } from '../constants'

export const useTexts = () => {
  return {
    texts: TEXTS,
    messages: MESSAGES,
    interpolate
  }
}

// Hook específico para tom de voz Hélio
export const useHelioVoice = () => {
  const { texts, interpolate } = useTexts()

  return {
    // CTAs no tom Hélio
    cta: {
      simulate: texts.simulateEconomy,
      proposal: texts.seeProposal,
      sign: texts.signProposal,
      schedule: texts.scheduleVisit,
      download: texts.downloadApp,
      support: texts.contactSupport
    },

    // Mensagens de sucesso
    success: {
      proposal: texts.proposalReady,
      simulation: texts.simulationComplete,
      installation: texts.installationScheduled
    },

    // Mensagens de erro (tom confiante, não dramático)
    error: {
      upload: texts.uploadError,
      calculation: texts.calculationError,
      network: texts.networkError
    },

    // Funções de mensagem dinâmica
    economyResult: (economy: number, payback: number) =>
      interpolate("Economia: R$ {{economy}}/mês. Payback: {{payback}} anos. Bora?", { economy, payback }),

    proposalSummary: (power: number, savings: number) =>
      interpolate("{{power}} kWp, economia R$ {{savings}}/ano. Tudo certo?", { power, savings }),

    installationUpdate: (date: string, status: string) =>
      interpolate("Instalação {{date}}: {{status}}. No trilho!", { date, status }),

    // Princípios do tom Hélio
    principles: {
      numberFirst: texts.numberFirst,
      noBullshit: texts.noBullshit,
      roiOnTable: texts.roiOnTable,
      cleanWork: texts.cleanWork,
      onTime: texts.onTime,
      weHandle: texts.weHandle,
      youEnjoy: texts.youEnjoy
    }
  }
}