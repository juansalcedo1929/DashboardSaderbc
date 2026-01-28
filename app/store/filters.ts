import { create } from 'zustand'

export type Filters = {
  region: string
  district: string
  municipality: string
  office: string
  species: string
  year: string
}

type FiltersStore = Filters & {
  setFilter: (key: keyof Filters, value: string) => void
  reset: () => void
}

const initialState: Filters = {
  region: 'all',
  district: 'all',
  municipality: 'all',
  office: 'all',
  species: 'all',
  year: 'all',
}

export const useFilters = create<FiltersStore>((set) => ({
  ...initialState,
  setFilter: (key, value) => set({ [key]: value }),
  reset: () => set(initialState),
}))
