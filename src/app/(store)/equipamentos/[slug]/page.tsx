/**
 * Yello Solar Hub - Dynamic Category Page
 * 
 * Route: /equipamentos/[slug]
 * Features:
 * - ISR (Incremental Static Regeneration)
 * - SEO optimized with Open Graph
 * - Product listing with filters
 * - Sizing AI CTA for applicable categories
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { slugToCategory, getCategoriesByType } from "@lib/categories";
import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import ProductPreview from "@modules/products/components/product-preview";
import { Button } from "@lib/design-system/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lib/design-system/components/Card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface CategoryPageProps {
  params: {
    slug: string;
    countryCode: string;
  };
  searchParams: {
    page?: string;
    sortBy?: string;
  };
}

/**
 * Generate static params for all categories
 * Enables ISR for category pages
 */
export async function generateStaticParams() {
  const allCategories = getCategoriesByType('kits')
    .concat(getCategoriesByType('componentes'))
    .concat(getCategoriesByType('acessorios'));

  return allCategories.map((category) => ({
    slug: category.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = slugToCategory(params.slug);

  if (!category) {
    return {
      title: "Categoria não encontrada | Yello Solar Hub",
    };
  }

  return {
    title: category.seoTitle || `${category.title} | Yello Solar Hub`,
    description: category.seoDescription || category.description,
    keywords: category.keywords,
    openGraph: {
      title: category.seoTitle || category.title,
      description: category.seoDescription || category.description,
      type: "website",
      url: `https://yellosolar.com.br/equipamentos/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: category.seoTitle || category.title,
      description: category.seoDescription || category.description,
    },
  };
}

/**
 * Category Page Component
 */
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = slugToCategory(params.slug);

  if (!category) {
    notFound();
  }

  try {
    // Get region for pricing (required by ProductPreview)
    const { retrieveRegion } = await import("@lib/data/regions");
    const region = await retrieveRegion(params.countryCode);

    if (!region) {
      notFound();
    }

    // Fetch products from Medusa
    // TODO: Replace with actual Medusa query filtering by category_id
    const { response, nextPage } = await listProducts({
      countryCode: params.countryCode,
      pageParam: searchParams.page ? parseInt(searchParams.page) : 1,
      queryParams: {
        // category_id: [category.id], // Uncomment when Medusa backend is ready
        limit: 12,
      },
    });

    const { products, count } = response;
    const totalPages = Math.ceil(count / 12);
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

    return (
      <div className="content-container py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent mb-2">
                {category.title}
              </h1>
              <p className="text-lg text-geist-600 max-w-3xl">
                {category.description}
              </p>
            </div>

            {/* Tier Badge */}
            {category.tierLevel && (
              <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${category.tierLevel === 'premium'
                  ? 'bg-yello-yellow text-black'
                  : category.tierLevel === 'standard'
                    ? 'bg-yello-orange text-white'
                    : 'bg-geist-200 text-geist-700'
                }`}>
                {category.tierLevel === 'premium' ? '⭐ Premium' :
                  category.tierLevel === 'standard' ? 'Standard' :
                    'Essential'}
              </div>
            )}
          </div>

          {/* Features Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            {category.hasHSP && (
              <div className="flex items-center gap-2 bg-yello-orange50 px-3 py-1.5 rounded-lg text-sm">
                <span className="text-yello-orange">☀️</span>
                <span>Cálculo HSP Regional</span>
              </div>
            )}
            {category.requiresSizing && (
              <div className="flex items-center gap-2 bg-yello-magenta50 px-3 py-1.5 rounded-lg text-sm">
                <span className="text-yello-magenta">🤖</span>
                <span>Dimensionamento AI</span>
              </div>
            )}
            {category.tierLevel === 'premium' && (
              <div className="flex items-center gap-2 bg-yello-yellow50 px-3 py-1.5 rounded-lg text-sm">
                <span className="text-yello-yellow">✓</span>
                <span>TIER 1 Garantido</span>
              </div>
            )}
          </div>
        </div>

        {/* Sizing CTA (for categories that require it) */}
        {category.requiresSizing && (
          <Card variant="yellow" elevation="raised" className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Não sabe qual potência escolher?
                  </h3>
                  <p className="text-sm text-geist-600">
                    Nossa IA dimensiona o sistema ideal baseado no seu consumo e região HSP
                  </p>
                </div>
                <LocalizedClientLink href="/sizing">
                  <Button yelloVariant="primary" size="lg">
                    Dimensionar Sistema
                  </Button>
                </LocalizedClientLink>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-geist-500">
              {count} {count === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
            {/* TODO: Add sort/filter controls */}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-6">
              {products.map((product: HttpTypes.StoreProduct) => (
                <ProductPreview key={product.id} product={product} region={region} />
              ))}
            </div>
          ) : (
            <Card elevation="flat" className="p-12 text-center">
              <p className="text-geist-500 mb-4">
                Nenhum produto encontrado nesta categoria.
              </p>
              <LocalizedClientLink href="/store">
                <Button yelloVariant="outline" size="md">
                  Ver Todos os Produtos
                </Button>
              </LocalizedClientLink>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <LocalizedClientLink
                key={page}
                href={`/equipamentos/${params.slug}?page=${page}`}
              >
                <Button
                  yelloVariant={currentPage === page ? "primary" : "ghost"}
                  size="sm"
                >
                  {page}
                </Button>
              </LocalizedClientLink>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    // Fallback for when Medusa is not available during build
    console.warn("Failed to load category page data:", error);
    return (
      <div className="content-container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent mb-2">
            {category.title}
          </h1>
          <p className="text-lg text-geist-600 max-w-3xl">
            {category.description}
          </p>
        </div>
        <Card elevation="flat" className="p-12 text-center">
          <p className="text-geist-500 mb-4">
            Carregando produtos...
          </p>
        </Card>
      </div>
    );
  }
}

/**
 * Enable ISR with 1 hour revalidation
 */
export const revalidate = 3600;

/**
 * Force dynamic rendering to avoid build-time fetches
 */
export const dynamic = 'force-dynamic';
