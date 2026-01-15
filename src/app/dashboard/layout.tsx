
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {DashboardHeader} from '@/components/layout/DashboardHeader'
import {DashboardSidebar} from '@/components/layout/DashboardSidebar'
import {SubscriptionBanner} from '@/components/layout/SubscriptionBanner'
import { useSubscription } from '@/components/providers/subscription-provider'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  const { isPremium } = useSubscription()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mostrar loading mientras se carga la sesión
  if (status === 'loading' || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground dark:text-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirigir si no hay sesión (se maneja con middleware)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-200">
      <DashboardHeader 
        user={session.user}
        onMenuClick={() => setSidebarOpen(true)} 
      />
      
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        // Si el sidebar necesita isPremium, lo pasamos aquí:
        // isPremium={isPremium}
      />
      
      <main className="lg:pl-64 pt-16 transition-all duration-200">
        {/* Solo mostrar banner si no es premium */}
        {!isPremium && <SubscriptionBanner />}
        
        <div className="p-4 md:p-6 lg:p-8 bg-background dark:bg-background">
          {children}
        </div>
      </main>
    </div>
  )
}