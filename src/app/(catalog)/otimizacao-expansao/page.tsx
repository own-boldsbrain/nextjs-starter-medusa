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
        slug: "kit-hibrido",
        title: "Kits Híbridos",
        description: "Integração entre geração solar, baterias e rede elétrica com backup automático e controle inteligente.",
        limit: 6,
    },
    {
        slug: "kit-zero-grid",
        title: "Sistemas Zero Grid",
        description: "Soluções com medidores inteligentes para evitar injeção na rede e priorizar autoconsumo.",
        limit: 6,
    },
    {
        slug: "kit-off-grid-interativo",
        title: "Expansões Off-Grid",
        description: "Pacotes prontos para ampliar autonomia em locais remotos ou em sistemas híbridos existentes.",
        limit: 6,
    },
    {
        slug: "kit-antiapagao",
        title: "Kit Antiapagão",
        description: "Atualize sistemas com comutação rápida e proteção contra quedas de energia.",
        limit: 6,
    },
    {
        slug: "string-box",
        title: "Proteções Adicionais",
        description: "String boxes, DPS e fusíveis para upgrades seguros conforme NBR 16690.",
        limit: 6,
    },
    {
        slug: "medidor-grid-zero",
        title: "Monitoramento e Medição",
        description: "Medidores e controladores IoT para otimizar geração e consumo em tempo real.",
        limit: 6,
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Otimização & Expansão de Sistemas Solares | Yello Solar Hub",
    description:
        "Kits híbridos, upgrades zero grid, proteções adicionais e monitoramento avançado para elevar performance de sistemas fotovoltaicos existentes.",
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

export default async function OtimizacaoExpansaoPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black text-gradient-yello mb-4">
                    Otimização &amp; Expansão
                </h1>
                <p className="text-lg text-geist-600 max-w-4xl mx-auto">
                    Amplie geração, aumente autonomia e implemente upgrades inteligentes com componentes homologados e integração nativa ao ecossistema Yello Solar Hub.
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
