// app/data/fisheries.ts
export type RecordRow = {
  region: string // ej. "Norte", "Centro", "Sur"
  district: string // Distrito de desarrollo rural
  municipality: string // municipio
  office: string // oficina (ej. "Bahía de San Quintín")
  subOffice?: string // localidad dentro de la oficina (ej. "Hermosillo" en Sonora ejemplo)
  species: string // especie (ej. "Camarón")
  origin: string // "Captura", "Acuicultura"
  year: number
  pesoDesembarque: number // toneladas
  pesoVivo: number // toneladas
  valor: number // millones MXN
}

export const fisheries: RecordRow[] = [
  // Tijuana
  { region: 'Norte', district: 'D1', municipality: 'Tijuana', office: 'Tijuana', subOffice: 'Tijuana', species: 'Camarón', origin: 'Captura', year: 2024, pesoDesembarque: 120, pesoVivo: 100, valor: 2.4 },
  { region: 'Norte', district: 'D1', municipality: 'Tijuana', office: 'Tijuana', subOffice: 'Tijuana', species: 'Jaiba', origin: 'Captura', year: 2024, pesoDesembarque: 40, pesoVivo: 36, valor: 0.5 },

  // Mexicali
  { region: 'Norte', district: 'D2', municipality: 'Mexicali', office: 'Puerto del Golfo', subOffice: 'Mexicali', species: 'Calamar', origin: 'Captura', year: 2024, pesoDesembarque: 10, pesoVivo: 9, valor: 0.08 },

  // Ensenada
  { region: 'Centro', district: 'D3', municipality: 'Ensenada', office: 'Ensenada', subOffice: 'Ensenada', species: 'Camarón', origin: 'Captura', year: 2024, pesoDesembarque: 300, pesoVivo: 250, valor: 6.0 },
  { region: 'Centro', district: 'D3', municipality: 'Ensenada', office: 'Ensenada', subOffice: 'Ensenada', species: 'Almeja', origin: 'Captura', year: 2024, pesoDesembarque: 80, pesoVivo: 70, valor: 0.9 },

  // Tecate
  { region: 'Norte', district: 'D2', municipality: 'Tecate', office: 'Tecate', subOffice: 'Tecate', species: 'Jaiba', origin: 'Captura', year: 2024, pesoDesembarque: 5, pesoVivo: 4.5, valor: 0.02 },

  // Playas de Rosarito
  { region: 'Norte', district: 'D1', municipality: 'Playas de Rosarito', office: 'Rosarito', subOffice: 'Rosarito', species: 'Camarón', origin: 'Captura', year: 2024, pesoDesembarque: 60, pesoVivo: 51, valor: 1.0 },

  // San Quintín
  { region: 'Sur', district: 'D4', municipality: 'San Quintín', office: 'Bahía de San Quintín', subOffice: 'San Quintín', species: 'Almeja', origin: 'Captura', year: 2024, pesoDesembarque: 120, pesoVivo: 110, valor: 1.6 },
  { region: 'Sur', district: 'D4', municipality: 'San Quintín', office: 'Bahía de San Quintín', subOffice: 'San Quintín', species: 'Camarón', origin: 'Acuicultura', year: 2024, pesoDesembarque: 40, pesoVivo: 36, valor: 0.7 },

  // San Felipe
  { region: 'Sur', district: 'D4', municipality: 'San Felipe', office: 'Puerto San Felipe', subOffice: 'San Felipe', species: 'Pez Vela', origin: 'Captura', year: 2024, pesoDesembarque: 15, pesoVivo: 14, valor: 0.25 },

  // Añadimos algunas filas para pasado (2023) para permitir comparaciones
  { region: 'Centro', district: 'D3', municipality: 'Ensenada', office: 'Ensenada', subOffice: 'Ensenada', species: 'Camarón', origin: 'Captura', year: 2023, pesoDesembarque: 280, pesoVivo: 230, valor: 5.5 },
  { region: 'Norte', district: 'D1', municipality: 'Tijuana', office: 'Puerto Tijuana', subOffice: 'Tijuana', species: 'Camarón', origin: 'Captura', year: 2023, pesoDesembarque: 100, pesoVivo: 86, valor: 2.0 },
]
