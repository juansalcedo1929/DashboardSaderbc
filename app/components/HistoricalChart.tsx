'use client'

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

/**
 * Componente cliente independiente que renderiza la gráfica histórica.
 * No modifica nada fuera de sí mismo y usa la paleta institucional.
 */

const historicalData = [
  { month: 'Ene', value: 820 },
  { month: 'Feb', value: 950 },
  { month: 'Mar', value: 1100 },
  { month: 'Abr', value: 1040 },
  { month: 'May', value: 1320 },
  { month: 'Jun', value: 1480 },
]

export default function HistoricalChart() {
  return (
    <div className="bg-white dark:bg-[#020617] rounded-2xl shadow-lg border border-[#e5e3e1] dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#3c3c3b] dark:text-slate-200">
            Comportamiento Histórico
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Evolución mensual de la producción (toneladas)
          </p>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id="bcGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6a1c32" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#6a1c32" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e3e1" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              formatter={(value: number) => [`${value} t`, 'Producción']}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e3e1',
                borderRadius: 8,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6a1c32"
              strokeWidth={2}
              fill="url(#bcGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
