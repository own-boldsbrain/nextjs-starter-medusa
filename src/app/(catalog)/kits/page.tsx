import { Metadata } from "next";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/lib/design-system/components/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/lib/design-system/components/Card";
import { getProductsByCategory } from "@/lib/data/medusa-client";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

type SectionDefinition = {
    slug: string;
    title: string;
    description: string;
    limit?: number;
};

type JourneyStep = {
    id: string;
    title: string;
    description: string;
    ctaHref: string;
    ctaLabel: string;
};

type DeliveryPillar = {
    title: string;
    description: string;
    highlights: string[];
};

const CATEGORY_SECTIONS: SectionDefinition[] = [
    {
        slug: "kit-on-grid",
        title: "Kits On-Grid",
        description: "Pacotes completos conectados à rede, com inversores string e proteções AC/DC validadas.",
        limit: 6,
    },
    {
        slug: "kit-hibrido",
        title: "Kits Híbridos",
        description: "Combinação de geração solar com storage, preparada para backup e smart load control.",
        limit: 6,
    },
    {
        slug: "kit-off-grid-interativo",
        title: "Kits Off-Grid",
        description: "Soluções autônomas com controladores MPPT, bancos de baterias e estruturas reforçadas.",
        limit: 6,
    },
    {
        slug: "kit-antiapagao",
        title: "Kits Antiapagão",
        description: "Arquiteturas de backup instantâneo para cargas críticas em residências e pequenos negócios.",
        limit: 6,
    },
    {
        slug: "kit-zero-grid",
        title: "Kits Zero Grid",
        description: "Sistemas com controle de injeção para maximizar autoconsumo e eliminar exportação de energia.",
        limit: 6,
    },
];

const JOURNEY_STEPS: JourneyStep[] = [
    {
        id: "diagnostico",
        title: "Diagnóstico energético",
        description:
            "Importe faturas, calcule HSP e defina metas de compensação para selecionar o kit ideal por classe tarifária.",
        ctaHref: "/journeys",
        ctaLabel: "Abrir jornada 360º",
    },
    {
        id: "dimensionamento",
        title: "Dimensionamento assistido",
        description:
            "Combine geração, storage e proteções com IA de dimensionamento e gere memoriais de engenharia automaticamente.",
        ctaHref: "/sizing",
        ctaLabel: "Dimensionar kit",
    },
    {
        id: "configuracao",
        title: "Configuração do carrinho",
        description:
            "Adicione complementos, escolha logística e simule financiamentos direto no checkout omnichannel Yello.",
        ctaHref: "/cart",
        ctaLabel: "Ir para checkout",
    },
    {
        id: "pos-venda",
        title: "Onboarding e pós-venda",
        description:
            "Agende instalação, monitore KPIs e receba alertas de manutenção e upgrades de forma automática.",
        ctaHref: "/account",
        ctaLabel: "Gerenciar pedidos",
    },
];

