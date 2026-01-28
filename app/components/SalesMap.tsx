'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ZoomIn, ZoomOut, Maximize2, MapPin, Target, BarChart3, Layers } from 'lucide-react'

// ===============================
// IMPORTS DINÁMICOS (SSR OFF)
// ===============================
const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse"></div> }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then(m => m.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then(m => m.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then(m => m.Popup),
  { ssr: false }
)

const Circle = dynamic(
  () => import('react-leaflet').then(m => m.Circle),
  { ssr: false }
)

// ===============================
// DATA
// ===============================
const municipalities = [
  {
    id: 'tijuana',
    name: 'Tijuana',
    value: 280,
    lat: 32.5149,
    lng: -117.0382,
    color: '#F59E0B', // Media producción
    coast: 'Pacífico',
    production: 'Media',
    area: '879.2 km²',
    population: '1,902,000',
    productionTrend: '+5.2%'
  },
  {
    id: 'playas-rosarito',
    name: 'Playas de Rosarito',
    value: 180,
    lat: 32.3342,
    lng: -117.0617,
    color: '#EF4444', // Baja producción
    coast: 'Pacífico',
    production: 'Baja',
    area: '513.3 km²',
    population: '126,890',
    productionTrend: '+3.8%'
  },
  {
    id: 'tecate',
    name: 'Tecate',
    value: 95,
    lat: 32.5675,
    lng: -116.6264,
    color: '#EF4444', // Baja producción
    coast: 'Interno',
    production: 'Baja',
    area: '3,079.1 km²',
    population: '108,440',
    productionTrend: '+1.5%'
  },
  {
    id: 'mexicali',
    name: 'Mexicali',
    value: 320,
    lat: 32.6649,
    lng: -115.4675,
    color: '#10B981', // Alta producción
    coast: 'Mar de Cortés',
    production: 'Alta',
    area: '13,700 km²',
    population: '1,049,792',
    productionTrend: '+8.7%'
  },
  {
    id: 'ensenada',
    name: 'Ensenada',
    value: 450,
    lat: 31.8578,
    lng: -116.6056,
    color: '#10B981', // Alta producción
    coast: 'Pacífico',
    production: 'Alta',
    area: '51,952.3 km²',
    population: '557,430',
    productionTrend: '+12.3%'
  },
  {
    id: 'san-felipe',
    name: 'San Felipe',
    value: 380,
    lat: 31.0249,
    lng: -114.8292,
    color: '#10B981', // Alta producción
    coast: 'Mar de Cortés',
    production: 'Alta',
    area: '12,000 km²',
    population: '18,369',
    productionTrend: '+15.8%'
  },
  {
    id: 'san-quintin',
    name: 'San Quintín',
    value: 210,
    lat: 30.5618,
    lng: -115.9406,
    color: '#F59E0B', // Media producción
    coast: 'Pacífico',
    production: 'Media',
    area: '8,500 km²',
    population: '9,856',
    productionTrend: '+6.4%'
  }
]

// ===============================
const BAJA_CALIFORNIA_CENTER: [number, number] = [30.8406, -115.2838]
const ZOOM_LEVEL = 5

