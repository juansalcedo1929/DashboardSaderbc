import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-[#f6f4f2] text-[#3c3c3b]
          dark:bg-[#0f172a] dark:text-gray-100
          transition-colors duration-300
        "
      >
        {children}
      </body>
    </html>
  )
}
