import type { CategoryMeta } from "@/lib/categories";

export type SegmentDefinition = {
    id: string;
    title: string;
    subtitle: string;
    overview: string;
    consumptionHighlights: string[];
    generationHighlights: string[];
    journeyHighlights: string[];
    uxHighlights: string[];
    recommendedCategories: {
        kits: string[];
        componentes: string[];
        acessorios: string[];
    };
    supportResources: Array<{
        title: string;
        description: string;
        href: string;
    }>;
};

export const SEGMENTS: SegmentDefinition[] = [
    {
        id: "residential-b1",
        title: "Residencial B1",
        subtitle: "Grupo B | 120-800 kWh/mes | Mono/Bifasico",
        overview:
            "Consumidores residenciais com faturas entre 120 e 800 kWh e possibilidade de adesao a Tarifa Branca. Jornada orientada a deslocamento de cargas, autoconsumo remoto e monitoramento de creditos.",
        consumptionHighlights: [
            "Curva com picos no periodo noturno por eletrodomesticos e climatizacao",
            "Elegivel a Tarifa Branca (exceto baixa renda); simule deslocamento fora da ponta",
            "Custo de disponibilidade permanece (30, 50 ou 100 kWh) mesmo com creditos positivos",
        ],
        generationHighlights: [
            "Microgeracao on-site ate 75 kW com creditos validos por 60 meses",
            "Autoconsumo remoto para segunda residencia, apartamento ou garagem",
            "Geracao compartilhada ou condominio solar com rateio por unidade consumidora",
        ],
        journeyHighlights: [
            "Descoberta por fatura ou CEP -> diagnostico HSP e historico de 12 meses",
            "Dimensionamento IA alinhado a metas GC 115-140% e opcao de storage compacto",
            "Checkout com PIX, cartao ou parcelado parceiras e homologacao digital",
            "Pos-venda com monitoramento em app e alertas sobre custo minimo e creditos",
        ],
        uxHighlights: [
            "Badge de elegibilidade Tarifa Branca e sugestao de deslocamento de cargas",
            "Aviso automatico de custo de disponibilidade e vencimento de creditos",
            "Recomendacao de autoconsumo remoto para apartamentos",
        ],
        recommendedCategories: {
            kits: ["kit-on-grid", "kit-hibrido", "kit-zero-grid"],
            componentes: ["paineis-solares", "inversores", "medidor-grid-zero"],
            acessorios: ["string-box", "estrutura-de-montagem", "carregadores-veiculares"],
        },
        supportResources: [
            {
                title: "Dimensionamento residencial",
                description: "Utilize o fluxo de sizing para comparar metas de compensacao vs custo de disponibilidade.",
                href: "/sizing",
            },
            {
                title: "Automacao com Tarifa Branca",
                description: "Integre automacoes residenciais para deslocar cargas e programar EV chargers.",
                href: "/automacao-residencial",
            },
        ],
    },
    {
        id: "rural-b2",
        title: "Rural B2",
        subtitle: "Grupo B | Agro/irrigacao | Trifasico",
        overview:
            "Produtores rurais com cargas sazonais, bombas e pivots. Necessidade de proteger equipamentos em ambientes severos e aproveitar linhas de credito rural.",
        consumptionHighlights: [
            "Cargas sazonais com picos diurnos em bombas e pivots",
            "Tarifa Convencional ou Branca para deslocar bombeamento",
            "Ambientes com poeira e surtos exigem protecao reforcada",
        ],
        generationHighlights: [
            "Micro ou mini GD on-site; hibrido ou off-grid para areas remotas",
            "Autoconsumo remoto entre sede, pivots e estruturas de irrigacao",
            "Creditos validos por 60 meses e cooperativas entre produtores",
        ],
        journeyHighlights: [
            "Perfil de carga sazonal -> simulacao horaria com Tarifa Branca",
            "Projeto com soft-starter ou VFD e stringing otimizado",
            "Financiamento rural e parcelado solar para CAPEX complementar",
            "Execucao com mitigacao de poeira e plano de O&M preditivo",
        ],
        uxHighlights: [
            "Sugestao de kit hibrido para areas sem rede",
            "CTA para monitoramento de bombas e alertas de sazonalidade",
            "Checklist ambiental (APP, outorga) integrado ao fluxo",
        ],
        recommendedCategories: {
            kits: ["kit-off-grid-interativo", "kit-hibrido"],
            componentes: ["paineis-solares", "inversores", "baterias"],
            acessorios: ["bomba-de-agua", "string-box", "estrutura-de-montagem"],
        },
        supportResources: [
            {
                title: "Playbook agro",
                description: "Checklists de licenciamento ambiental, outorga e conformidade para projetos rurais.",
                href: "/docs/agro-playbook",
            },
            {
                title: "Irrigacao inteligente",
                description: "Automacao de bombas solares e sensores para monitorar sazonalidade.",
                href: "/automacao-residencial",
            },
        ],
    },
    {
        id: "commercial-b3",
        title: "Comercio e Servicos B3",
        subtitle: "Grupo B | Trifasico | Multi-lojas",
        overview:
            "Redes comerciais com operacao diurna intensa, salas frias e HVAC. Foco em reducao de ponta e integracao ESG para marca.",
        consumptionHighlights: [
            "Curvas diurnas com camaras frias, HVAC e iluminacao",
            "Elegivel a Tarifa Branca em horarios de ponta elevados",
            "Integracao da geracao com narrativas ESG e marketing",
        ],
        generationHighlights: [
            "Micro ou mini GD on-site com mitigacao de sombreamento",
            "Autoconsumo remoto entre lojas, centros de distribuicao e estoque",
            "Creditos por 60 meses com excedentes para operacoes 24/7",
        ],
        journeyHighlights: [
            "Upload de 3 faturas -> diagnostico TOU e curva termica",
            "Projeto com strings dedicados a cargas criticas",
            "Upsell de storage para peak shaving e EV chargers para clientes",
            "Checkout omnichannel com execucao sem parar operacao",
        ],
        uxHighlights: [
            "Card economia em horario de ponta com comparador",
            "Sugestao de plano multi-UC para redes de lojas",
            "Indicador ESG com tCO2 evitadas no dashboard",
        ],
        recommendedCategories: {
            kits: ["kit-on-grid", "kit-zero-grid", "kit-antiapagao"],
            componentes: ["paineis-solares", "inversores", "medidor-grid-zero"],
            acessorios: ["string-box", "estrutura-de-montagem", "carregadores-veiculares"],
        },
        supportResources: [
            {
                title: "Templates ESG",
                description: "Relatorios de emissao evitada e ROI energetico para boards e franquias.",
                href: "/docs/esg-templates",
            },
            {
                title: "Infraestrutura EV",
                description: "Integre carregadores solares para clientes e frotas corporativas.",
                href: "/mobilidade-eletrica",
            },
        ],
    },
    {
        id: "medium-voltage",
        title: "Grupo A (Media Tensao)",
        subtitle: "Demanda contratada | Azul ou Verde",
        overview:
            "Consumidores com demanda contratada, penalidades por ultrapassagem e processos de parecer de acesso. Projetos exigem engenharia detalhada e compliance rigido.",
        consumptionHighlights: [
            "Perfil TOU com tarifas Azul ou Verde e penalidades",
            "Demanda contratada faturada mesmo com creditos",
            "Necessidade de parecer de acesso e estudos de protecao",
        ],
        generationHighlights: [
            "Mini GD 75 kW a 3 MW on-site ou solo",
            "Autoconsumo remoto, consorcios ou PPAs para CAPEX zero",
            "Integracao com geracao despachavel para continuidade",
        ],
        journeyHighlights: [
            "Auditoria tarifaria Azul vs Verde e analise de demanda",
            "Pre-projeto com layout solo ou telhado e plano de conexao",
            "Analise CAPEX vs PPA ou Energy as a Service",
            "Execucao EPC com metas de disponibilidade acima de 99%",
        ],
        uxHighlights: [
            "Banner energia compensa, demanda nao com simulador",
            "Checklist documental com ART, parecer e PPE",
            "Dashboard com KPIs de demanda e fator de carga",
        ],
        recommendedCategories: {
            kits: ["kit-antiapagao", "kit-on-grid", "kit-hibrido"],
            componentes: ["paineis-solares", "inversores", "transformador"],
            acessorios: ["string-box", "estrutura-de-montagem", "medidor-grid-zero"],
        },
        supportResources: [
            {
                title: "Toolkit parecer de acesso",
                description: "Fluxo de documentacao, memoriais e comunicacao com distribuidoras.",
                href: "/docs/parecer-acesso",
            },
            {
                title: "Modelos financeiros",
                description: "Planilhas de CAPEX vs PPA e simuladores de SLA para contratos EPC.",
                href: "/docs/modelos-financeiros",
            },
        ],
    },
    {
        id: "public-sector",
        title: "Poder Publico e Iluminacao",
        subtitle: "Consorcios | Cooperativas publicas",
        overview:
            "Organs publicos e projetos de iluminacao que exigem transparencia, compliance e distribuicao de creditos entre unidades consumidoras.",
        consumptionHighlights: [
            "Iluminacao publica nao adere a Tarifa Branca; predios seguem B3 ou Grupo A",
            "Necessidade de transparencia orcamentaria e compliance",
            "Projetos ligados a metas ESG e estrategias climaticas municipais",
        ],
        generationHighlights: [
            "Geracao compartilhada municipal com rateio multi-UC",
            "Autoconsumo em condominios administrativos e escolas",
            "Modelos PPA ou EaaS para evitar impacto em CAPEX publico",
        ],
        journeyHighlights: [
            "Mapeamento de cargas publicas e centros de custo",
            "Modelo juridico de consorcio, cooperativa ou concessao",
            "Implantacao de usina remota com governanca de creditos",
            "Portal de transparencia com metricas ESG",
        ],
        uxHighlights: [
            "CTA para compliance e documentacao licitatoria",
            "Template de relatorio ESG para publicacao",
            "Indicadores de economia por secretaria ou distrito",
        ],
        recommendedCategories: {
            kits: ["kit-on-grid", "kit-antiapagao"],
            componentes: ["paineis-solares", "inversores", "transformador"],
            acessorios: ["string-box", "estrutura-de-montagem", "medidor-grid-zero"],
        },
        supportResources: [
            {
                title: "Guia licitacoes",
                description: "Documentos, planilhas e memoriais adaptados a compras governamentais.",
                href: "/docs/licitacoes",
            },
            {
                title: "Relatorios ESG",
                description: "Dashboards e templates para publicar resultados de economia e emissao evitada.",
                href: "/docs/esg-templates",
            },
        ],
    },
];

export function getSegmentById(id: string): SegmentDefinition | undefined {
    return SEGMENTS.find((segment) => segment.id === id);
}

export function getSegmentCategoryMetas(
    slugs: string[],
    map: Record<string, CategoryMeta>
): CategoryMeta[] {
    return slugs
        .map((slug) => map[slug])
        .filter((category): category is CategoryMeta => Boolean(category));
}
