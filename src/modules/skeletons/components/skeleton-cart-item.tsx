/**
 * Skeleton Cart Item Component
 * 
 * Loading state para itens do carrinho.
 * Padrão Medusa: grid layout [122px_1fr] (thumbnail + detalhes)
 * 
 * Uso:
 * - Cart page durante carregamento inicial
 * - Cart dropdown durante fetch
 * - Checkout review durante sincronização
 */

interface SkeletonCartItemProps {
    /**
     * Número de skeleton items a renderizar
     * @default 3
     */
    count?: number
}

const repeat = (count: number): number[] => Array.from({ length: count }, (_, i) => i)

export default function SkeletonCartItem({ count = 3 }: SkeletonCartItemProps) {
    return (
        <div
            className="flex flex-col gap-y-8"
            data-testid="skeleton-cart-items"
        >
            {repeat(count).map((index) => (
                <div
                    key={index}
                    className="grid grid-cols-[122px_1fr] gap-x-4"
                    data-testid="skeleton-cart-item"
                >
                    {/* Thumbnail skeleton (122px width, aspect square) */}
                    <div className="w-[122px] h-[122px] bg-gray-200 rounded-lg animate-pulse" />

                    {/* Details column */}
                    <div className="flex flex-col justify-between">
                        {/* Header: Title + Delete button */}
                        <div className="flex items-start justify-between mb-2">
                            {/* Title skeleton */}
                            <div className="flex flex-col gap-y-2 flex-1">
                                <div className="w-[180px] h-5 bg-gray-200 rounded animate-pulse" />
                                <div className="w-[120px] h-4 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Delete button skeleton */}
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Variant options skeleton */}
                        <div className="flex flex-col gap-y-1 mb-4">
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Quantity + Price row */}
                        <div className="flex items-center justify-between">
                            {/* Quantity skeleton */}
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-8 bg-gray-200 rounded animate-pulse" />
                                <div className="w-14 h-10 bg-gray-200 rounded animate-pulse" />
                                <div className="w-6 h-8 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Price skeleton */}
                            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