const DELIVERY_PILLARS: DeliveryPillar[] = [
    {
        title: "Engenharia orientada a dados",
        description: "Curadoria técnica para garantir performance e conformidade regulatória em qualquer modalidade GD.",
        highlights: [
            "Memorial descritivo automático com PR e fator de dimensionamento",
            "Validação ANEEL REN 482/2012, REN 1000/2021 e Lei 14.300",
            "Checklists de aterramento, SPD e seccionamento prontos para uso",
        ],
    },
    {
        title: "Experiência integrada",
        description: "Workflow em camadas que conecta discovery, carrinho e pós-venda com design system unificado.",
        highlights: [
            "Cards responsivos com ProductCard e layout content-container",
            "Checkout com cálculo de frete, parcelamento e integrações bancárias",
            "Painel do cliente com status de pedido, instalação e garantias",
        ],
    },
    {
        title: "Expansão recorrente",
        description: "Gatilhos de upsell e monitoramento contínuo para aumentar lifetime value dos kits vendidos.",
        highlights: [
            "Playbooks de upgrade para storage, EV e automação residencial",
            "Alertas proativos de manutenção preventiva via integrações de monitoramento",
            "Relatórios ESG com métricas de economia e emissões evitadas",
        ],
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Kits Solares Completos | Jornada End-to-End | Yello Solar Hub",
    description:
        "Escolha kits on-grid, off-grid, híbridos e zero grid com curadoria técnica, dimensionamento assistido e UX integrada do diagnóstico ao pós-venda.",
};

async function loadSections() {
    const sections = await Promise.all(
        CATEGORY_SECTIONS.map(async (section) => {
            const { products } = await getProductsByCategory(section.slug, 0, section.limit ?? 12);
            return {
                ...section,
                products,
            };
        })
    );

    return sections.filter((section) => section.products.length > 0);
}

export default async function KitsCatalogPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12 space-y-16">
            <header className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange">
                    Catálogo de Kits
                </div>
                <h1 className="text-5xl font-black text-gradient-yello">
                    Kits solares prontos para instalar
                </h1>
                <p className="mx-auto max-w-4xl text-lg text-geist-600">
                    Estruture ofertas completas para qualquer perfil de consumo: integre diagnóstico, dimensionamento, logística e pós-venda em uma única jornada com componentes homologados.
                </p>
            </header>

            <section aria-labelledby="kits-journey" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="kits-journey" className="text-3xl font-bold text-geist-900">
                        Workflow end-to-end
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Cada etapa foi desenhada para reduzir tempo de proposta, mitigar erros de engenharia e acelerar a instalação em campo, mantendo o cliente informado em tempo real.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {JOURNEY_STEPS.map((step) => (
                        <Card key={step.id} className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {step.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-geist-600">
                                    {step.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LocalizedClientLink href={step.ctaHref}>
                                    <Button yelloVariant="primary" size="sm" fullWidth>
                                        {step.ctaLabel}
                                    </Button>
                                </LocalizedClientLink>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section aria-labelledby="kits-catalog" className="space-y-8">
                <header className="space-y-3 text-center">
                    <h2 id="kits-catalog" className="text-3xl font-bold text-geist-900">
                        Seleção curada de kits solares
                    </h2>
                    <p className="mx-auto max-w-3xl text-geist-600">
                        Compare variações on-grid, híbridas, off-grid e zero grid. Utilize filtros avançados no carrinho para ajustar potência, tensões e monitoramento.
                    </p>
                </header>

                {sections.length === 0 ? (
                    <div className="text-center rounded-2xl border border-dashed border-geist-200 bg-geist-50/60 px-6 py-16">
                        <p className="text-xl font-semibold text-geist-500 mb-2">Nenhum kit encontrado no catálogo.</p>
                        <p className="text-sm text-geist-500">
                            Execute os seeds de catálogo no backend medusa ou sincronize com a API para liberar os kits.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {sections.map((section) => (
                            <section key={section.slug} className="space-y-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-3xl font-semibold text-geist-900">{section.title}</h3>
                                        <p className="text-geist-600 max-w-2xl">{section.description}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-geist-200 px-4 py-1 text-sm text-geist-500">
                                        {section.products.length} produtos
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {section.products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </section>

            <section aria-labelledby="kits-pillars" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="kits-pillars" className="text-3xl font-bold text-geist-900">
                        Pilares de entrega
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Estabeleça padrões de engenharia, UX e pós-venda para replicar a mesma experiência em todas as modalidades de kit.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {DELIVERY_PILLARS.map((pillar) => (
                        <Card key={pillar.title} className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {pillar.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-geist-600">
                                    {pillar.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-geist-600">
                                    {pillar.highlights.map((highlight, index) => (
                                        <li key={`${pillar.title}-${index}`} className="flex items-start gap-2">
                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yello-yellow" aria-hidden="true" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-yello-yellow/40 bg-yello-yellow50 px-8 py-10 text-center">
                <h2 className="text-3xl font-bold text-geist-900 mb-3">Continuar a jornada</h2>
                <p className="mx-auto mb-6 max-w-3xl text-base text-geist-700">
                    Direcione o cliente para a jornada solar completa, gere propostas assináveis e acompanhe instalações pelo painel unificado Yello.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <LocalizedClientLink href="/journeys">
                        <Button yelloVariant="primary" size="md">
                            Abrir Buyer Journey
                        </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/automacao-residencial">
                        <Button yelloVariant="ghost" size="md">
                            Expandir com automação
                        </Button>
                    </LocalizedClientLink>
                </div>
            </section>
        </div>
    );
}
