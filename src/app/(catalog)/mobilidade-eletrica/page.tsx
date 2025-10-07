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
    slug: "carregadores-veiculares",
    title: "Carregadores EV",
    description: "Wallbox AC e DC com conectividade, balanceamento de carga e conformidade IEC 61851/62196.",
    limit: 6,
  },
  {
    slug: "kit-zero-grid",
    title: "Infra Solar para EV",
    description: "Kits zero grid para direcionar energia solar excedente ao carregamento veicular.",
    limit: 6,
  },
  {
    slug: "kit-hibrido",
    title: "Soluções Solar + Storage",
    description: "Sistemas híbridos que permitem carga noturna com energia armazenada e integração com smart home.",
    limit: 6,
  },
  {
    slug: "kit-on-grid",
    title: "Kits On-Grid Residenciais",
    description: "Combos otimizados para residências com veículos elétricos e tarifa branca.",
    limit: 6,
  },
  {
    slug: "inversores",
    title: "Inversores com Saída EV",
    description: "Equipamentos com recursos de carregamento integrado, protocolos Modbus/OCPP e monitoramento remoto.",
    limit: 6,
  },
];

export const dynamic = "force-dynamic";
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Mobilidade Elétrica Solar | Yello Solar Hub",
  description:
    "Carregadores para veículos elétricos, kits zero grid e sistemas híbridos prontos para eletromobilidade sustentável.",
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

export default async function MobilidadeEletricaPage() {
  const sections = await loadSections();

  return (
    <div className="content-container py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-black text-gradient-yello mb-4">
          Mobilidade Elétrica
        </h1>
        <p className="text-lg text-geist-600 max-w-4xl mx-auto">
          Infraestrutura solar para carregamento de veículos elétricos com padrões internacionais, monitoramento remoto e integração com o catálogo Yello Solar Hub.
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
