/**
 * Equipment Grid Component
 * 
 * Displays solar equipment in a responsive grid with filters
 * Uses Yello Design System for consistent styling
 */

"use client"

import { useState, useMemo } from "react"
import { Card } from "@/modules/common/components/card"
import { Button } from "@/modules/common/components/button"
import { Badge } from "@/modules/common/components/badge"
import Image from "next/image"
import Link from "next/link"
import type { TierLevel } from "@/lib/catalog/types"

// ========================================
// Types
// ========================================

interface Equipment {
  id: string
  sku: string
  title: string
  subtitle: string
  thumbnail?: string
  manufacturer: string
  price: number
  metadata: {
    tier_levels: TierLevel[]
    specs: Record<string, any>
    equipment_type: "panel" | "inverter" | "accessory"
  }
}

interface EquipmentGridProps {
  equipment: Equipment[]
  categoryType: "panel" | "inverter" | "accessory"
}

interface FilterState {
  tier: TierLevel | "all"
  manufacturer: string | "all"
  priceRange: "all" | "low" | "mid" | "high"
  search: string
}

// ========================================
// Utilities
// ========================================

const TIER_COLORS: Record<TierLevel, string> = {
  XPP: "bg-geist-100 text-geist-700",
  PP: "bg-geist-200 text-geist-800",
  P: "bg-yellow-100 text-yellow-800",
  M: "bg-orange-100 text-orange-800",
  G: "bg-magenta-100 text-magenta-800",
  GG: "bg-magenta-200 text-magenta-900",
  XG: "bg-purple-100 text-purple-800",
  XGG: "bg-purple-200 text-purple-900",
}

const TIER_LABELS: Record<TierLevel, string> = {
  XPP: "Extra Pequeno",
  PP: "Pequeno",
  P: "Padrão",
  M: "Médio",
  G: "Grande",
  GG: "Extra Grande",
  XG: "Comercial",
  XGG: "Industrial",
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

function getPriceCategory(price: number, type: Equipment["metadata"]["equipment_type"]): "low" | "mid" | "high" {
  if (type === "panel") {
    if (price < 500) return "low"
    if (price < 1500) return "mid"
    return "high"
  } else if (type === "inverter") {
    if (price < 2000) return "low"
    if (price < 5000) return "mid"
    return "high"
  }
  if (price < 1000) return "low"
  if (price < 3000) return "mid"
  return "high"
}

// ========================================
// Component
// ========================================

export function EquipmentGrid({ equipment, categoryType }: EquipmentGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    tier: "all",
    manufacturer: "all",
    priceRange: "all",
    search: "",
  })

  // Extract unique manufacturers
  const manufacturers = useMemo(() => {
    const unique = new Set(equipment.map((e) => e.manufacturer))
    return Array.from(unique).sort()
  }, [equipment])

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      // Tier filter
      if (filters.tier !== "all" && !item.metadata.tier_levels.includes(filters.tier)) {
        return false
      }

      // Manufacturer filter
      if (filters.manufacturer !== "all" && item.manufacturer !== filters.manufacturer) {
        return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const category = getPriceCategory(item.price, item.metadata.equipment_type)
        if (category !== filters.priceRange) {
          return false
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.sku.toLowerCase().includes(searchLower) ||
          item.manufacturer.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
  }, [equipment, filters])

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white border border-geist-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-geist-900">Filtros</h3>

        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-geist-700 mb-2">
            Buscar
          </label>
          <input
            id="search"
            type="text"
            placeholder="SKU, modelo, fabricante..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full px-4 py-2 border border-geist-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TIER Filter */}
          <div>
            <label htmlFor="tier" className="block text-sm font-medium text-geist-700 mb-2">
              TIER
            </label>
            <select
              id="tier"
              value={filters.tier}
              onChange={(e) => setFilters({ ...filters, tier: e.target.value as FilterState["tier"] })}
              className="w-full px-4 py-2 border border-geist-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Todos</option>
              {Object.entries(TIER_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label} ({value})
                </option>
              ))}
            </select>
          </div>

          {/* Manufacturer Filter */}
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-geist-700 mb-2">
              Fabricante
            </label>
            <select
              id="manufacturer"
              value={filters.manufacturer}
              onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
              className="w-full px-4 py-2 border border-geist-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Todos</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-geist-700 mb-2">
              Faixa de Preço
            </label>
            <select
              id="price"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value as FilterState["priceRange"] })}
              className="w-full px-4 py-2 border border-geist-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="low">Menor Preço</option>
              <option value="mid">Médio</option>
              <option value="high">Premium</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          onClick={() =>
            setFilters({
              tier: "all",
              manufacturer: "all",
              priceRange: "all",
              search: "",
            })
          }
        >
          Limpar Filtros
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-geist-700">
          {filteredEquipment.length} {filteredEquipment.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length === 0 ? (
        <Card elevation="flat" className="p-12 text-center">
          <p className="text-lg text-geist-600">Nenhum produto encontrado com os filtros selecionados.</p>
          <Button
            variant="default"
            className="mt-4"
            onClick={() =>
              setFilters({
                tier: "all",
                manufacturer: "all",
                priceRange: "all",
                search: "",
              })
            }
          >
            Ver Todos os Produtos
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <Card elevation="floating" className="h-full hover:elevation-raised transition-all cursor-pointer">
                {/* Image */}
                <div className="relative aspect-square bg-geist-50">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl text-geist-300">
                        {categoryType === "panel" ? "☀️" : categoryType === "inverter" ? "⚡" : "🔧"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* TIER Badges */}
                  <div className="flex flex-wrap gap-1">
                    {item.metadata.tier_levels.slice(0, 3).map((tier) => (
                      <Badge key={tier} variant="default" className={TIER_COLORS[tier]}>
                        {tier}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-semibold text-geist-900 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-geist-600 line-clamp-1">{item.subtitle}</p>
                  </div>

                  {/* Manufacturer */}
                  <p className="text-sm text-geist-500">{item.manufacturer}</p>

                  {/* Specs */}
                  <div className="text-xs text-geist-600 space-y-1">
                    {categoryType === "panel" && item.metadata.specs.kwp && (
                      <div className="flex justify-between">
                        <span>Potência:</span>
                        <span className="font-semibold">{item.metadata.specs.kwp} kWp</span>
                      </div>
                    )}
                    {categoryType === "inverter" && item.metadata.specs.kw_ac_nominal && (
                      <div className="flex justify-between">
                        <span>Potência AC:</span>
                        <span className="font-semibold">{item.metadata.specs.kw_ac_nominal} kW</span>
                      </div>
                    )}
                    {item.metadata.specs.efficiency_pct && (
                      <div className="flex justify-between">
                        <span>Eficiência:</span>
                        <span className="font-semibold">{item.metadata.specs.efficiency_pct}%</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t border-geist-200">
                    <p className="text-xl font-bold text-geist-900">{formatPrice(item.price)}</p>
                  </div>

                  {/* CTA */}
                  <Button variant="yellow" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
