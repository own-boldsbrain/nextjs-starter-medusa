import type { CategoryMeta } from "@/lib/categories";
import { Button } from "@/lib/design-system/components/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/lib/design-system/components/Card";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

interface JourneyStage {
    id: string;
    label: string;
    title: string;
    description: string;
    ctaHref: string;
    ctaLabel: string;
}

interface SolarBuyerJourneyProps {
    kits: CategoryMeta[];
    componentes: CategoryMeta[];
    acessorios: CategoryMeta[];
}

interface SegmentDefinition {
    id: string;
    title: string;
    subtitle: string;
    consumptionHighlights: string[];
    generationHighlights: string[];
    journeyHighlights: string[];
    uxHighlights: string[];
}

const SEGMENTS: SegmentDefinition[] = [
    {
        id: "residential-b1",
        title: "Residencial B1",
        subtitle: "Grupo B | 120-800 kWh/mes | Mono/Bifasico",
        consumptionHighlights: [
            "Curva de maior consumo no período noturno com eletrodomésticos e climatização",
            "Elegível à Tarifa Branca (exceto baixa renda); simule deslocamento para fora da ponta",
            "Custo de disponibilidade permanece (30, 50 ou 100 kWh) mesmo com créditos positivos",
        ],
        generationHighlights: [
            "Microgeração on-site até 75 kW com créditos válidos por 60 meses",
            "Autoconsumo remoto para segunda residência, apartamento ou garagem",
            "Geração compartilhada ou condomínio solar com rateio por unidade consumidora",
        ],
        journeyHighlights: [
            "Descoberta por fatura/CEP -> diagnóstico HSP + histórico de 12 meses",
            "Dimensionamento IA alinhado a metas GC 115–140% e opção de storage compacto",
            "Checkout com PIX, cartão ou Parcelado Solfácil (9–10x) e homologação digital",
            "Pós-venda com monitoramento em app e alertas sobre custo mínimo e créditos",
        ],
        uxHighlights: [
            "Badge de elegibilidade Tarifa Branca e sugestão de deslocamento de cargas",
            "Aviso automático de custo de disponibilidade e vencimento de créditos",
            "Recomendação de autoconsumo remoto para apartamentos",
        ],
    },
    {
        id: "rural-b2",
        title: "Rural B2",
        subtitle: "Grupo B | Agro/irrigação | Trifásico",
        consumptionHighlights: [
            "Cargas sazonais (bombas, pivôs) com picos diurnos",
            "Tarifa Convencional ou Branca para quem desloca bombeamento",
            "Exige proteção contra surtos e poeira em ambientes severos",
        ],
        generationHighlights: [
            "Micro ou mini GD on-site; híbrido/off-grid para áreas remotas",
            "Autoconsumo remoto entre sede, pivôs e estruturas de irrigação",
            "Créditos 60 meses e possibilidade de cooperativa entre produtores",
        ],
        journeyHighlights: [
            "Perfil de carga sazonal -> simulação horária com Tarifa Branca",
            "Projeto com soft-starter/VFD e stringing otimizado para poeira e sombreamento",
            "Financiamento rural (Pronaf/Pronamp) + Parcelado Solfácil para CAPEX complementar",
            "Execução com mitigação de poeira e plano de O&M preditivo",
        ],
        uxHighlights: [
            "Sugestão de kit híbrido para áreas críticas sem rede",
            "CTA para monitoramento de bombas e alertas de sazonalidade",
            "Checklist ambiental (APP, outorga) integrado ao fluxo",
        ],
    },
    {
        id: "commercial-b3",
        title: "Comércio / Serviços B3",
        subtitle: "Grupo B | Trifásico | Multi-lojas",
        consumptionHighlights: [
            "Curvas diurnas com câmaras frias, HVAC e iluminação",
            "Elegível à Tarifa Branca; relevante para redes com horário de ponta elevado",
            "Possibilidade de integrar geração à estratégia ESG/marketing verde",
        ],
        generationHighlights: [
            "Micro/mini on-site com mitigação de sombreamento (otimizadores, MLPE)",
            "Autoconsumo remoto entre lojas e depósitos; condomínio comercial para shoppings",
            "Créditos 60 meses; excedentes podem servir operações 24/7",
        ],
        journeyHighlights: [
            "Upload de 3 faturas -> diagnóstico TOU (Branca) + curva térmica",
            "Projeto com strings dedicados a cargas críticas e plano de redundância",
            "Upsell de storage para shaving interno e EV chargers para público",
            "Checkout omnichannel + execução sem interromper operação + SLA pós-venda",
        ],
        uxHighlights: [
            "Card \"economia em horário de ponta\" com comparador Branca x Convencional",
            "Sugestão de plano multi-UC para redes de lojas",
            "Indicador ESG (tCO2 evitadas) visível no dashboard",
        ],
    },
    {
        id: "medium-voltage",
        title: "Grupo A (A3a/A4...)",
        subtitle: "Média/Alta tensão | Demanda contratada",
        consumptionHighlights: [
            "Perfil TOU com tarifas Azul ou Verde; penalidades por ultrapassagem",
            "Demanda contratada faturada mesmo com créditos de energia",
            "Necessidade de parecer de acesso e estudos de proteção",
        ],
        generationHighlights: [
            "Mini GD 75 kW - 3 MW (até 5 MW em casos específicos) on-site ou solo",
            "Autoconsumo remoto, consórcios ou PPAs para CAPEX zero",
            "Integração com geração despachável (diesel/gás) para continuidade",
        ],
        journeyHighlights: [
            "Auditoria tarifária Azul vs Verde e análise de demanda",
            "Pré-projeto com layout solo/telhado e rota de conexão",
            "Análise CAPEX vs PPA/EaaS e parecer de acesso ANEEL",
            "Execução EPC + O&M com metas de disponibilidade >99%",
        ],
        uxHighlights: [
            "Banner \"energia compensa, demanda não\" com simulador Azul x Verde",
            "Checklist de documentação (ART, parecer de acesso, PPE)",
            "Dashboard com KPIs de demanda, fator de carga e SLA",
        ],
    },
    {
        id: "public-sector",
        title: "Poder Público / Iluminação",
        subtitle: "B4 e prédios públicos | Consórcios",
        consumptionHighlights: [
            "B4 (iluminação) não adere à Tarifa Branca; prédios públicos seguem B3 ou Grupo A",
            "Necessidade de transparência orçamentária e compliance",
            "Projetos vinculados a métricas ESG e metas climáticas municipais",
        ],
        generationHighlights: [
            "Geração compartilhada municipal (fazenda solar) com rateio multi-UC",
            "Autoconsumo em condomínios administrativos e escolas",
            "Modelos PPA/EaaS para evitar impacto em CAPEX público",
        ],
        journeyHighlights: [
            "Mapeamento de cargas públicas e centros de custo",
            "Modelo jurídico (consórcio, cooperativa, concessão)",
            "Implantação de usina remota + governança de créditos",
            "Portal de transparência com métricas ESG e relatórios",
        ],
        uxHighlights: [
            "CTA para compliance e documentação licitatória",
            "Template de relatório ESG para publicação",
            "Indicadores de economia por secretaria ou distrito",
        ],
    },
];

