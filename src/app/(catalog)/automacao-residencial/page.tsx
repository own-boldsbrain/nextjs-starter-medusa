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
        slug: "medidor-grid-zero",
        title: "Gestão de Energia",
        description: "Medidores inteligentes, controladores e gateways para balancear geração solar e consumo residencial.",
        limit: 6,
    },
    {
        slug: "kit-zero-grid",
        title: "Automação Zero Grid",
        description: "Kits com controle de injeção e automações para maximizar autoconsumo em residências conectadas.",
        limit: 6,
    },
    {
        slug: "kit-hibrido",
        title: "Backup Inteligente",
        description: "Sistemas híbridos com orquestração automática entre rede, solar e armazenamento local.",
        limit: 6,
    },
    {
        slug: "carregadores-veiculares",
        title: "Smart EV Chargers",
        description: "Wallbox conectados com suporte a protocolos OCPP, integração IoT e cargas programáveis.",
        limit: 6,
    },
    {
        slug: "bomba-de-agua",
        title: "Automação Hidráulica",
        description: "Bombas solares e controladores para irrigação, abastecimento e automação de bombas residenciais.",
        limit: 6,
    },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
    title: "Automação Residencial Integrada à Energia Solar | Yello Solar Hub",
    description:
        "Controle total do consumo com medidores inteligentes, kits zero grid, carregadores de EV e automações solares integradas.",
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

export default async function AutomacaoResidencialPage() {
    const sections = await loadSections();

    return (
        <div className="content-container py-12">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black text-gradient-yello mb-4">
                    Automação Residencial Solar
                </h1>
                <p className="text-lg text-geist-600 max-w-4xl mx-auto">
                    Sistemas inteligentes para orquestrar geração, carregamento de veículos, bombeamento e segurança energética com UX compatível com plataformas smart home.
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