// ===============================
export default function SalesMap() {
  const [isClient, setIsClient] = useState(false)
  const [L, setL] = useState<any>(null)
  const [map, setMap] = useState<any>(null)
  const [zoom, setZoom] = useState(ZOOM_LEVEL)
  const [selectedMunicipality, setSelectedMunicipality] = useState<string | null>(null)
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets')
  const mapRef = useRef<any>(null)

  // ===============================
  // LOAD LEAFLET ONLY IN CLIENT
  // ===============================
  useEffect(() => {
    setIsClient(true)

    import('leaflet').then(leaflet => {
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl

      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png'
      })

      setL(leaflet)
    })
  }, [])

  const handleMunicipalityClick = (id: string) => {
    const mun = municipalities.find(m => m.id === id)
    if (!mun || !map) return

    setSelectedMunicipality(id)
    map.flyTo([mun.lat, mun.lng], 10, { duration: 1.5 })
    setZoom(10)
  }

  const resetView = () => {
    setSelectedMunicipality(null)
    map?.flyTo(BAJA_CALIFORNIA_CENTER, ZOOM_LEVEL, { duration: 1.5 })
    setZoom(ZOOM_LEVEL)
  }

  const toggleMapType = () => {
    setMapType(prev => prev === 'streets' ? 'satellite' : 'streets')
  }

  const selectedData = selectedMunicipality 
    ? municipalities.find(m => m.id === selectedMunicipality)
    : null

  const totalProduction = municipalities.reduce((sum, m) => sum + m.value, 0)

  if (!isClient || !L) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#3c3c3b]">Mapa de Producción Pesquera</h3>
          <p className="text-xs text-gray-500">Cargando mapa...</p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-[#e5e3e1] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[#6a1c32] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-3 text-sm text-gray-500">Inicializando mapa</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Encabezado */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#3c3c3b]">Mapa de Producción Pesquera</h3>
            <p className="text-xs text-gray-500">
              {municipalities.length} municipios · {totalProduction.toLocaleString('es-MX')} toneladas totales
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Alta</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">Media</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Baja</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal del mapa */}
      <div className="flex-1 flex flex-col bg-white border border-[#e5e3e1] rounded-xl overflow-hidden">
        
        {/* Controles superiores */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e3e1] bg-gray-50">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMapType}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e5e3e1] rounded-lg text-xs hover:bg-gray-50"
            >
              <Layers className="w-3 h-3" />
              {mapType === 'streets' ? 'Vista satélite' : 'Vista callejera'}
            </button>
            
            {selectedData && (
              <div className="flex items-center gap-2 ml-2">
                <div className="w-2 h-2 rounded-full bg-[#6a1c32]"></div>
                <span className="text-xs text-[#3c3c3b]">
                  Seleccionado: <span className="font-medium">{selectedData.name}</span>
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Zoom: {zoom}x</span>
          </div>
        </div>

        {/* Mapa */}
        <div className="relative flex-1 min-h-[400px]">
          <MapContainer
            center={BAJA_CALIFORNIA_CENTER}
            zoom={ZOOM_LEVEL}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            ref={setMap}
            whenReady={() => {
              if (mapRef.current) {
                mapRef.current.on('zoomend', () => {
                  if (mapRef.current) {
                    setZoom(mapRef.current.getZoom())
                  }
                })
              }
            }}
          >
            <TileLayer
              url={mapType === 'satellite' 
                ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              }
              attribution={mapType === 'satellite' 
                ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }
            />

            {municipalities.map(mun => (
              <Circle
                key={mun.id}
                center={[mun.lat, mun.lng]}
                radius={mun.value * 50}
                pathOptions={{
                  fillColor: mun.color,
                  color: selectedMunicipality === mun.id ? '#1e40af' : '#6b7280',
                  fillOpacity: 0.6,
                  weight: selectedMunicipality === mun.id ? 3 : 2
                }}
                eventHandlers={{
                  click: () => handleMunicipalityClick(mun.id)
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#6a1c32]" />
                      <strong className="text-[#3c3c3b]">{mun.name}</strong>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Producción:</span>
                        <span className="font-medium">{mun.value} toneladas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Costa:</span>
                        <span className="font-medium">{mun.coast}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nivel:</span>
                        <span className={`font-medium ${
                          mun.production === 'Alta' ? 'text-green-600' :
                          mun.production === 'Media' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {mun.production}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                        Población: {mun.population}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}

            {municipalities.map(mun => (
              <Marker
                key={`marker-${mun.id}`}
                position={[mun.lat, mun.lng]}
                icon={L.divIcon({
                  className: 'custom-div-icon',
                  html: `<div style="background:${mun.color}" class="w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>`,
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                })}
                eventHandlers={{
                  click: () => handleMunicipalityClick(mun.id)
                }}
              />
            ))}
          </MapContainer>

          {/* Controles de zoom */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
            <button 
              onClick={() => map?.zoomIn()} 
              className="w-10 h-10 bg-white border border-[#e5e3e1] rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <ZoomIn className="w-4 h-4 text-[#3c3c3b]" />
            </button>
            <button 
              onClick={() => map?.zoomOut()} 
              className="w-10 h-10 bg-white border border-[#e5e3e1] rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <ZoomOut className="w-4 h-4 text-[#3c3c3b]" />
            </button>
            <button 
              onClick={resetView} 
              className="w-10 h-10 bg-white border border-[#e5e3e1] rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-sm"
            >
              <Maximize2 className="w-4 h-4 text-[#3c3c3b]" />
            </button>
          </div>

          {/* Leyenda */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#e5e3e1] rounded-lg p-3 text-sm shadow-sm z-[1000] max-w-[160px]">
            <div className="font-medium text-[#3c3c3b] mb-2 text-xs">Leyenda de Producción</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Alta (&gt;300t)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Media (150-300t)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Baja (&lt;150t)</span>
              </div>
            </div>
          </div>

          {/* Indicador de municipio seleccionado */}
          {selectedData && (
            <div className="absolute top-4 right-4 bg-white border border-[#e5e3e1] rounded-lg p-3 shadow-sm z-[1000] max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedData.color }}></div>
                <span className="text-sm font-medium text-[#3c3c3b]">{selectedData.name}</span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Producción:</span>
                  <span className="font-medium">{selectedData.value} toneladas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tendencia:</span>
                  <span className="font-medium text-green-600">{selectedData.productionTrend}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Información de municipios en la parte inferior */}
        <div className="border-t border-[#e5e3e1] bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#3c3c3b]">
              Municipios de Baja California
            </span>
            <button
              onClick={resetView}
              className="text-xs text-[#6a1c32] hover:text-[#53152b] flex items-center gap-1"
            >
              <Target className="w-3 h-3" />
              Ver todo el estado
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {municipalities.slice(0, 4).map((mun) => (
              <button
                key={mun.id}
                onClick={() => handleMunicipalityClick(mun.id)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                  selectedMunicipality === mun.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-[#e5e3e1] hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: mun.color }}
                ></div>
                <span className="font-medium truncate">{mun.name}</span>
                <span className="ml-auto text-gray-600 font-medium">{mun.value}t</span>
              </button>
            ))}
            
            {municipalities.length > 4 && (
              <button
                onClick={() => setSelectedMunicipality(null)}
                className="flex items-center justify-center p-2 bg-white border border-[#e5e3e1] rounded-lg hover:bg-gray-50 text-xs text-gray-500"
              >
                +{municipalities.length - 4} más
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas de producción */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-[#6a1c32]">
            {municipalities.filter(m => m.production === 'Alta').length}
          </div>
          <div className="text-xs text-gray-500">Alta producción</div>
        </div>
        <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-[#b17a45]">
            {totalProduction.toLocaleString('es-MX')}
          </div>
          <div className="text-xs text-gray-500">Toneladas totales</div>
        </div>
        <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-[#53152b]">
            ${(totalProduction * 85000).toLocaleString('es-MX', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-gray-500">Valor estimado</div>
        </div>
      </div>
    </div>
  )
}