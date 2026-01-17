'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useUserType } from '@/lib/hooks/useUserType';
import { 
  Sparkles, 
  Users, 
  Zap, 
  CheckCircle, 
  ChevronRight,
  Smartphone,
  Clock,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const { userType, setIntention, detectedIntention } = useUserType();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const personalFeatures = [
    { icon: Clock, text: 'Listo en 5 minutos' },
    { icon: Smartphone, text: 'Optimizado para móvil' },
    { icon: Shield, text: 'Seguro y privado' },
  ];

  const professionalFeatures = [
    { icon: Clock, text: 'Ahorra horas de trabajo' },
    { icon: Users, text: 'Gestión de clientes' },
    { icon: Shield, text: 'White-label disponible' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-pro-primary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pro-primary/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:gap-12">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-6 animate-in fade-in slide-in-from-top-4">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Plataforma Dual • Personal + Profesional
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-top-6">
                Crea invitaciones{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                    profesionales
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-pink-600 rounded-full" />
                </span>{' '}
                en minutos
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl animate-in fade-in slide-in-from-top-8">
                La única plataforma diseñada tanto para tus eventos personales 
                como para tu negocio profesional. Simple, potente y totalmente adaptable.
              </p>

              {/* User Type Selector */}
              <div className="mb-8 animate-in fade-in slide-in-from-top-10">
                <p className="text-gray-700 mb-4 font-medium">Selecciona tu perfil:</p>
                <div className="inline-flex flex-col sm:flex-row rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setIntention('personal')}
                    className={`px-6 py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                      detectedIntention === 'personal'
                        ? 'bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span>Para mi evento personal</span>
                  </button>
                  <button
                    onClick={() => setIntention('business')}
                    className={`px-6 py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                      detectedIntention === 'business'
                        ? 'bg-gradient-to-r from-pro-primary to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-pro-primary hover:bg-gray-50'
                    }`}
                  >
                    <Zap className="h-5 w-5" />
                    <span>Soy profesional / empresa</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-8 animate-in fade-in slide-in-from-top-12">
                {(detectedIntention === 'business' ? professionalFeatures : personalFeatures).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg"
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              {detectedIntention === 'personal' && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      variant="premium" 
                      className="flex-1 bg-gradient-to-r from-primary to-pink-600"
                      asChild
                    >
                      <Link href="/create">
                        Crear Invitación Gratis
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <Link href="/templates">
                        Ver Plantillas
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Sin registro • Sin tarjeta • Listo en 5 minutos
                  </p>
                </div>
              )}

              {detectedIntention === 'business' && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      variant="premium"
                      className="flex-1 bg-gradient-to-r from-pro-primary to-blue-600"
                      asChild
                    >
                      <Link href="/register">
                        Comenzar Prueba Pro
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <Link href="#pro-features">
                        Ver Demo
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    14 días gratis • Dashboard completo • Sin compromiso
                  </p>
                </div>
              )}

              {!detectedIntention && (
                <div className="text-center py-8">
                  <p className="text-gray-500 animate-pulse">
                    Selecciona un perfil para comenzar
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Visual Preview */}
            <div className="lg:w-1/2">
              <div className="relative max-w-lg mx-auto lg:mx-0">
                {/* Mockup Device */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl">
                  {/* Device Frame */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-pro-primary rounded-3xl blur opacity-30" />
                  
                  {/* Screen Content */}
                  <div className="relative bg-white rounded-2xl p-4 overflow-hidden">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-pink-600" />
                        <span className="font-bold text-gray-900">Invitaciones+</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="space-y-4">
                      {/* Event Card */}
                      <div className="bg-gradient-to-r from-primary/10 to-pink-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">Boda de María & Juan</span>
                          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                            En proceso
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          150 invitados • 85 confirmados
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-pink-600 rounded-full"
                            style={{ width: '57%' }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-gray-900">3</div>
                          <div className="text-xs text-gray-500">Activos</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-gray-900">24</div>
                          <div className="text-xs text-gray-500">Completados</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-gray-900">98%</div>
                          <div className="text-xs text-gray-500">Satisfacción</div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          Nueva Invitación
                        </button>
                        <button className="p-3 bg-gradient-to-r from-pro-primary to-blue-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          Ver Plantillas
                        </button>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-around">
                      {['Inicio', 'Crear', 'Plantillas', 'Perfil'].map((item) => (
                        <div key={item} className="text-center">
                          <div className="w-6 h-6 mx-auto mb-1 rounded-md bg-gray-200" />
                          <span className="text-xs text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-primary to-pink-600 rounded-2xl rotate-12 shadow-xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pro-primary to-blue-600 rounded-2xl -rotate-12 shadow-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 left-8 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center space-x-2 animate-bounce">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">+5K usuarios</span>
                </div>
                <div className="absolute -bottom-4 right-8 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center space-x-2 animate-bounce">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-gray-900">4.9★ rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}