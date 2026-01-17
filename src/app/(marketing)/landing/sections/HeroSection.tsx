'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Sparkles, Star, TrendingUp, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function HeroSection() {
  const router = useRouter()
  const { status } = useSession()

  const handleGetStarted = () => {
    if (status === 'authenticated') {
      router.push('/dashboard/templates')
    } else {
      router.push('/register')
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/5">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              <Sparkles className="w-4 h-4" />
              ¡La revolución de las invitaciones digitales!
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Crea invitaciones que{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  impactan
                </span>
                <motion.div
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -rotate-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>{' '}
              para tus eventos especiales
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Diseña, personaliza y comparte invitaciones únicas en minutos. 
              Desde cumpleaños infantiles hasta eventos corporativos, tenemos la plantilla perfecta para ti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group"
                onClick={handleGetStarted}
              >
                Comenzar gratis
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => router.push('/#templates')}
              >
                Ver plantillas
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Usuarios</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                  ¡Feliz Cumpleaños!
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500" />
                    <div>
                      <h3 className="text-xl font-bold">María celebra sus 30</h3>
                      <p className="text-muted-foreground">Sábado, 15 de Junio - 20:00</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-primary/5">
                      <div className="text-sm text-muted-foreground">Confirmados</div>
                      <div className="text-2xl font-bold text-primary">42</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/5">
                      <div className="text-sm text-muted-foreground">Invitados</div>
                      <div className="text-2xl font-bold text-secondary">60</div>
                    </div>
                  </div>
                  
                  <div className="h-48 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20" />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  <div>
                    <div className="font-semibold">Carlos confirmó</div>
                    <div className="text-xs text-muted-foreground">+2 invitados</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-48"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Días para el evento</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Desplázate</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}