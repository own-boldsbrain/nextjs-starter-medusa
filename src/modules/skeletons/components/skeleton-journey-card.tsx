/**
 * Skeleton Journey Card Component
 * 
 * Loading state para cards de jornadas regulatórias.
 * Segue padrões Medusa: bg-gray-200 animate-pulse, widths representativos.
 * 
 * Uso:
 * - Solar Buyer Journey page durante carregamento de SEGMENTS
 * - Category pages durante fetch de produtos
 */

interface SkeletonJourneyCardProps {
    /**
     * Número de skeleton cards a renderizar
     * @default 5
     */
    count?: number
}

const repeat = (count: number): number[] => Array.from({ length: count }, (_, i) => i)

export default function SkeletonJourneyCard({ count = 5 }: SkeletonJourneyCardProps) {
    return (
        <div
            className="grid grid-cols-1 small:grid-cols-2 gap-6"
            data-testid="skeleton-journey-cards"
        >
            {repeat(count).map((index) => (
                <div
                    key={index}
                    className="flex flex-col gap-y-4 p-6 border border-gray-200 rounded-xl bg-white"
                    data-testid="skeleton-journey-card"
                >
                    {/* Badge skeleton */}
                    <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />

                    {/* Title skeleton */}
                    <div className="flex flex-col gap-y-2">
                        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Description skeleton (4 lines) */}
                    <div className="flex flex-col gap-y-2">
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Segment List skeleton (4 items) */}
                    <div className="flex flex-col gap-y-2 mt-4">
                        {repeat(4).map((i) => (
                            <div key={i} className="flex items-center gap-x-2">
                                <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
                                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* CTA button skeleton */}
                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse mt-4" />
                </div>
            ))}
        </div>
    )
}
