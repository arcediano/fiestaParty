'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useUserType } from '@/lib/hooks/useUserType';
import Link from 'next/link';
import { 
  ArrowRight, Sparkles, CheckCircle, Zap, 
  Shield, Users, Globe, Star, Target,
  MessageSquare, Calendar, Rocket
} from 'lucide-react';

export function CTASection() {
  const { detectedIntention } = useUserType();
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const features = detectedIntention === 'business' 
    ? [
        { icon: Target, text: 'Dashboard empresarial completo' },
        { icon: Users, text: 'Gestión de equipo y clientes' },
        { icon: Globe, text: 'White-label y personalización' },
        { icon: Zap, text: 'Analytics avanzados en tiempo real' },
      ]
    : [
        { icon: Calendar, text: 'Crea en menos de 5 minutos' },
        { icon: Shield, text: '100% gratis para eventos personales' },
        { icon: Sparkles, text: 'Plantillas profesionales' },
        { icon: MessageSquare, text: 'Comparte en cualquier plataforma' },
      ];

  const stats = detectedIntention === 'business'
    ? [
        { value: '98%', label: 'Satisfacción cliente' },
        { value: '15h', label: 'Ahorro semanal' },
        { value: '+200%', label: 'Crecimiento promedio' },
        { value: '24/7', label: 'Soporte' },
      ]
    : [
        { value: '4.9★', label: 'Rating' },
        { value: '50K+', label: 'Invitaciones' },
        { value: '120+', label: 'Países' },
        { value: '0$', label: 'Para empezar' },
      ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-pro-primary/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-primary/10 to-pink-100 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pro-primary/10 to-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border-2 border-gray-200/50 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Content */}
              <div className="p-8 md:p-12 lg:p-16">
                {/* Header */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-pink-100 border border-primary/20 mb-6">
                  <Rocket className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">
                    {detectedIntention === 'business' 
                      ? 'Oferta de Lanzamiento Empresarial' 
                      : 'Comienza Gratis Hoy'}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {detectedIntention === 'business'
                    ? 'Transforma tu negocio de eventos'
                    : 'Haz tu evento inolvidable'}
                </h2>

                <p className="text-lg text-gray-600 mb-8">
                  {detectedIntention === 'business'
                    ? 'Únete a cientos de wedding planners y empresas que ya están creciendo con nuestra plataforma profesional. Prueba gratis durante 14 días.'
                    : 'No necesitas ser diseñador para crear invitaciones hermosas. Comienza gratis ahora mismo, sin registro ni tarjeta de crédito.'}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-primary/10 to-pink-100 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-3 bg-white border border-gray-200 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="premium"
                    className={`flex-1 ${
                      detectedIntention === 'business'
                        ? 'bg-gradient-to-r from-pro-primary to-blue-600 hover:shadow-xl'
                        : 'bg-gradient-to-r from-primary to-pink-600 hover:shadow-xl'
                    }`}
                    asChild
                  >
                    <Link href={detectedIntention === 'business' ? '/register' : '/create'}>
                      {detectedIntention === 'business' ? 'Comenzar Prueba Gratis' : 'Crear Invitación Gratis'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href="/demo">
                      {detectedIntention === 'business' ? 'Solicitar Demo' : 'Ver Ejemplos'}
                    </Link>
                  </Button>
                </div>

                {/* Guarantee */}
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    {detectedIntention === 'business'
                      ? 'Garantía de satisfacción de 30 días • Sin tarjeta requerida'
                      : 'Sin registro • Sin tarjeta de crédito • 100% seguro'}
                  </span>
                </div>
              </div>

              {/* Right Column - Visual & Countdown */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 lg:p-16">
                <div className="relative h-full rounded-2xl overflow-hidden border-4 border-white/10">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[length:40px_40px]" />
                  </div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center p-6">
                    {/* Countdown Timer */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                        <Zap className="h-4 w-4 text-white mr-2" />
                        <span className="text-sm font-medium text-white">
                          Oferta especial por tiempo limitado
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Termina en:
                      </h3>
                      
                      <div className="flex justify-center space-x-3 md:space-x-4">
                        {[
                          { value: countdown.hours, label: 'Horas' },
                          { value: countdown.minutes, label: 'Minutos' },
                          { value: countdown.seconds, label: 'Segundos' },
                        ].map((time, index) => (
                          <div key={index} className="text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 border border-white/20">
                              <span className="text-2xl md:text-3xl font-bold text-white">
                                {time.value.toString().padStart(2, '0')}
                              </span>
                            </div>
                            <span className="text-xs text-white/70">{time.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Offer */}
<div className="bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-2xl p-6 border border-white/20 backdrop-blur-sm w-full max-w-md">
  <div className="flex items-center mb-4">
    <Star className="h-5 w-5 text-yellow-400 mr-2" />
    <h4 className="text-lg font-bold text-white">
      {detectedIntention === 'business'
        ? 'Oferta exclusiva para empresas:'
        : 'Bonus especial por registro rápido:'}
    </h4>
  </div>
  
  <ul className="space-y-2 mb-6">
    {(detectedIntention === 'business'
      ? [
          '3 meses gratis en plan Pro',
          'Onboarding personalizado 1:1',
          'Soporte premium prioritario',
          'Certificado de partner oficial',
        ]
      : [
          'Plantillas premium gratis por 1 año',
          'Soporte por chat 24/7',
          'Guía profesional de eventos',
          'Acceso a comunidad exclusiva',
        ]
    ).map((item, index) => (
      <li key={index} className="flex items-center text-white/90">
        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
        <span className="text-sm">{item}</span>
      </li>
    ))}
  </ul>
  
  <Button
    size="lg"
    variant="premium"
    className="w-full bg-gradient-to-r from-white to-white/90 text-gray-900 hover:shadow-xl"
    asChild
  >
    <Link href={detectedIntention === 'business' ? '/register?special=true' : '/create?bonus=true'}>
      Obtener oferta especial
      <Sparkles className="ml-2 h-4 w-4" />
    </Link>
  </Button>
</div>

                    {/* Trust Indicators */}
                    <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
                      <div className="text-center">
                        <div className="text-xl font-bold text-white mb-1">500+</div>
                        <div className="text-xs text-white/70">Empresas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-white mb-1">4.9★</div>
                        <div className="text-xs text-white/70">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-white mb-1">99.9%</div>
                        <div className="text-xs text-white/70">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary to-pink-600 rounded-3xl rotate-12 shadow-xl opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-pro-primary to-blue-600 rounded-3xl -rotate-12 shadow-xl opacity-20" />
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Confían en nosotros empresas líderes:</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-60">
              <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                WEDDINGMAG
              </div>
              <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                EVENTPRO
              </div>
              <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                CELEBRATE
              </div>
              <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                PARTY+
              </div>
              {detectedIntention === 'business' && (
                <>
                  <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                    BIZTECH
                  </div>
                  <div className="text-gray-400 font-bold text-lg tracking-wider bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-lg">
                    FORBES
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}