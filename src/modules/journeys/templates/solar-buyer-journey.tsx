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
import { SEGMENTS } from "@/modules/journeys/constants/segments";

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

export function SegmentList({
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
        <div className="content-container py-12 space-y-16" data-testid="solar-buyer-journey">
            <header className="text-center space-y-4" data-testid="journey-360-header">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange" data-testid="journey-360-badge">
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

            <section aria-labelledby="journey-steps" data-testid="journey-steps-section">
                <h2 id="journey-steps" className="sr-only">
                    Etapas da jornada do comprador
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" data-testid="journey-steps-grid">
                    {JOURNEY_STAGES.map((stage) => (
                        <Card key={stage.id} elevation="raised" className="h-full border border-geist-100 shadow-sm" data-testid={`journey-stage-${stage.id}`}>
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

            <section aria-labelledby="regulatory-segments" className="space-y-6" data-testid="regulatory-segments-section">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="regulatory-segments" className="text-3xl font-bold text-geist-900">
                        Segmentação regulatória por classe tarifária
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Estruture decisões de GD conforme Lei 14.300/2022 e o Sistema de
                        Compensação de Energia Elétrica (SCEE). Cada card reúne contexto de
                        consumo, modalidades de geração distribuída e ganchos de produto/UX
                        que devem emergir em tempo real durante a jornada.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-testid="segments-grid">
                    {SEGMENTS.map((segment) => (
                        <Card key={segment.id} className="h-full border border-geist-100 shadow-sm" data-testid={`segment-card-${segment.id}`}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {segment.title}
                                </CardTitle>
                                <CardDescription className="text-sm leading-relaxed text-geist-500">
                                    {segment.subtitle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SegmentList label="Perfil de consumo" items={segment.consumptionHighlights} />
                                <SegmentList label="Modalidades GD" items={segment.generationHighlights} />
                                <SegmentList label="Highlights da jornada" items={segment.journeyHighlights} />
                                <SegmentList label="Triggers de UX" items={segment.uxHighlights} />
                                <LocalizedClientLink href={`/journeys/${segment.id}`}>
                                    <Button yelloVariant="outline" size="sm" fullWidth>
                                        Ver jornada segmentada
                                    </Button>
                                </LocalizedClientLink>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <p className="text-xs text-geist-500">
                    Referências primárias: Lei 14.300/2022, REN 482/2012, REN 1000/2021 e
                    normas distribuidoras locais para parecer de acesso e integração ao SCEE.
                </p>
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

export function JourneyCategoryColumn({ title, categories, accent }: JourneyCategoryColumnProps) {
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
