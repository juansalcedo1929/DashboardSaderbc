'use client'

import { useFilters } from '../store/filters'
import { getFilterOptions } from '../utils/aggregate'
import { Filter, RefreshCw, Download, X, ChevronDown } from 'lucide-react'

// Definir tipos para los filtros
type FilterKey = 'region' | 'district' | 'municipality' | 'species' | 'year'

export default function Filters() {
  const filters = useFilters()
  const options = getFilterOptions()

  const filterGroups = [
    { 
      key: 'region' as FilterKey, 
      label: 'Región', 
      options: options.regions,
      icon: '🗺️',
      placeholder: 'Todas las regiones',
      singular: 'región',
      plural: 'regiones'
    },
    { 
      key: 'district' as FilterKey, 
      label: 'Distrito', 
      options: options.districts,
      icon: '📍',
      placeholder: 'Todos los distritos',
      singular: 'distrito',
      plural: 'distritos'
    },
    { 
      key: 'municipality' as FilterKey, 
      label: 'Municipio', 
      options: options.municipalities,
      icon: '🏙️',
      placeholder: 'Todos los municipios',
      singular: 'municipio',
      plural: 'municipios'
    },
    { 
      key: 'species' as FilterKey, 
      label: 'Especie', 
      options: options.species,
      icon: '🐟',
      placeholder: 'Todas las especies',
      singular: 'especie',
      plural: 'especies'
    },
    { 
      key: 'year' as FilterKey, 
      label: 'Año', 
      options: options.years,
      icon: '📅',
      placeholder: 'Todos los años',
      singular: 'año',
      plural: 'años'
    },
  ]

  // Obtener valores actuales de filtros
  const getCurrentFilterValue = (key: FilterKey): string => {
    return filters[key] || 'all'
  }

  // Contar filtros activos
  const activeFiltersCount = filterGroups.filter(
    ({ key }) => getCurrentFilterValue(key) !== 'all'
  ).length

  // Obtener estadísticas
  const getStats = () => {
    return {
      totalRegions: options.regions.length,
      totalSpecies: options.species.length,
      totalMunicipalities: options.municipalities.length,
      totalDistricts: options.districts.length,
      yearsRange: options.years.length > 0 
        ? `${Math.min(...options.years.map(y => parseInt(y)))}-${Math.max(...options.years.map(y => parseInt(y)))}`
        : 'N/A'
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Encabezado de filtros */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#3c3c3b]">Filtros Avanzados</h3>
          <p className="text-sm text-gray-500">Personaliza la información mostrada</p>
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <span className="px-3 py-1 bg-[#6a1c32]/10 text-[#6a1c32] text-sm rounded-full font-medium">
              {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Filtros principales - Diseño mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filterGroups.map(({ key, label, options: optValues, icon, placeholder, singular, plural }) => {
          const currentValue = getCurrentFilterValue(key)
          const isActive = currentValue !== 'all'
          
          return (
            <div key={key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#3c3c3b]">
                <span className="text-lg">{icon}</span>
                {label}
                {isActive && (
                  <span className="ml-1 text-xs px-2 py-0.5 bg-[#6a1c32] text-white rounded-full">
                    ✓
                  </span>
                )}
              </label>
              <div className="relative">
                <select
                  className={`w-full border rounded-xl px-4 py-3 pr-10 text-sm bg-white focus:outline-none transition-all appearance-none cursor-pointer ${
                    isActive 
                      ? 'border-[#6a1c32] text-[#6a1c32] focus:ring-2 focus:ring-[#6a1c32]/20' 
                      : 'border-[#e5e3e1] text-[#3c3c3b] hover:border-gray-300 focus:border-[#3c3c3b] focus:ring-2 focus:ring-[#3c3c3b]/10'
                  }`}
                  value={currentValue}
                  onChange={(e) => filters.setFilter(key, e.target.value)}
                >
                  <option value="all" className="text-gray-400">
                    {placeholder}
                  </option>
                  {optValues.map((v) => (
                    <option key={v} value={v} className="text-[#3c3c3b]">
                      {v}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className={`w-4 h-4 ${isActive ? 'text-[#6a1c32]' : 'text-gray-400'}`} />
                </div>
              </div>
              {isActive && (
                <div className="text-xs text-[#6a1c32] font-medium flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Filtro activo: {currentValue}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Estadísticas y acciones */}
      <div className="bg-gradient-to-r from-[#f6f4f2] to-white rounded-xl border border-[#e5e3e1] p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
            <div className="text-center">
              <p className="text-xl font-bold text-[#6a1c32]">{stats.totalRegions}</p>
              <p className="text-xs text-gray-500">Regiones</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#993233]">{stats.totalDistricts}</p>
              <p className="text-xs text-gray-500">Distritos</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#b17a45]">{stats.totalMunicipalities}</p>
              <p className="text-xs text-gray-500">Municipios</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#53152b]">{stats.totalSpecies}</p>
              <p className="text-xs text-gray-500">Especies</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#3c3c3b]">{stats.yearsRange}</p>
              <p className="text-xs text-gray-500">Rango de años</p>
            </div>
          </div>
          
          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => {/* Export functionality */}}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e3e1] text-[#3c3c3b] rounded-xl text-sm font-medium hover:bg-gray-50 transition-all hover:border-gray-300"
            >
              <Download className="w-4 h-4" />
              Exportar datos
            </button>
            
            <button
              onClick={filters.reset}
              disabled={activeFiltersCount === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-[#6a1c32] to-[#53152b] text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Filtros activos - Mejorados */}
      {activeFiltersCount > 0 && (
        <div className="bg-gradient-to-r from-[#6a1c32]/5 to-[#53152b]/5 rounded-xl border border-[#6a1c32]/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[#6a1c32]">Filtros aplicados</h4>
            <span className="text-xs text-gray-500">
              {activeFiltersCount} de {filterGroups.length} filtros activos
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterGroups.map(({ key, label, singular, plural }) => {
              const value = getCurrentFilterValue(key)
              if (value !== 'all') {
                return (
                  <div 
                    key={key}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#e5e3e1] text-[#3c3c3b] rounded-lg text-sm shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6a1c32]"></div>
                      <span className="font-medium">{label}:</span>
                      <span className="text-[#6a1c32] font-semibold">{value}</span>
                    </div>
                    <button
                      onClick={() => filters.setFilter(key, 'all')}
                      className="ml-2 text-gray-400 hover:text-[#6a1c32] hover:bg-gray-100 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )
              }
              return null
            })}
          </div>
          
          <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Los datos mostrados reflejan los filtros aplicados
              </span>
              <button
                onClick={() => {
                  filterGroups.forEach(({ key }) => {
                    if (getCurrentFilterValue(key) !== 'all') {
                      filters.setFilter(key, 'all')
                    }
                  })
                }}
                className="text-[#6a1c32] hover:text-[#53152b] font-medium"
              >
                Remover todos los filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guía de uso */}
      <div className="bg-white border border-[#e5e3e1] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-[#b17a45]/10 flex items-center justify-center">
            <span className="text-[#b17a45] text-sm">💡</span>
          </div>
          <h4 className="text-sm font-semibold text-[#3c3c3b]">Cómo usar los filtros</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#6a1c32]/10 flex items-center justify-center mt-0.5">
              <span className="text-[#6a1c32] text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-[#3c3c3b]">Selección múltiple</p>
              <p className="text-gray-500 text-xs">Combina filtros para resultados específicos</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#b17a45]/10 flex items-center justify-center mt-0.5">
              <span className="text-[#b17a45] text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-[#3c3c3b]">Filtros jerárquicos</p>
              <p className="text-gray-500 text-xs">Algunos filtros dependen de otros seleccionados</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#53152b]/10 flex items-center justify-center mt-0.5">
              <span className="text-[#53152b] text-xs">3</span>
            </div>
            <div>
              <p className="font-medium text-[#3c3c3b]">Datos en tiempo real</p>
              <p className="text-gray-500 text-xs">Los cambios se aplican inmediatamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}