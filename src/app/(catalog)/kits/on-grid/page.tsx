import { getProductsByCategory } from '@/lib/data/medusa-client';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 3600; // ISR: 1 hour

/**
 * Force dynamic rendering to avoid build-time fetches
 */
export const dynamic = 'force-dynamic';

export default async function KitOnGridPage() {
    const { products, count } = await getProductsByCategory('on-grid');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gradient-yello">
                    Kit On-Grid
                </h1>
                <p className="text-geist-600">
                    {count} produtos disponíveis
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-geist-400 mb-4">Nenhum produto encontrado</p>
                    <p className="text-sm text-geist-500">Execute os seeds do backend para popular o catálogo</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
