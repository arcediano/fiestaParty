'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/buttons/Button'
import { Card } from '@/components/ui/cards/Card'
import { Lock, Crown, Check, X } from 'lucide-react'
import { useSubscription } from '@/components/providers/subscription-provider'
import { useRouter } from 'next/navigation'

interface FeatureLockProps {
  children: React.ReactNode
  feature?: string
  showLock?: boolean
}

export function FeatureLock({ children, feature, showLock = true }: FeatureLockProps) {
  const { isPremium, checkAccess } = useSubscription()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const hasAccess = feature ? checkAccess(feature) : isPremium

  if (hasAccess) {
    return <>{children}</>
  }

  const handleUpgrade = () => {
    router.push('/pricing')
    setShowModal(false)
  }

  return (
    <>
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        {children}
        {showLock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-primary to-accent">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-2">
                Característica Premium
              </h3>
              
              <p className="text-muted-foreground text-center mb-6">
                Esta función está disponible solo para usuarios con plan Premium.
                Actualiza tu plan para desbloquear todas las funciones avanzadas.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Plantillas premium exclusivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Hasta 500 invitados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Analíticas avanzadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Mapas interactivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Gestión de alergias</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-accent"
                  onClick={handleUpgrade}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Actualizar a Premium
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}