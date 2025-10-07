import { Metadata } from "next";

import { ProductCard } from "@/components/product/ProductCard";
import { getProductsByCategory } from "@/lib/data/medusa-client";

type SectionDefinition = {
    slug: string;
    title: string;
    description: string;
    limit?: number;
};

const CATEGORY_SECTIONS: SectionDefinition[] = [
    {
        slug: "kit-on-grid",
        title: "Kits On-Grid",
        description: "Soluções completas conectadas à rede para reduzir a conta de energia com injeção de excedentes.",
        limit: 6,
    },
    {
        slug: "paineis-solares",
        title: "Módulos Fotovoltaicos",
        description: "Painéis TIER 1 com alta eficiência para projetos residenciais, comerciais e utilidades.",
        limit: 6,
    },
    {
        slug: "inversores",
        title: "Inversores Solares",
        description: "String, híbridos e microinversores com monitoramento inteligente e altas eficiências.",
        limit: 6,
    },
    {
        slug: "estrutura-de-montagem",
        title: "Estruturas e Fixações",
        description: "Perfis, grampos e suportes para telhado, laje e solo com certificação estrutural.",
        limit: 6,
    },
    {
        slug: "string-box",
        title: "Proteção e String Box",
        description: "Combiner boxes, DPS e disjuntores DC para garantir segurança e conformidade com normas.",
        limit: 6,
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Sistemas Fotovoltaicos | Catálogo Completo | Yello Solar Hub",
    description:
        "Explore kits completos, painéis solares, inversores, estruturas e proteções com curadoria Yello para projetos fotovoltaicos de qualquer porte.",
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

export default async function SistemasFotovoltaicosPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black text-gradient-yello mb-4">
                    Sistemas Fotovoltaicos
                </h1>
                <p className="text-lg text-geist-600 max-w-4xl mx-auto">
                    Catálogo 360º com kits completos, geradores fotovoltaicos, inversores e estruturas homologadas. Desempenho validado por integrações com Medusa Store API e inteligência Yello Solar Hub.
                </p>
            </header>

            {sections.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-xl text-geist-500 mb-2">Nenhum produto disponível nesta categoria ainda.</p>
                    <p className="text-sm text-geist-400">Execute os seeds de catálogo no backend para desbloquear o catálogo completo.</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {sections.map((section) => (
                        <section key={section.slug}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-3xl font-semibold text-geist-900">{section.title}</h2>
                                    <p className="text-geist-600 max-w-2xl">{section.description}</p>
                                </div>
                                <span className="inline-flex items-center rounded-full border border-geist-200 px-4 py-1 text-sm text-geist-500">
                                    {section.products.length} produtos
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {section.products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
