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

type ValueStream = {
    title: string;
    subtitle: string;
    items: string[];
};

type SourcingPromise = {
    title: string;
    description: string;
};

const CATEGORY_SECTIONS: SectionDefinition[] = [
    {
        slug: "paineis-solares",
        title: "Painéis Fotovoltaicos",
        description: "Módulos mono e bifaciais com alta eficiência, prontos para usinas residenciais, comerciais e solo.",
        limit: 6,
    },
    {
        slug: "inversores",
        title: "Inversores e MLPE",
        description: "String, híbridos e microinversores com monitoramento em nuvem e compatibilidade com zero grid.",
        limit: 6,
    },
    {
        slug: "string-box",
        title: "Proteções AC/DC",
        description: "String box, DPS e disjuntores certificados para segurança e conformidade com normas de instalação.",
        limit: 6,
    },
    {
        slug: "estrutura-de-montagem",
        title: "Estruturas e Fixações",
        description: "Perfis, suportes e grampos para telhado, solo e trackers com engenharia otimizada.",
        limit: 6,
    },
    {
        slug: "medidor-grid-zero",
        title: "Monitoramento e Controle",
        description: "Medidores, controladores e gateways para balanceamento de cargas e geração distribuída.",
        limit: 6,
    },
    {
        slug: "carregadores-veiculares",
        title: "Carregadores Veiculares",
        description: "Wallbox inteligentes com protocolos OCPP e gestão de potência integrada ao ecossistema Yello.",
        limit: 6,
    },
    {
        slug: "bomba-de-agua",
        title: "Bombas e Motores Solares",
        description: "Bombeamento e automação hidráulica para agronegócio, saneamento e aplicações residenciais.",
        limit: 6,
    },
];

const VALUE_STREAMS: ValueStream[] = [
    {
        title: "Geração e estrutura",
        subtitle: "Componentes core para viabilizar usinas fotovoltaicas de qualquer porte",
        items: [
            "Painéis com curvas IV atualizadas e classificações IEC",
            "Inversores com homologação INMETRO e monitoramento integrado",
            "Estruturas com laudos estruturais e compatibilidade com telhado, solo e tracker",
        ],
    },
    {
        title: "Proteção e controle",
        subtitle: "Garantia de segurança elétrica e governança de energia em tempo real",
        items: [
            "String box com proteção contra surtos e seccionamento",
            "Medidores zero grid e controladores inteligentes",
            "Automação para cortes remotos, DER e manobras em campo",
        ],
    },
    {
        title: "Expansão e novos serviços",
        subtitle: "Produtos para monetizar storage, mobilidade elétrica e automação",
        items: [
            "Wallbox conectados, balanceamento dinâmico e billing EV",
            "Bombas solares, pressurização e irrigação inteligente",
            "Bundles para storage e kits híbridos com upgrade progressivo",
        ],
    },
];

const SOURCING_PROMISES: SourcingPromise[] = [
    {
        title: "Curadoria técnica",
        description: "Cada SKU passa por checklist de certificações, garantias e compatibilidade com o stack Yello.",
    },
    {
        title: "Dados unificados",
        description: "Ficha técnica, curva IV, manuais e ativos de mídia ficam disponíveis no CMS para fácil reuso.",
    },
    {
        title: "Operação omnichannel",
        description: "Integração com carrinho, BFF e painel do cliente assegura experiência consistente em qualquer canal.",
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Catálogo de Produtos Solares | Componentes Homologados | Yello Solar Hub",
    description:
        "Centralize painéis, inversores, proteções, estruturas e automações em uma experiência modular pronta para discovery, carrinho e pós-venda.",
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

export default async function ProdutosCatalogPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12 space-y-16">
            <header className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange">
                    Catálogo Modular
                </div>
                <h1 className="text-5xl font-black text-gradient-yello">
                    Componentes solares integrados
                </h1>
                <p className="mx-auto max-w-4xl text-lg text-geist-600">
                    Navegue por todos os componentes homologados do ecossistema Yello para compor kits, projetos turnkey ou vendas individuais com dados técnicos completos.
                </p>
            </header>

            <section aria-labelledby="produtos-streams" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="produtos-streams" className="text-3xl font-bold text-geist-900">
                        Como entregar valor em cada etapa
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Estruture jornadas de discovery, engenharia e pós-venda conectando os clusters abaixo à Buyer Journey Solar.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {VALUE_STREAMS.map((stream) => (
                        <Card key={stream.title} className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {stream.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-geist-600">
                                    {stream.subtitle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-geist-600">
                                    {stream.items.map((item, index) => (
                                        <li key={`${stream.title}-${index}`} className="flex items-start gap-2">
                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yello-yellow" aria-hidden="true" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section aria-labelledby="produtos-catalog" className="space-y-8">
                <header className="space-y-3 text-center">
                    <h2 id="produtos-catalog" className="text-3xl font-bold text-geist-900">
                        Produtos por categoria
                    </h2>
                    <p className="mx-auto max-w-3xl text-geist-600">
                        Utilize o grid abaixo para comparar alternativas, selecionar SKUs, exportar fichas técnicas e adicionar rapidamente ao carrinho ou aos kits.
                    </p>
                </header>

                {sections.length === 0 ? (
                    <div className="text-center rounded-2xl border border-dashed border-geist-200 bg-geist-50/60 px-6 py-16">
                        <p className="text-xl font-semibold text-geist-500 mb-2">Nenhum produto disponível nas categorias listadas.</p>
                        <p className="text-sm text-geist-500">
                            Execute a sincronização com o backend Medusa Store ou aplique seeds para liberar o catálogo completo.
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

            <section aria-labelledby="produtos-sourcing" className="space-y-6">
                <div className="space-y-3 text-center md:text-left">
                    <h2 id="produtos-sourcing" className="text-3xl font-bold text-geist-900">
                        Como mantemos o catálogo vivo
                    </h2>
                    <p className="mx-auto max-w-4xl text-base text-geist-600 md:mx-0">
                        Padronize governança de dados, curadoria técnica e experiência omnichannel para cada SKU incluído no ecossistema.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {SOURCING_PROMISES.map((promise) => (
                        <Card key={promise.title} className="h-full border border-geist-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-geist-900">
                                    {promise.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-geist-600">{promise.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-yello-yellow/40 bg-yello-yellow50 px-8 py-10 text-center">
                <h2 className="text-3xl font-bold text-geist-900 mb-3">Conectar com a jornada</h2>
                <p className="mx-auto mb-6 max-w-3xl text-base text-geist-700">
                    Direcione o cliente para kits completos, fluxos de dimensionamento e automação pós-venda utilizando os atalhos abaixo.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <LocalizedClientLink href="/kits">
                        <Button yelloVariant="primary" size="md">
                            Ver catálogo de kits
                        </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/journeys">
                        <Button yelloVariant="ghost" size="md">
                            Abrir Buyer Journey
                        </Button>
                    </LocalizedClientLink>
                </div>
            </section>
        </div>
    );
}
