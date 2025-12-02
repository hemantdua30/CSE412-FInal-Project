'use client'

import { useState, useEffect } from 'react'
import type { Building } from '@/types/database'

interface SpotFiltersProps {
  buildings: Building[]
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  buildingId: number | null
  minQuietScore: number | null
  hasOutlets: boolean | null
  isQuietZone: boolean | null
}

export default function SpotFilters({ buildings, onFilterChange }: SpotFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    buildingId: null,
    minQuietScore: null,
    hasOutlets: null,
    isQuietZone: null,
  })

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      buildingId: e.target.value ? Number(e.target.value) : null,
    }))
  }

  const handleMinScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      minQuietScore: e.target.value ? Number(e.target.value) : null,
    }))
  }

  const handleOutletsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      hasOutlets: e.target.checked ? true : null,
    }))
  }

  const handleQuietZoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      isQuietZone: e.target.checked ? true : null,
    }))
  }

  const clearFilters = () => {
    setFilters({
      buildingId: null,
      minQuietScore: null,
      hasOutlets: null,
      isQuietZone: null,
    })
  }

  const hasActiveFilters =
    filters.buildingId !== null ||
    filters.minQuietScore !== null ||
    filters.hasOutlets !== null ||
    filters.isQuietZone !== null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-gray-700 transition-colors hover:text-slate-900"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 space-y-3">
          <div>
            <label
              htmlFor="building"
              className="block text-xs font-medium text-slate-700"
            >
              Building
            </label>
            <select
              id="building"
              value={filters.buildingId || ''}
              onChange={handleBuildingChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All buildings</option>
              {buildings.map((building) => (
                <option key={building.building_id} value={building.building_id}>
                  {building.name} ({building.campus})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="minScore"
              className="block text-xs font-medium text-slate-700"
            >
              Minimum quiet score: {filters.minQuietScore || 0}
            </label>
            <input
              id="minScore"
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minQuietScore || 0}
              onChange={handleMinScoreChange}
              className="mt-1 w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.hasOutlets === true}
                onChange={handleOutletsChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Has outlets only</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.isQuietZone === true}
                onChange={handleQuietZoneChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Quiet zone only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

