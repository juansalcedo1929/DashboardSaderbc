'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useFilters } from '../store/filters'
import { pesca } from '../data/pesca'

export default function SalesChart() {
  const { year } = useFilters()

  // 🔄 Filtro por año (string → number)
  const numericYear =
    year !== undefined ? Number(year) : undefined

  const filtered = pesca.filter(
    p => numericYear === undefined || p.year === numericYear
  )

  // 🔢 Agregación por municipio
  const data = Object.values(
    filtered.reduce((acc: any, cur) => {
      acc[cur.municipio] = acc[cur.municipio] || {
        municipio: cur.municipio,
        valor: 0,
      }
      acc[cur.municipio].valor += cur.valor_mdp
      return acc
    }, {})
  )

  return (
    <section className="bg-card border border-default rounded-lg p-6 h-[360px]">
      <h3 className="text-sm font-semibold text-neutral mb-4">
        Valor producido por municipio (MDP)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="municipio" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="var(--color-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
