"use strict";
// constants.ts - Textos em português brasileiro para Yello Solar Hub
// Tom de voz: "Marrento Certo" - Número primeiro, adjetivo depois
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.interpolate = exports.TEXTS = void 0;
exports.TEXTS = {
    // Gerais
    loading: "Carregando...",
    error: "Ops, deu ruim. Tenta de novo?",
    success: "Feito! Tudo certo.",
    cancel: "Cancelar",
    confirm: "Confirmar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    close: "Fechar",
    open: "Abrir",
    // Formulários
    required: "Obrigatório",
    optional: "Opcional",
    email: "Email",
    password: "Senha",
    name: "Nome",
    phone: "Telefone",
    address: "Endereço",
    cep: "CEP",
    city: "Cidade",
    state: "Estado",
    // Solar específico
    solarPower: "Potência Solar",
    energyConsumption: "Consumo de Energia",
    monthlyBill: "Conta Mensal",
    economy: "Economia",
    payback: "Payback",
    roi: "ROI",
    performance: "Performance",
    generation: "Geração",
    consumption: "Consumo",
    // CTAs (seguindo tom Hélio)
    simulateEconomy: "Simular economia",
    seeProposal: "Ver proposta",
    signProposal: "Assinar proposta",
    scheduleVisit: "Agendar visita",
    downloadApp: "Baixar app",
    contactSupport: "Falar com suporte",
    // Mensagens de sucesso
    proposalReady: "Proposta pronta! Bora ver?",
    simulationComplete: "Simulação feita. Economia real na mesa.",
    installationScheduled: "Instalação agendada. Obra no prazo.",
    // Mensagens de erro
    uploadError: "Upload falhou. Tenta de novo ou manda por email.",
    calculationError: "Cálculo travou. Me manda os dados completos?",
    networkError: "Conexão ruim. Tenta daqui a pouco.",
    // Placeholders
    enterEmail: "Digite seu email",
    enterPhone: "Digite seu telefone",
    enterCep: "Digite seu CEP",
    enterConsumption: "Conta mensal (R$)",
    enterBillValue: "Valor da conta",
    // Tooltips e ajudas
    consumptionHelp: "Valor da sua conta de luz. Sem taxa de iluminação.",
    cepHelp: "CEP do local da instalação. Precisamos pro cálculo solar.",
    // Status
    processing: "Processando...",
    calculating: "Calculando economia...",
    generatingProposal: "Gerando proposta...",
    // Unidades
    currency: "R$",
    kilowatt: "kW",
    kilowattHour: "kWh",
    percentage: "%",
    years: "anos",
    months: "meses",
    days: "dias",
    // Períodos
    monthly: "Mensal",
    yearly: "Anual",
    daily: "Diário",
    // Ações
    calculate: "Calcular",
    simulate: "Simular",
    send: "Enviar",
    receive: "Receber",
    share: "Compartilhar",
    // Confirmações
    confirmDelete: "Tem certeza? Isso some forever.",
    confirmSave: "Salvar mudanças?",
    confirmSend: "Mandar mesmo?",
    // Navegação
    home: "Início",
    dashboard: "Dashboard",
    profile: "Perfil",
    settings: "Configurações",
    help: "Ajuda",
    // Solar terms (traduzidos)
    photovoltaic: "Fotovoltaico",
    solarPanel: "Painel Solar",
    inverter: "Inversor",
    battery: "Bateria",
    solarKit: "Kit Solar",
    microgeneration: "Microgeração",
    netMetering: "Compensação",
    feedInTariff: "Tarifa de Injeção",
    // Performance
    performanceRatio: "Performance Ratio",
    solarIrradiation: "Irradiação Solar",
    energyGenerated: "Energia Gerada",
    energyConsumed: "Energia Consumida",
    selfConsumption: "Autoconsumo",
    // Status do sistema
    systemOnline: "Sistema online",
    systemOffline: "Sistema offline",
    generating: "Gerando energia",
    notGenerating: "Sem geração",
    maintenance: "Em manutenção",
    // Notificações
    newMessage: "Mensagem nova",
    systemAlert: "Alerta do sistema",
    billReady: "Conta pronta",
    reportReady: "Relatório pronto",
    // Suporte
    support: "Suporte",
    faq: "Perguntas frequentes",
    contact: "Contato",
    chat: "Chat",
    // Termos legais
    terms: "Termos de uso",
    privacy: "Privacidade",
    contract: "Contrato",
    // Estados do funil
    lead: "Lead",
    prospect: "Prospecto",
    customer: "Cliente",
    installed: "Instalado",
    active: "Ativo",
    // Métricas
    totalSavings: "Economia total",
    monthlySavings: "Economia mensal",
    annualSavings: "Economia anual",
    co2Avoided: "CO₂ evitado",
    treesEquivalent: "Árvores equivalentes",
    // Tom Hélio específico
    numberFirst: "Número primeiro, conversa depois",
    noBullshit: "Sem blábláblá, só resultado",
    roiOnTable: "ROI na mesa",
    cleanWork: "Obra limpa",
    onTime: "No prazo",
    weHandle: "A gente cuida",
    youEnjoy: "Você curte"
};
// Função helper para interpolação
var interpolate = function (text, values) {
    return Object.entries(values).reduce(function (result, _a) {
        var key = _a[0], value = _a[1];
        return result.replace(new RegExp("{{".concat(key, "}}"), 'g'), String(value));
    }, text);
};
exports.interpolate = interpolate;
// Exemplos de uso com interpolação
exports.MESSAGES = {
    economyResult: function (economy, payback) {
        return "Economia: R$ ".concat(economy, "/m\u00EAs. Payback: ").concat(payback, " anos. Bora?");
    },
    proposalSummary: function (power, savings) {
        return "".concat(power, " kWp, economia R$ ").concat(savings, "/ano. Tudo certo?");
    },
    installationUpdate: function (date, status) {
        return "Instala\u00E7\u00E3o ".concat(date, ": ").concat(status, ". No trilho!");
    }
};
