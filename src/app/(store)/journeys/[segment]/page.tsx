import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    getSegmentById,
    getSegmentCategoryMetas,
    SEGMENTS,
} from "@/modules/journeys/constants/segments";
import {
    SegmentList,
    JourneyCategoryColumn,
} from "@/modules/journeys/templates/solar-buyer-journey";
import { categoriesMap } from "@/lib/categories";
import { Button } from "@/lib/design-system/components/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/lib/design-system/components/Card";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

interface JourneySegmentPageProps {
    params: {
        segment: string;
    };
}

function buildMetadataTitle(title: string) {
    return `${title} | Buyer Journey Segmentada | Yello Solar Hub`;
}

export function generateStaticParams() {
    return SEGMENTS.map((segment) => ({ segment: segment.id }));
}

export function generateMetadata({ params }: JourneySegmentPageProps): Metadata {
    const segment = getSegmentById(params.segment);

    if (!segment) {
        return {
            title: "Journey nao encontrada | Yello Solar Hub",
        };
    }

    return {
        title: buildMetadataTitle(segment.title),
        description: segment.overview,
    };
}

export default function JourneySegmentPage({ params }: JourneySegmentPageProps) {
    const segment = getSegmentById(params.segment);

    if (!segment) {
        notFound();
    }

    const kitCategories = getSegmentCategoryMetas(segment.recommendedCategories.kits, categoriesMap);
    const componentCategories = getSegmentCategoryMetas(segment.recommendedCategories.componentes, categoriesMap);
    const accessoryCategories = getSegmentCategoryMetas(segment.recommendedCategories.acessorios, categoriesMap);

    return (
        <div className="content-container py-12 space-y-16">
            <header className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange">
                    Buyer Journey · {segment.subtitle}
                </div>
                <h1 className="text-5xl font-black text-gradient-yello">
                    {segment.title}
                </h1>
                <p className="mx-auto max-w-4xl text-lg text-geist-600">
                    {segment.overview}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <LocalizedClientLink href="/journeys">
                        <Button yelloVariant="ghost" size="sm">
                            Voltar para jornada 360º
                        </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/kits">
                        <Button yelloVariant="primary" size="sm">
                            Catalogo de kits
                        </Button>
                    </LocalizedClientLink>
                </div>
            </header>

            <section aria-labelledby="segment-highlights" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="segment-highlights" className="text-3xl font-bold text-geist-900">
                        Inteligencia regulatoria e operacao
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Utilize os quadros abaixo para configurar discovery, engenharia, checkout e pos-venda com gatilhos especificos deste segmento.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="h-full border border-geist-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-geist-900">
                                Perfil de consumo
                            </CardTitle>
                            <CardDescription className="text-sm text-geist-600">
                                Ajuste mensagens, simulacoes e calculos conforme padrao de carga.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SegmentList label="Pontos de atencao" items={segment.consumptionHighlights} />
                        </CardContent>
                    </Card>
                    <Card className="h-full border border-geist-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-geist-900">
                                Modalidades de geracao
                            </CardTitle>
                            <CardDescription className="text-sm text-geist-600">
                                Defina arquitetura tecnica e contratos a partir das opcoes abaixo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SegmentList label="Cenarios prioritarios" items={segment.generationHighlights} />
                        </CardContent>
                    </Card>
                    <Card className="h-full border border-geist-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-geist-900">
                                Jornada end-to-end
                            </CardTitle>
                            <CardDescription className="text-sm text-geist-600">
                                Amarre discovery, dimensionamento e execucao com as etapas listadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SegmentList label="Workflow" items={segment.journeyHighlights} />
                        </CardContent>
                    </Card>
                    <Card className="h-full border border-geist-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-geist-900">
                                Triggers de UX
                            </CardTitle>
                            <CardDescription className="text-sm text-geist-600">
                                Configure modulos do storefront, banners e mensagens proativas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SegmentList label="Experiencias chave" items={segment.uxHighlights} />
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section aria-labelledby="segment-categories" className="space-y-8">
                <header className="space-y-3 text-center">
                    <h2 id="segment-categories" className="text-3xl font-bold text-geist-900">
                        Categorias conectadas ao catalogo
                    </h2>
                    <p className="mx-auto max-w-3xl text-geist-600">
                        Oriente o cliente para kits prontos, componentes principais e acessorios que aceleram a implementacao para este perfil.
                    </p>
                </header>
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <JourneyCategoryColumn
                        title="Kits recomendados"
                        categories={kitCategories}
                        accent="from-yello-yellow to-yello-orange"
                    />
                    <JourneyCategoryColumn
                        title="Componentes criticos"
                        categories={componentCategories}
                        accent="from-yello-magenta to-yello-orange"
                    />
                    <JourneyCategoryColumn
                        title="Acessorios e expansoes"
                        categories={accessoryCategories}
                        accent="from-geist-400 to-geist-600"
                    />
                </div>
            </section>

            <section aria-labelledby="segment-support" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="segment-support" className="text-3xl font-bold text-geist-900">
                        Recursos e playbooks
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Materiais de apoio para estruturar propostas, documentacao regulatoria e narrativas comerciais.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {segment.supportResources.map((resource) => (
                        <Card key={resource.title} className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {resource.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-geist-600">
                                    {resource.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LocalizedClientLink href={resource.href}>
                                    <Button yelloVariant="outline" size="sm">
                                        Abrir recurso
                                    </Button>
                                </LocalizedClientLink>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-yello-yellow/40 bg-yello-yellow50 px-8 py-10 text-center">
                <h2 className="text-3xl font-bold text-geist-900 mb-3">Pronto para montar a proposta</h2>
                <p className="mx-auto mb-6 max-w-3xl text-base text-geist-700">
                    Combine os itens recomendados com o fluxo de dimensionamento e georefencia do Yello Solar Hub para apresentar uma oferta personalizada.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <LocalizedClientLink href="/sizing">
                        <Button yelloVariant="primary" size="md">
                            Dimensionar projeto
                        </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/produtos">
                        <Button yelloVariant="ghost" size="md">
                            Explorar componentes
                        </Button>
                    </LocalizedClientLink>
                </div>
            </section>
        </div>
    );
}
