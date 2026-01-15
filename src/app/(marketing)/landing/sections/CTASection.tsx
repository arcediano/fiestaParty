'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/buttons/Button'
import { ArrowRight, CheckCircle, Rocket, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CTASection() {
  const router = useRouter()

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            ¡NO ESPERES MÁS!
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Empieza a crear{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                experiencias
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-4 bg-primary/20 -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              />
            </span>{' '}
            inolvidables hoy
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Únete a miles de personas que ya están transformando sus eventos con invitaciones digitales memorables.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group"
              onClick={() => router.push('/register')}
            >
              Comenzar gratis ahora
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => router.push('/login')}
            >
              Ya tengo una cuenta
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Sin tarjeta requerida</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 justify-center"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Configuración en 2 minutos</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 justify-center md:justify-end"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Soporte 24/7 incluido</span>
            </motion.div>
          </div>

          {/* Final Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary to-accent"
          >
            <div className="bg-background rounded-xl px-8 py-6">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Únete a nuestra comunidad</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Usuarios felices</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">200K+</div>
                    <div className="text-xs text-muted-foreground">Invitaciones creadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">4.9★</div>
                    <div className="text-xs text-muted-foreground">Rating promedio</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}