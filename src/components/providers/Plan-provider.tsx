'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface Subscription {
  id: string
  planId: 'free' | 'premium' | 'business'
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  plan: {
    name: string
    price: number
    features: string[]
  }
}

interface SubscriptionContextType {
  subscription: Subscription | null
  isPremium: boolean
  isLoading: boolean
  checkAccess: (feature: string) => boolean
  upgradeToPremium: () => Promise<void>
  cancelSubscription: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

// Hook personalizado para acceder al contexto
export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

interface SubscriptionProviderProps {
  children: ReactNode
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Datos de ejemplo para desarrollo
  const mockSubscription: Subscription = {
    id: 'sub_123',
    planId: 'free', // Cambiar a 'premium' para probar funcionalidades premium
    status: 'active',
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    plan: {
      name: 'Free Plan',
      price: 0,
      features: [
        '3 invitaciones simultáneas',
        'Hasta 50 invitados por evento',
        'Plantillas básicas',
        'RSVP básico',
        'Estadísticas simples',
        'Soporte por email'
      ]
    }
  }

  useEffect(() => {
    // Simular carga de suscripción
    const loadSubscription = async () => {
      setIsLoading(true)
      try {
        // En producción, aquí iría una llamada a tu API
        await new Promise(resolve => setTimeout(resolve, 500)) // Simular delay
        setSubscription(mockSubscription)
      } catch (error) {
        console.error('Error loading subscription:', error)
        // En caso de error, se asume plan free
        setSubscription(mockSubscription)
      } finally {
        setIsLoading(false)
      }
    }

    loadSubscription()
  }, [])

  const isPremium = subscription?.planId === 'premium' || subscription?.planId === 'business'

  const checkAccess = (feature: string): boolean => {
    if (isPremium) return true

    // Definir qué características están disponibles en free
    const freeFeatures = [
      'basic_templates',
      'basic_invitations',
      'basic_rsvp',
      'dashboard_view',
      'guest_management_basic',
      'analytics_basic'
    ]

    // Características que requieren premium
    const premiumFeatures = [
      'premium_templates',
      'unlimited_invitations',
      'advanced_analytics',
      'maps_integration',
      'export_pdf',
      'reminder_emails',
      'brand_customization',
      'api_access'
    ]

    return freeFeatures.includes(feature)
  }

  const upgradeToPremium = async (): Promise<void> => {
    setIsLoading(true)
    try {
      // Simular llamada a Stripe/API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const premiumSubscription: Subscription = {
        id: 'sub_premium_123',
        planId: 'premium',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        plan: {
          name: 'Premium Plan',
          price: 9.99,
          features: [
            'Invitaciones ilimitadas',
            'Hasta 500 invitados por evento',
            'Todas las plantillas premium',
            'Analíticas avanzadas',
            'Mapas interactivos',
            'Recordatorios automáticos',
            'Exportación PDF/CSV',
            'Soporte prioritario 24/7'
          ]
        }
      }
      
      setSubscription(premiumSubscription)
      // Aquí normalmente redirigirías a Stripe Checkout
      console.log('Redirecting to Stripe Checkout...')
    } catch (error) {
      console.error('Error upgrading subscription:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async (): Promise<void> => {
    setIsLoading(true)
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const freeSubscription: Subscription = {
        id: 'sub_free_123',
        planId: 'free',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        plan: {
          name: 'Free Plan',
          price: 0,
          features: [
            '3 invitaciones simultáneas',
            'Hasta 50 invitados por evento',
            'Plantillas básicas',
            'RSVP básico',
            'Estadísticas simples',
            'Soporte por email'
          ]
        }
      }
      
      setSubscription(freeSubscription)
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: SubscriptionContextType = {
    subscription,
    isPremium,
    isLoading,
    checkAccess,
    upgradeToPremium,
    cancelSubscription
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}