"use client"

/**
 * Yello Solar Hub - React Profiler Wrapper
 * Development tool for measuring component render performance
 * 
 * Usage:
 * <ProfilerWrapper id="ProductList" onProfileData={handleProfileData}>
 *   <YourComponent />
 * </ProfilerWrapper>
 */

import React, { Profiler, useRef, useCallback } from 'react'

// React Profiler onRender callback type
type ProfilerOnRenderCallback = (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<unknown>
) => void

export interface ProfilerData {
    id: string
    phase: 'mount' | 'update'
    actualDuration: number
    baseDuration: number
    startTime: number
    commitTime: number
    interactions: Set<unknown>
}

export interface ProfilerWrapperProps {
    id: string
    children: React.ReactNode
    onProfileData?: (data: ProfilerData) => void
    logToConsole?: boolean
    aggregateStats?: boolean
}

interface AggregatedStats {
    id: string
    totalRenders: number
    totalDuration: number
    avgDuration: number
    minDuration: number
    maxDuration: number
    mounts: number
    updates: number
}

const statsMap = new Map<string, AggregatedStats>()

/**
 * Export aggregated stats for all profiled components
 */
export function getAggregatedStats(): AggregatedStats[] {
    return Array.from(statsMap.values())
}

/**
 * Export flamegraph-compatible JSON data
 */
export function exportFlamegraphData(): string {
    const stats = getAggregatedStats()
    const flamegraphData = {
        name: 'root',
        value: 0,
        children: stats.map(stat => ({
            name: stat.id,
            value: stat.totalDuration,
            children: [
                { name: 'mount', value: stat.mounts },
                { name: 'update', value: stat.updates },
            ],
        })),
    }
    return JSON.stringify(flamegraphData, null, 2)
}

/**
 * Export CSV data for spreadsheet analysis
 */
export function exportCSVData(): string {
    const stats = getAggregatedStats()
    const headers = ['Component', 'Total Renders', 'Total Duration (ms)', 'Avg Duration (ms)', 'Min Duration (ms)', 'Max Duration (ms)', 'Mounts', 'Updates']
    const rows = stats.map(stat => [
        stat.id,
        stat.totalRenders,
        stat.totalDuration.toFixed(2),
        stat.avgDuration.toFixed(2),
        stat.minDuration.toFixed(2),
        stat.maxDuration.toFixed(2),
        stat.mounts,
        stat.updates,
    ])
    return [headers, ...rows].map(row => row.join(',')).join('\n')
}

/**
 * Clear all accumulated profiling data
 */
export function clearProfileData(): void {
    statsMap.clear()
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[Profiler] All profiling data cleared')
    }
}

/**
 * Download profiling data as JSON file
 */
export function downloadProfileData(format: 'json' | 'csv' | 'flamegraph' = 'json'): void {
    let content: string
    let filename: string
    let mimeType: string

    switch (format) {
        case 'csv':
            content = exportCSVData()
            filename = `profile-data-${Date.now()}.csv`
            mimeType = 'text/csv'
            break
        case 'flamegraph':
            content = exportFlamegraphData()
            filename = `flamegraph-${Date.now()}.json`
            mimeType = 'application/json'
            break
        case 'json':
        default:
            content = JSON.stringify(getAggregatedStats(), null, 2)
            filename = `profile-data-${Date.now()}.json`
            mimeType = 'application/json'
            break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`[Profiler] Downloaded ${format} data:`, filename)
    }
}

export const ProfilerWrapper: React.FC<ProfilerWrapperProps> = ({
    id,
    children,
    onProfileData,
    logToConsole = true,
    aggregateStats = true,
}) => {
    const renderCountRef = useRef(0)

    const handleRender = useCallback<React.ProfilerOnRenderCallback>(
        (
            profileId: string,
            phase: 'mount' | 'update' | 'nested-update',
            actualDuration: number,
            baseDuration: number,
            startTime: number,
            commitTime: number,
            interactions: Set<unknown>
        ) => {
            renderCountRef.current += 1

            const data: ProfilerData = {
                id: profileId,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions,
            }

            // Aggregate statistics
            if (aggregateStats) {
                const existing = statsMap.get(profileId)
                if (existing) {
                    existing.totalRenders += 1
                    existing.totalDuration += actualDuration
                    existing.avgDuration = existing.totalDuration / existing.totalRenders
                    existing.minDuration = Math.min(existing.minDuration, actualDuration)
                    existing.maxDuration = Math.max(existing.maxDuration, actualDuration)
                    if (phase === 'mount') existing.mounts += 1
                    if (phase === 'update') existing.updates += 1
                } else {
                    statsMap.set(profileId, {
                        id: profileId,
                        totalRenders: 1,
                        totalDuration: actualDuration,
                        avgDuration: actualDuration,
                        minDuration: actualDuration,
                        maxDuration: actualDuration,
                        mounts: phase === 'mount' ? 1 : 0,
                        updates: phase === 'update' ? 1 : 0,
                    })
                }
            }

            // Log to console
            if (logToConsole && process.env.NODE_ENV === 'development') {
                const color = phase === 'mount' ? '#4CAF50' : '#2196F3'
                // eslint-disable-next-line no-console
                console.log(
                    `%c[Profiler] ${profileId} (${phase})`,
                    `color: ${color}; font-weight: bold`,
                    {
                        render: renderCountRef.current,
                        actualDuration: `${actualDuration.toFixed(2)}ms`,
                        baseDuration: `${baseDuration.toFixed(2)}ms`,
                        startTime: `${startTime.toFixed(2)}ms`,
                        commitTime: `${commitTime.toFixed(2)}ms`,
                    }
                )
            }

            // Call custom callback
            if (onProfileData) {
                onProfileData(data)
            }
        },
        [id, onProfileData, logToConsole, aggregateStats]
    )

    // Only enable in development
    if (process.env.NODE_ENV !== 'development') {
        return <>{children}</>
    }

    return (
        <Profiler id={id} onRender={handleRender}>
            {children}
        </Profiler>
    )
}

ProfilerWrapper.displayName = 'ProfilerWrapper'
