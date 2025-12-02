'use client'

import { useState, useMemo, useCallback } from 'react'
import SpotCard from '@/components/ui/SpotCard'
import SpotFilters, { type FilterState } from '@/components/filters/SpotFilters'
import type { SpotWithSummary } from '@/types/database'
import type { Building } from '@/types/database'

interface SpotsListProps {
  spots: SpotWithSummary[]
  buildings: Building[]
}

export default function SpotsList({ spots, buildings }: SpotsListProps) {
  const [filters, setFilters] = useState<FilterState>({
    buildingId: null,
    minQuietScore: null,
    hasOutlets: null,
    isQuietZone: null,
  })

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      if (filters.buildingId !== null && spot.building_id !== filters.buildingId) {
        return false
      }
      if (
        filters.minQuietScore !== null &&
        (spot.avg_quiet_score === undefined || spot.avg_quiet_score < filters.minQuietScore)
      ) {
        return false
      }
      if (filters.hasOutlets !== null && spot.has_outlets !== filters.hasOutlets) {
        return false
      }
      if (filters.isQuietZone !== null && spot.is_quiet_zone !== filters.isQuietZone) {
        return false
      }
      return true
    })
  }, [spots, filters])

  return (
    <div className="space-y-4">
      <SpotFilters buildings={buildings} onFilterChange={handleFilterChange} />

      {filteredSpots.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">No spots match your filters. Try clearing some filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSpots.map((spot) => (
            <SpotCard key={spot.spot_id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  )
}

