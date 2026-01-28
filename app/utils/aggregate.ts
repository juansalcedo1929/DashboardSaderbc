// app/utils/aggregate.ts
import { fisheries, RecordRow } from '../data/fisheries'

export function filterData(filters: {
  region?: string
  district?: string
  municipality?: string
  species?: string
  origin?: string
  year?: string
}) {
  return fisheries.filter((r) => {
    if (filters.region && filters.region !== 'all' && r.region !== filters.region) return false
    if (filters.district && filters.district !== 'all' && r.district !== filters.district) return false
    if (filters.municipality && filters.municipality !== 'all' && r.municipality !== filters.municipality) return false
    if (filters.species && filters.species !== 'all' && r.species !== filters.species) return false
    if (filters.origin && filters.origin !== 'all' && r.origin !== filters.origin) return false
    if (filters.year && filters.year !== 'all' && String(r.year) !== String(filters.year)) return false
    return true
  })
}

function sum(rows: RecordRow[]) {
  const pesoDesembarque = rows.reduce((a, b) => a + b.pesoDesembarque, 0)
  const pesoVivo = rows.reduce((a, b) => a + b.pesoVivo, 0)
  const valor = rows.reduce((a, b) => a + b.valor, 0)
  const speciesCount = new Set(rows.map((r) => r.species)).size

  return { pesoDesembarque, pesoVivo, valor, speciesCount }
}

/** Agrupa por oficina -> subOffice -> species (tabla jerárquica) */
export function groupByOffice(rows: RecordRow[]) {
  const map = new Map<string, { office: string; rows: RecordRow[] }>()

  for (const r of rows) {
    const officeKey = r.office

    let officeGroup = map.get(officeKey)
    if (!officeGroup) {
      officeGroup = { office: officeKey, rows: [] }
      map.set(officeKey, officeGroup)
    }

    officeGroup.rows.push(r)
  }

  return Array.from(map.values()).map((office) => {
    const officeSum = sum(office.rows)

    // subOffices
    const subMap = new Map<string, RecordRow[]>()

    for (const r of office.rows) {
      const subKey = r.subOffice || r.municipality || 'Sin asignar'

      let subRows = subMap.get(subKey)
      if (!subRows) {
        subRows = []
        subMap.set(subKey, subRows)
      }

      subRows.push(r)
    }

    const subs = Array.from(subMap.entries()).map(([subName, subRows]) => {
      const subSum = sum(subRows)

      const speciesMap = new Map<string, RecordRow[]>()

      for (const r of subRows) {
        let spRows = speciesMap.get(r.species)
        if (!spRows) {
          spRows = []
          speciesMap.set(r.species, spRows)
        }
        spRows.push(r)
      }

      const species = Array.from(speciesMap.entries()).map(([sp, spRows]) => {
        const spSum = sum(spRows)
        return { species: sp, ...spSum }
      })

      return { subOffice: subName, ...subSum, species }
    })

    return { office: office.office, ...officeSum, subs }
  })
}

export function totals(rows: RecordRow[]) {
  return sum(rows)
}

/** Opciones únicas para filtros */
export function getFilterOptions() {
  const regions = Array.from(new Set(fisheries.map((r) => r.region)))
  const districts = Array.from(new Set(fisheries.map((r) => r.district)))
  const municipalities = Array.from(new Set(fisheries.map((r) => r.municipality)))
  const species = Array.from(new Set(fisheries.map((r) => r.species)))
  const origins = Array.from(new Set(fisheries.map((r) => r.origin)))
  const years = Array.from(new Set(fisheries.map((r) => String(r.year))))

  return { regions, districts, municipalities, species, origins, years }
}
