"use client"

import React, { useRef, useEffect } from "react"

/**
 * Development HOC to count renders of a component and log to console.
 * Only active when NODE_ENV === 'development'.
 */
export function withRenderCounter<P>(
    Component: React.ComponentType<P>,
    name?: string
) {
    const Wrapped: React.FC<P> = (props) => {
        const renders = useRef(0)
        renders.current += 1

        useEffect(() => {
            if (process.env.NODE_ENV === "development") {
                // eslint-disable-next-line no-console
                console.debug(`[render] ${name ?? Component.displayName ?? Component.name}:`, renders.current)
            }
        })

        return <Component {...props} />
    }

    Wrapped.displayName = `withRenderCounter(${name ?? Component.displayName ?? Component.name})`

    return React.memo(Wrapped)
}
