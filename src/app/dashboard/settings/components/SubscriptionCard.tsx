'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Check, Crown, CreditCard, Download, Receipt, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SubscriptionCard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const currentPlan = {
    name: 'Free',
    price: 0,
    features: [
      '3 invitaciones simultáneas',
      'Hasta 50 invitados por evento',
      'Plantillas básicas',
      'Analíticas básicas',
      'Soporte por email',
    ],
    limits: [
      'Máximo 3 eventos activos',
      'Sin mapas interactivos',
      'Sin recordatorios automáticos',
      'Sin exportación avanzada',
    ]
  }

  const plans = [
    {
      name: 'Premium',
      price: 9.99,
      period: 'mes',
      popular: true,
      features: [
        'Invitaciones ilimitadas',
        'Hasta 500 invitados por evento',
        'Todas las plantillas premium',
        'Analíticas avanzadas',
        'Mapas interactivos',
        'Recordatorios automáticos',
        'Exportación PDF/CSV',
        'Soporte prioritario 24/7',
      ],
    },
    {
      name: 'Empresa',
      price: 29.99,
      period: 'mes',
      popular: false,
      features: [
        'Todo lo de Premium',
        'Invitados ilimitados',
        'Marca personalizada',
        'API access',
        'Gestor de eventos dedicado',
        'White-label solutions',
        'SLA 99.9%',
        'Entrenamiento incluido',
      ],
    }
  ]

  const handleUpgrade = async (plan: string) => {
    setIsLoading(true)
    // Simular proceso de pago
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push(`/checkout?plan=${plan.toLowerCase()}`)
  }

  const invoices = [
    { id: 'INV-001', date: '2024-11-01', amount: '$0.00', status: 'Pagado' },
    { id: 'INV-002', date: '2024-10-01', amount: '$0.00', status: 'Pagado' },
    { id: 'INV-003', date: '2024-09-01', amount: '$0.00', status: 'Pagado' },
  ]

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Plan actual
          </CardTitle>
          <CardDescription>
            Tu plan actual y sus características
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border rounded-lg">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Activo
                </div>
              </div>
              <p className="text-3xl font-bold mb-4">
                ${currentPlan.price}<span className="text-lg font-normal text-muted-foreground">/mes</span>
              </p>
            </div>
            <div>
              <Button
                onClick={() => handleUpgrade('premium')}
                className="bg-gradient-to-r from-primary to-accent"
                isLoading={isLoading}
              >
                <Zap className="w-4 h-4 mr-2" />
                Actualizar a Premium
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-4">Incluido en tu plan</h4>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Limitaciones</h4>
              <ul className="space-y-2">
                {currentPlan.limits.map((limit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 text-red-500">✗</div>
                    <span className="text-muted-foreground">{limit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Planes disponibles</CardTitle>
          <CardDescription>
            Elige el plan que mejor se adapte a tus necesidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 border rounded-lg relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full">
                      MÁS POPULAR
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.name === 'Premium' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      O $99.99/año (ahorra 20%)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gray-900 hover:bg-gray-800'}`}
                  isLoading={isLoading}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {plan.popular ? 'Actualizar ahora' : 'Seleccionar plan'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Historial de facturación
          </CardTitle>
          <CardDescription>
            Tus facturas y recibos anteriores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Factura</th>
                  <th className="text-left p-3 font-semibold">Fecha</th>
                  <th className="text-left p-3 font-semibold">Monto</th>
                  <th className="text-left p-3 font-semibold">Estado</th>
                  <th className="text-left p-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="p-3 font-medium">{invoice.id}</td>
                    <td className="p-3 text-muted-foreground">{invoice.date}</td>
                    <td className="p-3 font-medium">{invoice.amount}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold mb-1">Método de pago</h4>
                <p className="text-sm text-muted-foreground">
                  No hay métodos de pago guardados
                </p>
              </div>
              <Button variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Agregar método de pago
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de facturación</CardTitle>
          <CardDescription>
            Detalles de contacto y facturación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Correo de facturación</h4>
                <p className="text-muted-foreground">facturacion@ejemplo.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dirección de facturación</h4>
                <p className="text-muted-foreground">Calle Ejemplo 123, Ciudad, País</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">IVA/Tax ID</h4>
                <p className="text-muted-foreground">ES-12345678A</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Próxima facturación</h4>
                <p className="text-muted-foreground">1 de enero de 2025</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button variant="outline">
              Actualizar información
            </Button>
            <Button variant="outline">
              Descargar facturas anteriores
            </Button>
            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Cancelar suscripción
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}