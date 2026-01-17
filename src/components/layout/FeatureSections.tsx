'use client';

import { useState, useEffect } from 'react';
import { useUserType } from '@/lib/hooks/useUserType';
import { 
  Palette, Zap, Users, BarChart, Smartphone, Shield,
  Globe, Download, Clock, Bell, Eye, Code,
  ChevronRight, Sparkles, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const personalFeatures = [
  {
    icon: Palette,
    title: 'Diseño Intuitivo',
    description: 'Editor visual que cualquiera puede usar sin experiencia previa en diseño.',
    color: 'from-primary to-pink-600',
    stats: '95% de usuarios lo dominan en 5 min',
  },
  {
    icon: Zap,
    title: 'Rápido y Eficiente',
    description: 'Crea invitaciones completas en menos tiempo del que tardas en preparar un café.',
    color: 'from-amber-500 to-orange-500',
    stats: '3.2 min promedio por invitación',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Diseñado específicamente para móvil. Tus invitados verán una experiencia perfecta en cualquier dispositivo.',
    color: 'from-green-500 to-emerald-600',
    stats: '100% responsive automático',
  },
  {
    icon: Shield,
    title: 'Privacidad Total',
    description: 'Controla exactamente quién ve tu evento. Sin publicidad, sin seguimiento no deseado.',
    color: 'from-purple-500 to-violet-600',
    stats: 'Cifrado de extremo a extremo',
  },
  {
    icon: Globe,
    title: 'Comparte en Cualquier Lugar',
    description: 'Un enlace único que funciona en WhatsApp, email, redes sociales y mensajes de texto.',
    color: 'from-blue-500 to-cyan-600',
    stats: '15+ plataformas compatibles',
  },
  {
    icon: Download,
    title: 'Descarga Ilimitada',
    description: 'Obtén copias en PDF, imágenes de alta resolución o comparte online sin límites.',
    color: 'from-rose-500 to-red-600',
    stats: 'Formatos HD y para impresión',
  },
];

const professionalFeatures = [
  {
    icon: Users,
    title: 'Gestión de Clientes',
    description: 'Sistema CRM integrado para seguir cada cliente, evento y presupuesto en un solo lugar.',
    color: 'from-pro-primary to-blue-600',
    stats: '+200% eficiencia en gestión',
  },
  {
    icon: BarChart,
    title: 'Analytics Avanzados',
    description: 'Dashboard completo con métricas de conversión, confirmaciones y comportamiento de invitados.',
    color: 'from-indigo-500 to-purple-600',
    stats: '15+ métricas en tiempo real',
  },
  {
    icon: Code,
    title: 'White-label',
    description: 'Presenta nuestra plataforma como tu propio producto. Tu marca, tu experiencia.',
    color: 'from-gray-700 to-gray-900',
    stats: 'Personalización 100%',
  },
  {
    icon: Clock,
    title: 'Automatización',
    description: 'Recordatorios automáticos, confirmaciones programadas y flujos de trabajo inteligentes.',
    color: 'from-cyan-500 to-teal-600',
    stats: 'Ahorra 10h/semana',
  },
  {
    icon: Bell,
    title: 'Notificaciones Inteligentes',
    description: 'Alertas en tiempo real cuando los invitados confirman, ven o comparten tu invitación.',
    color: 'from-orange-500 to-amber-600',
    stats: 'Notificaciones push y email',
  },
  {
    icon: Eye,
    title: 'Vista Previa Avanzada',
    description: 'Simula cómo verán la invitación tus clientes antes de enviarla. Edición en tiempo real.',
    color: 'from-lime-500 to-green-600',
    stats: 'Previsualización multi-dispositivo',
  },
];

export function FeatureSections() {
  const { detectedIntention } = useUserType();
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-rotate features en desktop
    if (!isMobile && detectedIntention) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 6);
      }, 5000);
      return () => clearInterval(interval);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, detectedIntention]);

  const features = detectedIntention === 'business' 
    ? professionalFeatures 
    : personalFeatures;

  const activeFeatureData = features[activeFeature];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden" id="features">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pro-primary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">
              {detectedIntention === 'business' 
                ? 'Herramientas Empresariales' 
                : 'Características Destacadas'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Diseñado para{' '}
            <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              {detectedIntention === 'business' ? 'crecer tu negocio' : 'simplificar tu vida'}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            {detectedIntention === 'business'
              ? 'Todas las herramientas que necesitas para escalar tu negocio de eventos en una sola plataforma.'
              : 'Todo lo que necesitas para crear invitaciones perfectas, sin complicaciones ni conocimientos técnicos.'}
          </p>
        </div>

        {/* Features Grid - Mobile & Desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Feature Cards Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                    activeFeature === index
                      ? 'border-primary/30 bg-gradient-to-br from-white to-primary/5 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary/20 hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => !isMobile && setActiveFeature(index)}
                >
                  {/* Feature Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-md`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Feature Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature.stats}</span>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeFeature === index && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-primary to-pink-600 rounded-full animate-ping" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Bottom Row Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.slice(4).map((feature, index) => (
                <div
                  key={index + 4}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                    activeFeature === index + 4
                      ? 'border-primary/30 bg-gradient-to-br from-white to-primary/5 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary/20 hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index + 4)}
                  onMouseEnter={() => !isMobile && setActiveFeature(index + 4)}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-md`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature.stats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Active Feature Preview */}
          <div className="relative">
            <div className="sticky top-24 lg:top-32">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Device Mockup */}
                <div className="relative bg-white rounded-2xl overflow-hidden border-8 border-gray-900">
                  {/* Device Top Bar */}
                  <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    </div>
                    <div className="text-xs text-white font-medium">
                      {detectedIntention === 'business' ? 'Dashboard Pro' : 'Editor'}
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                  </div>
                  
                  {/* Active Feature Preview */}
                  <div className="p-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${activeFeatureData.color} mb-6 shadow-lg`}>
                      <activeFeatureData.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {activeFeatureData.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {activeFeatureData.description}
                    </p>
                    
                    {/* Stats Visualization */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Eficiencia</span>
                          <span className="font-medium text-gray-900">
                            {activeFeatureData.stats.includes('%') 
                              ? activeFeatureData.stats 
                              : '+85%'}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-pink-600 rounded-full transition-all duration-500"
                            style={{ width: '85%' }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Satisfacción</span>
                          <span className="font-medium text-gray-900">98%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pro-primary to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: '98%' }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-8">
                      <Button
                        variant="premium"
                        size="lg"
                        className={`w-full ${
                          detectedIntention === 'business'
                            ? 'bg-gradient-to-r from-pro-primary to-blue-600'
                            : 'bg-gradient-to-r from-primary to-pink-600'
                        }`}
                        asChild
                      >
                        <Link href={detectedIntention === 'business' ? '/register' : '/create'}>
                          Probar {activeFeatureData.title.toLowerCase()}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary to-pink-600 rounded-3xl rotate-12 shadow-xl opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-pro-primary to-blue-600 rounded-3xl -rotate-12 shadow-xl opacity-20" />
              </div>
              
              {/* Feature Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeFeature === index
                        ? 'bg-gradient-to-r from-primary to-pink-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir a característica ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block max-w-2xl">
            <p className="text-gray-600 mb-6">
              {detectedIntention === 'business'
                ? '¿Listo para transformar tu negocio de eventos?'
                : '¿No encuentras lo que necesitas?'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant={detectedIntention === 'business' ? 'premium' : 'secondary'}
                className={`${
                  detectedIntention === 'business'
                    ? 'bg-gradient-to-r from-pro-primary to-blue-600'
                    : 'bg-gradient-to-r from-primary to-pink-600'
                } text-white`}
                asChild
              >
                <Link href={detectedIntention === 'business' ? '/register' : '/create'}>
                  {detectedIntention === 'business' ? 'Comenzar Prueba Pro' : 'Crear Invitación Gratis'}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/contact">
                  Contactar con ventas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}