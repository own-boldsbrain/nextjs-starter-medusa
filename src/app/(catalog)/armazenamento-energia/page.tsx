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
        slug: "baterias",
        title: "Baterias Estacionárias",
        description: "Bancadas LiFePO₄ e chumbo-ácido com alto ciclo de vida e monitoramento BMS.",
        limit: 6,
    },
    {
        slug: "kit-hibrido",
        title: "Sistemas Híbridos",
        description: "Pacotes completos com inversores híbridos, carregadores e integração solar+storage.",
        limit: 6,
    },
    {
        slug: "kit-off-grid-interativo",
        title: "Off-Grid Interativo",
        description: "Soluções com autonomia total para locais sem rede elétrica ou com energia instável.",
        limit: 6,
    },
    {
        slug: "kit-antiapagao",
        title: "Backup e UPS Solar",
        description: "Kits antiapagão com resposta rápida e suporte a cargas críticas residenciais e comerciais.",
        limit: 6,
    },
    {
        slug: "kit-zero-grid",
        title: "Balanceamento de Energia",
        description: "Combinações de storage com controle zero grid para reduzir dependência da rede.",
        limit: 6,
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Armazenamento de Energia Solar | Yello Solar Hub",
    description:
        "Baterias, sistemas híbridos e soluções de backup solar com integração completa ao catálogo Yello.",
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

export default async function ArmazenamentoEnergiaPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black text-gradient-yello mb-4">
                    Armazenamento de Energia
                </h1>
                <p className="text-lg text-geist-600 max-w-4xl mx-auto">
                    Soluções solares com baterias de alta performance, inversores híbridos e kits antiapagão para garantir continuidade operacional e autonomia energética.
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