function SegmentList({
    label,
    items,
}: {
    label: string;
    items: string[];
}) {
    return (
        <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-geist-500">
                {label}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-geist-600">
                {items.map((item, index) => (
                    <li key={`${label}-${index}`}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

const JOURNEY_STAGES: JourneyStage[] = [
    {
        id: "discover",
        label: "01",
        title: "Descoberta & Inspiração",
        description:
            "Comece explorando o ecossistema Yello: veja macrocategorias de sistemas fotovoltaicos, tendências HSP e estudos de ROI direto no catálogo.",
        ctaHref: "/sistemas-fotovoltaicos",
        ctaLabel: "Explorar sistemas",
    },
    {
        id: "build",
        label: "02",
        title: "Curadoria & Configuração",
        description:
            "Aprofunde-se em kits completos ou componentes específicos. Combine painéis, inversores, estruturas e acessórios com filtros inteligentes.",
        ctaHref: "/equipamentos",
        ctaLabel: "Montar kit",
    },
    {
        id: "dimensioning",
        label: "03",
        title: "Dimensionamento Assistido",
        description:
            "Aplique IA de dimensionamento para alinhar geração, consumo e metas regulatórias. Gere recomendações com base em HSP, PR e metas GC.",
        ctaHref: "/sizing",
        ctaLabel: "Dimensionar projeto",
    },
    {
        id: "conversion",
        label: "04",
        title: "Conversão & Checkout",
        description:
            "Finalize a compra com carrinho omnichannel, cálculo de frete e checkout seguro. Integração total com Medusa Store API e pagamentos tokenizados.",
        ctaHref: "/cart",
        ctaLabel: "Ir para carrinho",
    },
    {
        id: "post-sale",
        label: "05",
        title: "Onboarding & Pós-venda",
        description:
            "Acompanhe pedidos, agende instalação e gerencie contratos, garantias e upgrades diretamente no painel do cliente.",
        ctaHref: "/account",
        ctaLabel: "Acessar conta",
    },
];

export function SolarBuyerJourney({
    kits,
    componentes,
    acessorios,
}: SolarBuyerJourneyProps) {
    return (
        <div className="content-container py-12 space-y-16">
            <header className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange">
                    Jornada 360º
                </div>
                <h1 className="text-5xl font-black text-gradient-yello">
                    Buyer Journey Solar End-to-End
                </h1>
                <p className="mx-auto max-w-4xl text-lg text-geist-600">
                    Uma experiência contínua de descoberta, dimensionamento, conversão e
                    pós-venda. Cada etapa combina o Design System Yello, dados do
                    catálogo Medusa e integrações IA para acelerar o fechamento com
                    qualidade enterprise.
                </p>
            </header>

            <section aria-labelledby="journey-steps">
                <h2 id="journey-steps" className="sr-only">
                    Etapas da jornada do comprador
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {JOURNEY_STAGES.map((stage) => (
                        <Card key={stage.id} elevation="raised" className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yello-yellow to-yello-magenta text-lg font-bold text-black">
                                    {stage.label}
                                </div>
                                <CardTitle className="text-2xl font-semibold">
                                    {stage.title}
                                </CardTitle>
                                <CardDescription className="text-sm leading-relaxed text-geist-600">
                                    {stage.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LocalizedClientLink href={stage.ctaHref}>
                                    <Button yelloVariant="primary" size="sm" fullWidth>
                                        {stage.ctaLabel}
                                    </Button>
                                </LocalizedClientLink>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section aria-labelledby="catalog-entrypoints" className="space-y-8">
                <header className="space-y-3 text-center">
                    <h2 id="catalog-entrypoints" className="text-3xl font-bold text-geist-900">
                        Pontos de entrada por categoria
                    </h2>
                    <p className="mx-auto max-w-3xl text-geist-600">
                        Ligue cada etapa da jornada aos segmentos do catálogo: escolha kits
                        completos, componentes principais e acessórios estratégicos para
                        upgrades e pós-venda.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <JourneyCategoryColumn title="Kits Completos" categories={kits} accent="from-yello-yellow to-yello-orange" />
                    <JourneyCategoryColumn title="Componentes Principais" categories={componentes} accent="from-yello-magenta to-yello-orange" />
                    <JourneyCategoryColumn title="Acessórios e Expansões" categories={acessorios} accent="from-geist-400 to-geist-600" />
                </div>
            </section>

            <section aria-labelledby="supporting-actions" className="space-y-6">
                <h2 id="supporting-actions" className="text-3xl font-bold text-geist-900">
                    Ações complementares
                </h2>
                <p className="text-geist-600">
                    Garanta consistência operacional com monitoramento contínuo, upsell de
                    storage e integrações com plataformas IoT para maximizar o lifetime
                    value do cliente.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card elevation="floating">
                        <CardHeader>
                            <CardTitle className="text-xl">Monitoramento e IA Operacional</CardTitle>
                            <CardDescription>
                                Automatize alertas, preveja manutenções e combine dados de
                                monitoramento com histórico de compras para criar jornadas de
                                upsell proativas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-3">
                            <LocalizedClientLink href="/automacao-residencial">
                                <Button yelloVariant="outline" size="sm">
                                    Integrações residenciais
                                </Button>
                            </LocalizedClientLink>
                            <LocalizedClientLink href="/otimizacao-expansao">
                                <Button yelloVariant="ghost" size="sm">
                                    Upgrades inteligentes
                                </Button>
                            </LocalizedClientLink>
                        </CardContent>
                    </Card>

                    <Card elevation="floating">
                        <CardHeader>
                            <CardTitle className="text-xl">Pós-venda e Expansão</CardTitle>
                            <CardDescription>
                                Configure journeys automáticas para propor storage, mobilidade
                                elétrica e manutenção programada após conclusão da instalação.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-3">
                            <LocalizedClientLink href="/armazenamento-energia">
                                <Button yelloVariant="outline" size="sm">
                                    Ofertas de storage
                                </Button>
                            </LocalizedClientLink>
                            <LocalizedClientLink href="/mobilidade-eletrica">
                                <Button yelloVariant="ghost" size="sm">
                                    Mobilidade elétrica
                                </Button>
                            </LocalizedClientLink>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

interface JourneyCategoryColumnProps {
    title: string;
    categories: CategoryMeta[];
    accent: string;
}

function JourneyCategoryColumn({ title, categories, accent }: JourneyCategoryColumnProps) {
    return (
        <article className="space-y-4">
            <header className="space-y-2">
                <h3 className="text-2xl font-semibold text-geist-900">{title}</h3>
                <div
                    className={`h-1 w-16 rounded-full bg-gradient-to-r ${accent}`}
                    aria-hidden="true"
                />
            </header>

            <ul className="space-y-3">
                {categories.map((category) => (
                    <li key={category.id}>
                        <LocalizedClientLink
                            href={`/equipamentos/${category.slug}`}
                            className="block rounded-xl border border-geist-200 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-yello-orange hover:shadow-lg"
                        >
                            <p className="text-sm font-semibold text-geist-900">{category.title}</p>
                            <p className="text-xs text-geist-600">{category.description}</p>
                        </LocalizedClientLink>
                    </li>
                ))}
            </ul>
        </article>
    );
}
