'use client'

import { Button } from '@/components/ui/buttons/Button'
import { Crown, X, Check } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SubscriptionBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  if (!isVisible) return null

  const features = [
    'Plantillas premium ilimitadas',
    'Hasta 500 invitados por evento',
    'Analíticas avanzadas',
    'Mapas interactivos',
    'Soporte prioritario',
    'Sin anuncios'
  ]

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg mx-4 md:mx-6 lg:mx-8 mt-4 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-lg">Actualiza a Premium</h3>
              <p className="text-sm text-muted-foreground">
                Desbloquea todas las funciones avanzadas
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
            <p className="text-sm text-muted-foreground">o $99.99/año (ahorra 20%)</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="hidden sm:inline-flex"
            >
              <X className="w-4 h-4 mr-2" />
              Más tarde
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-accent"
              onClick={() => router.push('/pricing')}
            >
              <Crown className="w-4 h-4 mr-2" />
              Actualizar ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}