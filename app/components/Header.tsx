export default function Header() {
  return (
    <header className="bg-[#6a1c32] text-white px-8 py-5 flex items-center justify-between">
      <div>
        <p className="text-xs opacity-80 uppercase tracking-wide">
          Sistema Institucional de Información
        </p>
        <h1 className="text-xl font-semibold mt-1">
          Tablero Estadístico
        </h1>
      </div>

      <div className="text-right text-xs opacity-80">
        <p>Periodo: 2024</p>
        <p>Última actualización: Febrero</p>
      </div>
    </header>
  )
}
