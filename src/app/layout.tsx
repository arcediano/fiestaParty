import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invitaciones Digitales - Crea Invitaciones Únicas para tus Eventos',
  description: 'Crea y gestiona invitaciones digitales para cumpleaños y eventos. Diseños personalizables, gestión de asistentes y mucho más.',
  keywords: 'invitaciones digitales, cumpleaños, eventos, gestión de invitados',
  authors: [{ name: 'Invitaciones Digitales' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://invitaciones.com',
    title: 'Invitaciones Digitales',
    description: 'Crea invitaciones únicas para tus eventos',
    siteName: 'Invitaciones Digitales',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}