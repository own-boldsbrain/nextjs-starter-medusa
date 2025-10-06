"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHelioVoice = exports.useTexts = void 0;
// use-texts.ts - Hook para textos em português brasileiro
var constants_1 = require("../constants");
var useTexts = function () {
    return {
        texts: constants_1.TEXTS,
        messages: constants_1.MESSAGES,
        interpolate: constants_1.interpolate
    };
};
exports.useTexts = useTexts;
// Hook específico para tom de voz Hélio
var useHelioVoice = function () {
    var _a = (0, exports.useTexts)(), texts = _a.texts, interpolate = _a.interpolate;
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
        economyResult: function (economy, payback) {
            return interpolate("Economia: R$ {{economy}}/mês. Payback: {{payback}} anos. Bora?", { economy: economy, payback: payback });
        },
        proposalSummary: function (power, savings) {
            return interpolate("{{power}} kWp, economia R$ {{savings}}/ano. Tudo certo?", { power: power, savings: savings });
        },
        installationUpdate: function (date, status) {
            return interpolate("Instalação {{date}}: {{status}}. No trilho!", { date: date, status: status });
        },
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
    };
};
exports.useHelioVoice = useHelioVoice;
