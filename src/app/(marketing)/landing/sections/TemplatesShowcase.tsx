'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Crown, Heart, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const templates = [
  {
    id: 1,
    title: 'Cumpleaños Infantil',
    category: 'Kids',
    color: 'from-pink-400 to-purple-500',
    stats: { likes: '2.4K', usage: '5.2K' },
    premium: false,
  },
  {
    id: 2,
    title: 'Boda Elegante',
    category: 'Elegant',
    color: 'from-gold-400 to-yellow-500',
    stats: { likes: '3.1K', usage: '4.8K' },
    premium: true,
  },
  {
    id: 3,
    title: 'Fiesta Temática',
    category: 'Themed',
    color: 'from-blue-400 to-cyan-500',
    stats: { likes: '1.8K', usage: '3.6K' },
    premium: false,
  },
  {
    id: 4,
    title: 'Aniversario',
    category: 'Elegant',
    color: 'from-red-400 to-orange-500',
    stats: { likes: '2.9K', usage: '4.1K' },
    premium: true,
  },
]

export function TemplatesShowcase() {
  const router = useRouter()

  return (
    <section id="templates" className="py-20 bg-gradient-to-b from-muted/20 to-background">
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
            COLECCIÓN PREMIUM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Plantillas que{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              inspiran
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre nuestra colección de plantillas diseñadas profesionalmente para cada tipo de evento.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
              onClick={() => router.push('/dashboard/templates')}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                {/* Template Card */}
                <div className={`h-64 bg-gradient-to-br ${template.color} relative`}>
                  {/* Template Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                          {template.category}
                        </span>
                        {template.premium && (
                          <Crown className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{template.title}</h3>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-white/80">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{template.stats.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">{template.stats.usage} usos</span>
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Usar plantilla
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 group"
            onClick={() => router.push('/dashboard/templates')}
          >
            Explorar +200 plantillas
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Nuevas plantillas agregadas cada semana
          </p>
        </motion.div>
      </div>
    </section>
  )
}