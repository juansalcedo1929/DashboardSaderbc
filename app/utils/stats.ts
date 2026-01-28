import { pesca } from '../data/pesca'

export function getTotals(year: number | null) {
  const filtered = pesca.filter(
    p => !year || p.year === year
  )

  return filtered.reduce(
    (acc, p) => acc + p.valor_mdp,
    0
  )
}
