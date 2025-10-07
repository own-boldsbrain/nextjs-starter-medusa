/**
 * Skeleton Cart Totals Component
 * 
 * Loading state para totalizadores do carrinho (subtotal, shipping, tax, total).
 * Padrão Medusa: linhas de label + valor com separador final.
 */

export default function SkeletonCartTotals() {
    return (
        <div
            className="flex flex-col gap-y-4"
            data-testid="skeleton-cart-totals"
        >
            {/* Subtotal row */}
            <div className="flex items-center justify-between">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Shipping row */}
            <div className="flex items-center justify-between">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Tax row */}
            <div className="flex items-center justify-between">
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-gray-200" />

            {/* Total row (bold/larger) */}
            <div className="flex items-center justify-between">
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    )
}
