'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Forzar una recarga inicial para evitar inconsistencias
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Hook personalizado para verificar el tema
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  
  return {
    theme,
    setTheme,
    systemTheme,
    isDark,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }
}