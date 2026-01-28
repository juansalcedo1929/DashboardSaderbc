'use client'

import { useState, useEffect } from 'react'
import { Building2, Phone, Mail, User, ChevronDown, ChevronUp, MapPin, BarChart3, FileText } from 'lucide-react'

// Datos de oficinas municipales - versión mejorada
const MUNICIPAL_OFFICES = [
  {
    id: 'tijuana',
    name: 'Tijuana',
    manager: 'Ana Martínez',
    phone: '(664) 123-4567',
    email: 'tijuana.agricultura@bajacalifornia.gob.mx',
    address: 'Centro Administrativo, Zona Río',
    region: 'Norte',
    production: 280, // en miles de toneladas
    value: 23800, // en millones de pesos
    species: 12,
    coverage: 'Zona Metropolitana'
  },
  {
    id: 'mexicali',
    name: 'Mexicali',
    manager: 'Carlos Rodríguez',
    phone: '(686) 234-5678',
    email: 'mexicali.agricultura@bajacalifornia.gob.mx',
    address: 'Calzada Independencia #456',
    region: 'Norte',
    production: 320,
    value: 27200,
    species: 15,
    coverage: 'Valle de Mexicali'
  },
  {
    id: 'ensenada',
    name: 'Ensenada',
    manager: 'María González',
    phone: '(646) 345-6789',
    email: 'ensenada.agricultura@bajacalifornia.gob.mx',
    address: 'Av. Costera #123, Centro',
    region: 'Norte',
    production: 450,
    value: 38250,
    species: 18,
    coverage: 'Costa Central'
  },
  {
    id: 'rosarito',
    name: 'Playas de Rosarito',
    manager: 'Pedro López',
    phone: '(661) 456-7890',
    email: 'rosarito.agricultura@bajacalifornia.gob.mx',
    address: 'Av. Benito Juárez #101',
    region: 'Norte',
    production: 180,
    value: 15300,
    species: 8,
    coverage: 'Costa Norte'
  },
  {
    id: 'tecate',
    name: 'Tecate',
    manager: 'Laura Sánchez',
    phone: '(665) 567-8901',
    email: 'tecate.agricultura@bajacalifornia.gob.mx',
    address: 'Calle Libertad #202',
    region: 'Norte',
    production: 95,
    value: 8075,
    species: 6,
    coverage: 'Zona Fronteriza'
  },
  {
    id: 'san-felipe',
    name: 'San Felipe',
    manager: 'Juan Díaz',
    phone: '(686) 678-9012',
    email: 'sanfelipe.agricultura@bajacalifornia.gob.mx',
    address: 'Zona Comercial, Centro',
    region: 'Sur',
    production: 380,
    value: 32300,
    species: 14,
    coverage: 'Mar de Cortés'
  }
]

export default function OfficesTable() {
  const [expandedOffice, setExpandedOffice] = useState<string | null>(null)
  const [officeData, setOfficeData] = useState<typeof MUNICIPAL_OFFICES>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOfficeData(MUNICIPAL_OFFICES)
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleOffice = (officeId: string) => {
    setExpandedOffice(expandedOffice === officeId ? null : officeId)
  }

  const getTotalProduction = () => {
    return officeData.reduce((sum, office) => sum + office.production, 0)
  }

  const getTotalValue = () => {
    return officeData.reduce((sum, office) => sum + office.value, 0)
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#3c3c3b]">Oficinas Municipales</h3>
          <p className="text-xs text-gray-500">Cargando datos oficiales...</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#6a1c32] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header compacto */}
      <div className="mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#3c3c3b]">Oficinas Municipales</h3>
          <p className="text-xs text-gray-500">
            {officeData.length} municipios · {getTotalProduction().toLocaleString('es-MX')} mil toneladas
          </p>
        </div>
        
        {/* Resumen rápido */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
            <p className="text-sm font-bold text-[#6a1c32]">{officeData.length}</p>
            <p className="text-xs text-gray-500">Oficinas</p>
          </div>
          <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
            <p className="text-sm font-bold text-[#b17a45]">{getTotalProduction().toLocaleString('es-MX')}</p>
            <p className="text-xs text-gray-500">Mil toneladas</p>
          </div>
          <div className="bg-white border border-[#e5e3e1] rounded-lg p-2 text-center">
            <p className="text-sm font-bold text-[#53152b]">${(getTotalValue() / 1000).toFixed(0)}M</p>
            <p className="text-xs text-gray-500">Valor total</p>
          </div>
        </div>
      </div>

      {/* Lista de oficinas municipales - Compacta */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {officeData.map((office) => {
          const isExpanded = expandedOffice === office.id
          const regionColor = office.region === 'Norte' ? '#6a1c32' : '#b17a45'
          
          return (
            <div 
              key={office.id} 
              className={`bg-white border border-[#e5e3e1] rounded-lg overflow-hidden transition-all ${
                isExpanded ? 'shadow-sm' : 'hover:shadow-sm'
              }`}
            >
              {/* Encabezado compacto */}
              <div 
                className="p-3 cursor-pointer"
                onClick={() => toggleOffice(office.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${regionColor}10` }}
                    >
                      <Building2 className="w-3 h-3" style={{ color: regionColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-[#3c3c3b] text-sm truncate">{office.name}</h4>
                        <span 
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{ 
                            backgroundColor: `${regionColor}20`,
                            color: regionColor
                          }}
                        >
                          {office.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">{office.manager}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#3c3c3b]">
                        {office.production.toLocaleString('es-MX')}
                        <span className="text-xs text-gray-500 ml-1">mil t</span>
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-[#3c3c3b]">
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido expandido - Información compacta */}
              {isExpanded && (
                <div className="border-t border-[#e5e3e1] bg-gray-50 p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Información de contacto */}
                    <div>
                      <h5 className="text-xs font-semibold text-[#3c3c3b] mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Información de Contacto
                      </h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600 truncate">{office.email}</span>
                        </div>
                        <div className="text-gray-500 mt-1 text-[11px]">
                          {office.address}
                        </div>
                      </div>
                    </div>
                    
                    {/* Estadísticas */}
                    <div>
                      <h5 className="text-xs font-semibold text-[#3c3c3b] mb-2 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        Estadísticas
                      </h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cobertura:</span>
                          <span className="font-medium text-[#3c3c3b]">{office.coverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Especies registradas:</span>
                          <span className="font-medium text-[#b17a45]">{office.species}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valor comercial:</span>
                          <span className="font-medium text-[#53152b]">
                            ${(office.value / 1000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Participación estatal */}
                  <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
                    <div className="text-xs text-gray-600 mb-1">
                      Participación estatal: {((office.production / getTotalProduction()) * 100).toFixed(1)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(office.production / getTotalProduction()) * 100}%`,
                          backgroundColor: regionColor
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Resumen final */}
      <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
        <div className="text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <span>Datos oficiales · Estado de Baja California</span>
            <button className="flex items-center gap-1 text-[#6a1c32] hover:text-[#53152b] font-medium">
              <FileText className="w-3 h-3" />
              <span>Informe completo</span>
            </button>
          </div>
          <div className="mt-1 text-[11px] text-gray-400">
            Período: Enero - Diciembre {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  )
}