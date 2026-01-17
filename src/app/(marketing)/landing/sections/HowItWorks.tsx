'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Search, Palette, Users, Share2, Bell, PartyPopper } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Elige una plantilla',
    description: 'Explora nuestra biblioteca con cientos de diseños profesionales para cada ocasión.',
    color: 'from-primary to-pink-400',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Personalízala',
    description: 'Cambia colores, textos, imágenes y añade tus detalles en minutos.',
    color: 'from-secondary to-teal-400',
  },
  {
    number: '03',
    icon: Users,
    title: 'Añade invitados',
    description: 'Importa tu lista o añade invitados manualmente con sus datos de contacto.',
    color: 'from-accent to-blue-400',
  },
  {
    number: '04',
    icon: Share2,
    title: 'Comparte',
    description: 'Envía por email, WhatsApp o genera un enlace único para compartir.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '05',
    icon: Bell,
    title: 'Gestiona RSVP',
    description: 'Controla confirmaciones, preferencias y envía recordatorios automáticos.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    number: '06',
    icon: PartyPopper,
    title: '¡Disfruta tu evento!',
    description: 'Todo listo para que solo te preocupes por disfrutar con tus invitados.',
    color: 'from-orange-500 to-red-400',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tan simple como{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              1, 2, 3
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crea invitaciones profesionales en minutos sin necesidad de conocimientos de diseño.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/20 to-secondary/20 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2 lg:mt-20'}`}
              >
                {/* Step Number */}
                <div className={`absolute ${index % 2 === 0 ? 'lg:-right-6' : 'lg:-left-6'} top-6 z-10`}>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 lg:flex-row lg:gap-4">
                      {index % 2 === 0 && (
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <CardTitle className="text-xl flex-1">{step.title}</CardTitle>
                      {index % 2 !== 0 && (
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              5 min
            </div>
            <div className="text-sm text-muted-foreground mt-2">Para crear una invitación</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-teal-400 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-sm text-muted-foreground mt-2">Tasa de confirmación</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-sm text-muted-foreground mt-2">Soporte disponible</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              0
            </div>
            <div className="text-sm text-muted-foreground mt-2">Conocimientos técnicos requeridos</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}