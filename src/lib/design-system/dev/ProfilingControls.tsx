"use client"

/**
 * Yello Solar Hub - Profiling Controls
 * UI controls for managing profiling session in development
 */

import React, { useState, useCallback } from 'react'
import { Button } from '@/lib/design-system/components'
import {
    downloadProfileData,
    clearProfileData,
    getAggregatedStats,
} from './ProfilerWrapper'

export const ProfilingControls: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [stats, setStats] = useState(getAggregatedStats())

    const handleRefreshStats = useCallback(() => {
        setStats(getAggregatedStats())
    }, [])

    const handleDownloadJSON = useCallback(() => {
        downloadProfileData('json')
        handleRefreshStats()
    }, [handleRefreshStats])

    const handleDownloadCSV = useCallback(() => {
        downloadProfileData('csv')
        handleRefreshStats()
    }, [handleRefreshStats])

    const handleDownloadFlamegraph = useCallback(() => {
        downloadProfileData('flamegraph')
        handleRefreshStats()
    }, [handleRefreshStats])

    const handleClear = useCallback(() => {
        clearProfileData()
        handleRefreshStats()
    }, [handleRefreshStats])

    const toggleVisibility = useCallback(() => {
        setIsVisible(prev => !prev)
        if (!isVisible) {
            handleRefreshStats()
        }
    }, [isVisible, handleRefreshStats])

    // Only render in development
    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Toggle Button */}
            <Button
                yelloVariant="secondary"
                size="sm"
                onClick={toggleVisibility}
                className="shadow-lg"
            >
                {isVisible ? '📊 Hide Profiler' : '📊 Profiler'}
            </Button>

            {/* Controls Panel */}
            {isVisible && (
                <div className="absolute bottom-14 right-0 w-96 bg-white border border-geist-200 rounded-lg shadow-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-geist-900">
                            React Profiler
                        </h3>
                        <button
                            onClick={toggleVisibility}
                            className="text-geist-500 hover:text-geist-900"
                            aria-label="Close profiler panel"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Statistics Summary */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-geist-600">Components Tracked:</span>
                            <span className="font-mono font-bold">{stats.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-geist-600">Total Renders:</span>
                            <span className="font-mono font-bold">
                                {stats.reduce((sum, s) => sum + s.totalRenders, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-geist-600">Total Duration:</span>
                            <span className="font-mono font-bold">
                                {stats.reduce((sum, s) => sum + s.totalDuration, 0).toFixed(2)}ms
                            </span>
                        </div>
                    </div>

                    {/* Top 5 Slowest Components */}
                    {stats.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-geist-700">
                                Slowest Components:
                            </h4>
                            <div className="space-y-1 text-xs">
                                {stats
                                    .sort((a, b) => b.avgDuration - a.avgDuration)
                                    .slice(0, 5)
                                    .map(stat => (
                                        <div
                                            key={stat.id}
                                            className="flex justify-between items-center p-2 bg-geist-50 rounded"
                                        >
                                            <span className="font-mono truncate max-w-[200px]">
                                                {stat.id}
                                            </span>
                                            <span className="font-bold text-orange-600">
                                                {stat.avgDuration.toFixed(2)}ms
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <Button
                            yelloVariant="outline"
                            size="sm"
                            fullWidth
                            onClick={handleRefreshStats}
                        >
                            🔄 Refresh Stats
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                yelloVariant="outline"
                                size="sm"
                                onClick={handleDownloadJSON}
                            >
                                JSON
                            </Button>
                            <Button
                                yelloVariant="outline"
                                size="sm"
                                onClick={handleDownloadCSV}
                            >
                                CSV
                            </Button>
                            <Button
                                yelloVariant="outline"
                                size="sm"
                                onClick={handleDownloadFlamegraph}
                            >
                                Flame
                            </Button>
                        </div>
                        <Button
                            yelloVariant="tertiary"
                            size="sm"
                            fullWidth
                            onClick={handleClear}
                        >
                            🗑️ Clear Data
                        </Button>
                    </div>

                    {/* Console Hint */}
                    <p className="text-xs text-geist-500 border-t border-geist-200 pt-2">
                        💡 Open DevTools Console to see detailed render logs
                    </p>
                </div>
            )}
        </div>
    )
}

ProfilingControls.displayName = 'ProfilingControls'
