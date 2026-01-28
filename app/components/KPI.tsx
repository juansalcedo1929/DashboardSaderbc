'use client'
import { useFilters } from '../store/filters'
import { getTotals } from '../utils/stats'

export default function KPI() {
  const { year } = useFilters()

  // ✅ Conversión controlada
  const numericYear =
    year !== undefined ? Number(year) : null

  const total = getTotals(numericYear)

  return (
    <div className="bg-card border border-default rounded-lg p-6">
      <p className="text-xs uppercase tracking-wide text-neutral">
        Valor total producido
      </p>

      <p className="text-3xl font-semibold text-primary mt-2">
        ${total.toLocaleString()} MDP
      </p>

      <p className="text-sm text-neutral mt-2">
        Año seleccionado: {year ?? 'Todos'}
      </p>
    </div>
  )
}
