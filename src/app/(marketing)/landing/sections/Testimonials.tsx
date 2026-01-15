'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/cards/Card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ana Martínez',
    role: 'Organizadora de eventos',
    content: 'Increíble plataforma. Para la boda de mi hija creé invitaciones que impresionaron a todos. La gestión de invitados fue súper fácil.',
    rating: 5,
    avatarColor: 'from-pink-400 to-purple-500',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Empresario',
    content: 'Usamos Invitaciones Digitales para nuestro evento corporativo. Profesional, eficiente y los reportes de confirmación nos ayudaron mucho.',
    rating: 5,
    avatarColor: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'Laura Gómez',
    role: 'Mamá organizadora',
    content: 'El cumpleaños de mi hijo fue un éxito gracias a las invitaciones interactivas. Los niños estaban emocionados desde el primer momento.',
    rating: 5,
    avatarColor: 'from-green-400 to-emerald-500',
  },
  {
    name: 'Miguel Sánchez',
    role: 'Fotógrafo de eventos',
    content: 'Recomiendo esta plataforma a todos mis clientes. Las invitaciones son tan profesionales que mejoran toda la experiencia del evento.',
    rating: 5,
    avatarColor: 'from-orange-400 to-red-500',
  },
  {
    name: 'Sofía López',
    role: 'Community Manager',
    content: 'Para eventos de marca es perfecto. Las analíticas nos ayudan a entender mejor a nuestra audiencia y mejorar futuros eventos.',
    rating: 5,
    avatarColor: 'from-purple-400 to-pink-500',
  },
  {
    name: 'David Fernández',
    role: 'Profesor universitario',
    content: 'Organizamos un congreso académico y la plataforma simplificó todo el proceso de invitación y registro. Excelente herramienta.',
    rating: 5,
    avatarColor: 'from-yellow-400 to-orange-500',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              usuarios felices
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Miles de personas ya han transformado sus eventos con nuestras invitaciones digitales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor}`} />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-primary/30" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Confiado por empresas y particulares
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <div className="text-2xl font-bold text-primary">EVENTPRO</div>
            <div className="text-xl font-semibold text-secondary">WeddingPlanners</div>
            <div className="text-lg font-medium text-accent">KidsParty</div>
            <div className="text-xl font-bold text-purple-500">CorpEvents</div>
            <div className="text-lg font-semibold text-green-500">EcoCelebrations</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}