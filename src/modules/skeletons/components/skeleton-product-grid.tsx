/**
 * Skeleton Product Grid Component
 * 
 * Loading state para grid de produtos seguindo padrões Medusa.js
 * - bg-gray-200 animate-pulse (cor + animação)
 * - Widths representativos do conteúdo real
 * - Heights consistentes com componente final
 * - Gap matching layout real
 * 
 * @see https://github.com/medusajs/nextjs-starter-medusa/blob/main/src/modules/skeletons/components/skeleton-product-grid/index.tsx
 */

interface SkeletonProductGridProps {
    /**
     * Número de skeleton cards a renderizar
     * @default 6
     */
    count?: number
}

const repeat = (count: number): number[] => Array.from({ length: count }, (_, i) => i)

export default function SkeletonProductGrid({ count = 6 }: SkeletonProductGridProps) {
    return (
        <ul
            className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36"
            data-testid="skeleton-product-grid"
        >
            {repeat(count).map((index) => (
                <li key={index} data-testid="skeleton-product-item">
                    <div className="flex flex-col gap-y-4">
                        {/* Thumbnail skeleton */}
                        <div className="relative w-full aspect-[3/4] bg-gray-200 rounded-large animate-pulse" />

                        {/* Title skeleton */}
                        <div className="flex flex-col gap-y-2">
                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Price skeleton */}
                        <div className="flex items-center gap-x-2">
                            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
