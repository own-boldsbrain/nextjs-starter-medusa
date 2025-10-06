/**
 * ProductCard — Solar Product Display Component
 */

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { ProductSummary } from '@/lib/integration/dto';

interface ProductCardProps {
    product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
    const formattedPrice = formatPrice(product.price, true);

    return (
        <Card className="group hover:shadow-yello transition-shadow duration-300">
            <CardHeader>
                {product.thumbnail && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-geist-100 mb-4">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <CardTitle className="text-lg">{product.title}</CardTitle>
                {product.description && (
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {product.sku && (
                    <p className="text-xs text-geist-400 mb-2">SKU: {product.sku}</p>
                )}
            </CardContent>

            <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold text-yello-orange">{formattedPrice}</span>
                <Link href={`/produtos/${product.handle}`}>
                    <Button variant="primary" size="sm">Ver detalhes</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
