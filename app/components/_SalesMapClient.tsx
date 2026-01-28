'use client'

import { useState, useEffect } from 'react'
import { MapPin, TrendingUp } from 'lucide-react'

export default function SalesMap() {
  const [mounted, setMounted] = useState(false)

  // Datos de municipios de Baja California
  const municipalities = [
    { name: 'Ensenada', value: 450, coast: 'Pacífico', production: 'Alta', variation: '+12%' },
    { name: 'Mexicali', value: 320, coast: 'Interno', production: 'Media', variation: '+8%' },
    { name: 'Tijuana', value: 280, coast: 'Pacífico', production: 'Media', variation: '+5%' },
    { name: 'Playas de Rosarito', value: 180, coast: 'Pacífico', production: 'Media', variation: '+15%' },
    { name: 'Tecate', value: 95, coast: 'Interno', production: 'Baja', variation: '+3%' },
    { name: 'San Quintín', value: 210, coast: 'Pacífico', production: 'Media', variation: '+10%' },
    { name: 'San Felipe', value: 380, coast: 'Mar de Cortés', production: 'Alta', variation: '+18%' },
    { name: 'Puerto Nuevo', value: 150, coast: 'Pacífico', production: 'Media', variation: '+7%' },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const getProductionColor = (production: string) => {
    switch(production) {
      case 'Alta': return 'bg-green-500';
      case 'Media': return 'bg-yellow-500';
      case 'Baja': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Encabezado */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#3c3c3b] mb-2">
          Distribución por Municipio
        </h3>
        <p className="text-sm text-gray-500">
          Producción pesquera en municipios de Baja California
        </p>
      </div>

      {/* Mapa visual simplificado */}
      <div className="relative flex-1 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-[#e5e3e1] overflow-hidden p-4 mb-6">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[200px]">🗺️</span>
        </div>
        
        <div className="relative grid grid-cols-4 gap-4 h-full">
          {/* Representación visual de municipios */}
          {municipalities.map((mun, index) => (
            <div 
              key={mun.name}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all hover:scale-105 cursor-pointer ${
                mun.production === 'Alta' ? 'bg-green-100 border-2 border-green-300' :
                mun.production === 'Media' ? 'bg-yellow-100 border-2 border-yellow-300' :
                'bg-red-100 border-2 border-red-300'
              }`}
              style={{
                gridColumn: index % 4 + 1,
                gridRow: Math.floor(index / 4) + 1
              }}
            >
              <MapPin className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-center">{mun.name}</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-500">{mun.value}</span>
                <span className="text-xs text-gray-400">t</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solo renderizar en cliente para evitar hidratación */}
      {mounted && (
        <>
          {/* Leyenda */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Alta producción (&gt;300t)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Media producción (150-300t)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Baja producción (&lt;150t)</span>
            </div>
          </div>

          {/* Tabla de datos */}
          <div className="bg-white rounded-xl border border-[#e5e3e1] overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-[#f6f4f2] text-sm font-semibold text-[#3c3c3b]">
              <div>Municipio</div>
              <div className="text-right">Producción (t)</div>
              <div className="text-right">Costa</div>
              <div className="text-right">Variación</div>
            </div>
            
            <div className="divide-y divide-[#e5e3e1]">
              {municipalities.map((mun) => (
                <div key={mun.name} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getProductionColor(mun.production)}`}></div>
                    <span className="font-medium">{mun.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">{mun.value.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-1">t</span>
                  </div>
                  <div className="text-right text-gray-600">{mun.coast}</div>
                  <div className="text-right flex items-center justify-end gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-600">{mun.variation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}