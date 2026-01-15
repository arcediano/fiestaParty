'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { 
  Palette, 
  Users, 
  BarChart3, 
  Bell, 
  MapPin, 
  Download,
  Shield,
  Zap,
  Smartphone,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Diseños Profesionales',
    description: 'Cientos de plantillas creadas por diseñadores profesionales, personalizables al 100%.',
    color: 'from-primary to-pink-400',
    delay: 0.1,
  },
  {
    icon: Users,
    title: 'Gestión Inteligente',
    description: 'Controla confirmaciones, alergias y preferencias de todos tus invitados en tiempo real.',
    color: 'from-secondary to-teal-400',
    delay: 0.2,
  },
  {
    icon: BarChart3,
    title: 'Analíticas Avanzadas',
    description: 'Métricas detalladas de participación, confirmaciones y engagement de tus invitados.',
    color: 'from-accent to-blue-400',
    delay: 0.3,
  },
  {
    icon: Bell,
    title: 'Recordatorios Automáticos',
    description: 'Envía recordatorios personalizados por email y WhatsApp antes del evento.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.4,
  },
  {
    icon: MapPin,
    title: 'Mapas Interactivos',
    description: 'Integración con Google Maps para que tus invitados lleguen sin problemas.',
    color: 'from-green-500 to-emerald-400',
    delay: 0.5,
  },
  {
    icon: Smartphone,
    title: 'Totalmente Responsive',
    description: 'Tus invitaciones se ven perfectas en cualquier dispositivo: móvil, tablet o desktop.',
    color: 'from-orange-500 to-red-400',
    delay: 0.6,
  },
  {
    icon: Shield,
    title: 'Seguridad Máxima',
    description: 'Encriptación de grado empresarial para proteger los datos de tus invitados.',
    color: 'from-indigo-500 to-purple-400',
    delay: 0.7,
  },
  {
    icon: Globe,
    title: 'Multidioma',
    description: 'Crea invitaciones en múltiples idiomas para eventos internacionales.',
    color: 'from-yellow-500 to-orange-400',
    delay: 0.8,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            TODO LO QUE NECESITAS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Características diseñadas para{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              simplificar tu vida
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combina diseño profesional con funcionalidades inteligentes para crear la experiencia de invitación perfecta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base mt-4">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary to-accent">
            <div className="bg-background rounded-xl px-8 py-4">
              <p className="text-lg">
                <span className="font-semibold">+50 funcionalidades avanzadas</span> para que solo te preocupes por disfrutar tu evento.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}