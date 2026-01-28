'use client'
import { useEffect, useState } from 'react'
import { useFilters } from '../store/filters'
import { filterData, totals } from '../utils/aggregate'

function numberFormat(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export default function KPIGrid() {
  const filters = useFilters()
  const [agg, setAgg] = useState({ pesoDesembarque: 0, pesoVivo: 0, valor: 0, speciesCount: 0 })

  useEffect(() => {
    const rows = filterData(filters)
    setAgg(totals(rows))
  }, [filters.region, filters.district, filters.municipality, filters.species, filters.origin, filters.year])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-card border border-default rounded-lg p-5">
        <p className="text-xs text-neutral uppercase">Valor total producido</p>
        <p className="text-2xl font-semibold text-primary mt-2">{numberFormat(agg.valor)} <span className="text-sm text-neutral">millones MXN</span></p>
      </div>

      <div className="bg-card border border-default rounded-lg p-5">
        <p className="text-xs text-neutral uppercase">Peso vivo total</p>
        <p className="text-2xl font-semibold text-primary mt-2">{numberFormat(agg.pesoVivo)} <span className="text-sm text-neutral">ton</span></p>
      </div>

      <div className="bg-card border border-default rounded-lg p-5">
        <p className="text-xs text-neutral uppercase">Peso desembarque total</p>
        <p className="text-2xl font-semibold text-primary mt-2">{numberFormat(agg.pesoDesembarque)} <span className="text-sm text-neutral">ton</span></p>
      </div>

      <div className="bg-card border border-default rounded-lg p-5">
        <p className="text-xs text-neutral uppercase">Especies distintas</p>
        <p className="text-2xl font-semibold text-primary mt-2">{agg.speciesCount}</p>
      </div>
    </div>
  )
}
