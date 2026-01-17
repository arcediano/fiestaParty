'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Check, Crown, Sparkles, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const plans = [
  {
    name: 'Gratis',
    price: '0',
    period: 'para siempre',
    description: 'Perfecto para empezar',
    features: [
      'Hasta 3 invitaciones',
      '50 invitados por evento',
      'Plantillas básicas',
      'RSVP básico',
      'Soporte por email',
      'Sin mapas interactivos',
    ],
    cta: 'Comenzar gratis',
    color: 'from-gray-400 to-gray-600',
    popular: false,
  },
  {
    name: 'Premium',
    price: '9',
    period: 'por mes',
    description: 'Recomendado para eventos especiales',
    features: [
      'Invitaciones ilimitadas',
      '500 invitados por evento',
      'Todas las plantillas premium',
      'RSVP avanzado',
      'Soporte prioritario 24/7',
      'Mapas interactivos',
      'Analíticas detalladas',
      'Recordatorios automáticos',
      'Exportación de datos',
      'Personalización avanzada',
    ],
    cta: 'Probar Premium',
    color: 'from-primary to-accent',
    popular: true,
  },
  {
    name: 'Empresa',
    price: '29',
    period: 'por mes',
    description: 'Para empresas y organizadores profesionales',
    features: [
      'Todo lo de Premium',
      'Invitados ilimitados',
      'Marca personalizada',
      'API access',
      'Soporte dedicado',
      'Entrenamiento del equipo',
      'Dashboard avanzado',
      'Múltiples administradores',
      'Facturación corporativa',
      'Migración asistida',
    ],
    cta: 'Contactar ventas',
    color: 'from-purple-500 to-pink-500',
    popular: false,
  },
]

export function PricingSection() {
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (price: string) => {
    if (billingPeriod === 'yearly') {
      const yearlyPrice = parseInt(price) * 12 * 0.7 // 30% discount
      return Math.floor(yearlyPrice)
    }
    return price
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Crown className="w-4 h-4" />
            PLANES TRANSPARENTES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Precios{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              que se adaptan a ti
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Elige el plan perfecto para tus necesidades. Sin sorpresas, sin contratos largos.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-muted">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${billingPeriod === 'monthly' ? 'bg-background shadow' : ''}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${billingPeriod === 'yearly' ? 'bg-background shadow' : ''}`}
            >
              Anual
              <span className="px-2 py-1 text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full">
                -30%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <Card className={`h-full border-2 ${plan.popular ? 'border-primary/30 shadow-2xl' : 'border-border'} relative overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-bl-full" />
                )}
                
                <CardHeader className="relative">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-bold">${getPrice(plan.price)}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {billingPeriod === 'yearly' && plan.price !== '0' && (
                    <div className="text-sm text-green-600 font-medium">
                      Ahorras ${(parseInt(plan.price) * 12 * 0.3).toFixed(0)} al año
                    </div>
                  )}
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${plan.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-accent' : ''}`}
                    size="lg"
                    onClick={() => {
                      if (plan.name === 'Gratis') {
                        router.push('/register')
                      } else if (plan.name === 'Premium') {
                        router.push('/register')
                      }
                    }}
                  >
                    {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
            <div className="text-4xl">🤝</div>
            <div className="text-left">
              <h4 className="font-semibold text-lg">Garantía de satisfacción de 30 días</h4>
              <p className="text-muted-foreground">
                Si no estás completamente satisfecho, te devolvemos tu dinero. Sin preguntas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}