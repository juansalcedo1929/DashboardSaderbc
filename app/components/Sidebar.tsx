'use client'
import Filters from './Filters'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-[#e5e3e1] p-6 space-y-6">
      <h2 className="text-xs font-semibold text-[#3c3c3b] uppercase tracking-wide">
        Filtros
      </h2>

      <div>
        <label className="block text-xs text-[#3c3c3b] mb-1">
          Periodo
        </label>
        <Filters />
      </div>
    </aside>
  )
}
