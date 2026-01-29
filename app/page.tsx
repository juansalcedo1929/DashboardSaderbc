import Filters from './components/Filters'
import SalesMap from './components/SalesMap'
import OfficesTable from './components/OfficesTable'
import ThemeToggle from './components/ThemeToggle'
import HistoricalChart from './components/HistoricalChart'

// Nueva versión de Page.tsx
export default function Page() {
  return (
    <main   className="
    min-h-screen
    bg-gradient-to-br
    from-[#f6f4f2] via-white to-[#f9f8f7]
    dark:from-[#0f172a] dark:via-[#020617] dark:to-[#020617]
    p-4 md:p-8
    transition-colors
  "
>
      {/* Header modernizado con gradiente sutil */}
{/* Header gubernamental moderno con paleta institucional */}
<header className="relative bg-gradient-to-br from-[#f6f4f2] via-white to-[#f9f8f7] rounded-2xl shadow-lg overflow-hidden mb-8 border border-[#e5e3e1]">
  
  {/* Banda superior institucional */}
  <div className="bg-gradient-to-r from-[#6a1c32] via-[#993233] to-[#53152b] h-2"></div>
  
  <div className="p-6 md:p-8">
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      
      {/* Logo y branding - Versión limpia y profesional */}
      <div className="flex items-center gap-4">
        {/* Logo transparente y limpio */}
 <div className="relative">
<img 
  src="/Agricultura.png" 
  alt="Secretaría de Agricultura y Desarrollo Rural - Gobierno de Baja California"
  className="
    h-36
    w-auto
    max-w-[420px]
    object-contain
  "
/>


</div>
        
        {/* Texto institucional */}
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3c3c3b] tracking-tight leading-tight">
              Secretaría de Agricultura y Desarrollo Rural
              <span className="block text-base md:text-lg font-normal text-[#6a1c32] mt-1">
                Gobierno del Estado de Baja California
              </span>
            </h1>
          </div>
          
          {/* Badges institucionales */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#6a1c32] text-white text-xs rounded-full font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Sistema Oficial de Estadística
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3c3c3b] text-white text-xs rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Estado de Baja California
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[#3c3c3b] text-xs rounded-full border border-[#e5e3e1]">
              📊 Datos Certificados
            </span>
          </div>
        </div>
      </div>

      {/* Estado y acciones */}
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
        {/* Indicador de actualización */}
        <div className="flex items-center gap-2 bg-white border border-[#e5e3e1] rounded-xl px-4 py-2.5 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-[#3c3c3b]">Actualizado</span>
            <span className="text-xs text-[#6a1c32] font-medium">{new Date().toLocaleDateString('es-MX')}</span>
          </div>
          <div className="relative ml-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 opacity-50 animate-ping"></div>
          </div>
        </div>
        
        {/* Botón de acción principal */}
        <button className="group relative bg-gradient-to-r from-[#6a1c32] to-[#53152b] text-white font-medium py-2.5 px-5 rounded-xl hover:shadow-lg transition-all duration-300">
          <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar Reporte
          </span>
        </button>
         <ThemeToggle />
      </div>
      
    </div>

    {/* Navegación y métricas */}
    <div className="mt-8 pt-6 border-t border-[#e5e3e1]">
      
      {/* Navegación rápida */}
      <nav className="flex flex-wrap items-center gap-1 mb-6">
        {[
          { name: 'Dashboard', icon: '📊', active: true },
          { name: 'Mapa Interactivo', icon: '🗺️' },
          { name: 'Reportes Oficiales', icon: '📋' },
          { name: 'Indicadores', icon: '📈' },
          { name: 'Documentación', icon: '📚' }
        ].map((item, index) => (
          <a 
            key={index}
            href="#" 
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
              item.active 
                ? 'bg-[#6a1c32] text-white shadow-sm' 
                : 'text-[#3c3c3b] hover:bg-[#f6f4f2] hover:text-[#6a1c32]'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}       
      </nav>

      {/* Tarjetas de métricas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e5e3e1] rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Municipios Activos</p>
              <p className="text-2xl font-bold text-[#3c3c3b] mt-1">7</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#6a1c32]/10 flex items-center justify-center">
              <span className="text-[#6a1c32] text-xl">📍</span>
            </div>
          </div>
    
        </div>
        
        <div className="bg-white border border-[#e5e3e1] rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Producción Total</p>
              <p className="text-2xl font-bold text-[#3c3c3b] mt-1">1,875</p>
              <p className="text-xs text-gray-400">toneladas</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#b17a45]/10 flex items-center justify-center">
              <span className="text-[#b17a45] text-xl">🐟</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
            <p className="text-xs text-[#b17a45] font-medium">↑ 12.5% vs anterior</p>
          </div>
        </div>
        
        <div className="bg-white border border-[#e5e3e1] rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Valor Comercial</p>
              <p className="text-2xl font-bold text-[#3c3c3b] mt-1">$65.2M</p>
              <p className="text-xs text-gray-400">MXN</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#993233]/10 flex items-center justify-center">
              <span className="text-[#993233] text-xl">💰</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
            <p className="text-xs text-[#b17a45] font-medium">↑ 8.3% vs anterior</p>
          </div>
        </div>
        
        <div className="bg-white border border-[#e5e3e1] rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Crecimiento Anual</p>
              <p className="text-2xl font-bold text-[#3c3c3b] mt-1">+8.5%</p>
              <p className="text-xs text-gray-400">tasa trimestral</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#53152b]/10 flex items-center justify-center">
              <span className="text-[#53152b] text-xl">📈</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#e5e3e1]">
            <p className="text-xs text-[#b17a45] font-medium">Tendencia positiva</p>
          </div>
        </div>
      </div>
      
      {/* Línea informativa inferior */}
      <div className="mt-6 pt-4 border-t border-[#e5e3e1]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Sistema de Estadística Pesquera Oficial</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Datos certificados por el INEGI</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-sm text-[#6a1c32] hover:text-[#53152b]">
            <span>Ver metodología oficial</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>


</header>
      {/* Filtros en card moderna */}
      <section className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3c3c3b]">Filtros y parámetros</h2>
            <button className="text-sm text-gray-500 hover:text-[#3c3c3b] transition-colors">
              Restablecer filtros
            </button>
          </div>
          <Filters />
        </div>
      </section>

      {/* Dashboard grid moderna */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tarjetas de resumen */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Capturado</p>
                <p className="text-2xl font-bold text-[#3c3c3b]">1,245.5 t</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">🐟</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e3e1]">
              <p className="text-xs text-green-600">↑ 12.5% vs mes anterior</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Valor Comercial</p>
                <p className="text-2xl font-bold text-[#3c3c3b]">$45.2M MXN</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <span className="text-green-600 text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e3e1]">
              <p className="text-xs text-green-600">↑ 8.3% vs mes anterior</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Embarcaciones Activas</p>
                <p className="text-2xl font-bold text-[#3c3c3b]">156</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <span className="text-purple-600 text-2xl">🚤</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e5e3e1]">
              <p className="text-xs text-gray-500">Sin cambio vs mes anterior</p>
            </div>
          </div>
        </div>
      </section>



      {/* Mapa + Tabla en layout moderno */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa - Card moderna */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] overflow-hidden">
          <div className="p-6 border-b border-[#e5e3e1]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#3c3c3b]">Distribución Geográfica</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-[#e5e3e1] rounded-lg hover:bg-gray-50 transition-colors">
                  Vista satélite
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Interactúa con el mapa para ver detalles</p>
          </div>
          <div className="h-[400px]">
            <SalesMap />
          </div>
                {/* ======= Gráfica histórica (añadida) ======= */}
   
        <HistoricalChart />

        </div>

        {/* Tabla - Card moderna */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e3e1] overflow-hidden">
          <div className="p-6 border-b border-[#e5e3e1]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#3c3c3b]">Oficinas Regionales</h2>
              <button className="px-3 py-1 text-sm bg-[#f6f4f2] text-[#3c3c3b] rounded-lg hover:bg-[#e5e3e1] transition-colors">
                Ver todas →
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Contacto y estadísticas por oficina</p>
          </div>
          <div className="overflow-x-auto">
            <OfficesTable />
          </div>
        </div>
      </section>

      {/* Footer moderno */}
      <footer className="mt-8 pt-6 border-t border-[#e5e3e1]">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            <p>© 2026 Secretaría de Agricultura y Desarrollo Rural. Todos los derechos reservados.</p>
          </div>
   
        </div>
      </footer>
    </main>
  )
}
