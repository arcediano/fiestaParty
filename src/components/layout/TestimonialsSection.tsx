'use client';

import { useState, useEffect } from 'react';
import { useUserType } from '@/lib/hooks/useUserType';
import { 
  Star, Quote, Play, Pause, ChevronLeft, ChevronRight,
  Award, TrendingUp, Users, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  date: string;
  imageColor: string;
  stats?: { label: string; value: string }[];
};

const personalTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    role: 'Novia',
    content: 'Creé mi invitación de boda en 10 minutos desde mi móvil. Mis invitados no podían creer que fuera digital. ¡Todos me preguntaron cómo lo hice! La experiencia fue tan fácil que hasta mi abuela pudo confirmar su asistencia sin problemas.',
    rating: 5,
    date: 'Hace 2 semanas',
    imageColor: 'from-primary to-pink-600',
    stats: [
      { label: 'Invitados', value: '150' },
      { label: 'Confirmados', value: '98%' },
      { label: 'Ahorro', value: '$500' },
    ],
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    role: 'Padre del festejado',
    content: 'Para el cumpleaños de mi hijo, necesitaba algo rápido y sin complicaciones. En 5 minutos tenía una invitación profesional. Mis amigos pensaron que contraté a un diseñador. ¡Lo mejor? Totalmente gratis para eventos personales.',
    rating: 5,
    date: 'Hace 1 mes',
    imageColor: 'from-blue-500 to-cyan-600',
    stats: [
      { label: 'Invitados', value: '80' },
      { label: 'Vistas', value: '320' },
      { label: 'Compartido', value: '45x' },
    ],
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Organizadora Comunitaria',
    content: 'Nuestra reunión familiar anual fue un éxito gracias a las invitaciones digitales. Todos confirmaron rápido desde sus móviles y fue muy fácil de usar, incluso para los menos técnicos. El sistema de RSVP automático nos ahorró horas de trabajo.',
    rating: 5,
    date: 'Hace 3 meses',
    imageColor: 'from-green-500 to-emerald-600',
    stats: [
      { label: 'Familias', value: '40' },
      { label: 'Países', value: '5' },
      { label: 'Edades', value: '18-85' },
    ],
  },
];

const professionalTestimonials: Testimonial[] = [
  {
    id: 4,
    name: 'Laura Fernández',
    role: 'Wedding Planner',
    company: 'Bodas Perfectas S.L.',
    content: 'Gestiono 20+ bodas al mes y esta herramienta me ahorra horas de trabajo cada día. Mis clientes están encantados con las invitaciones personalizadas y el sistema de seguimiento me permite ofrecer un servicio premium sin aumentar mis costes.',
    rating: 5,
    date: 'Hace 6 meses',
    imageColor: 'from-pro-primary to-blue-600',
    stats: [
      { label: 'Clientes/mes', value: '25+' },
      { label: 'Ahorro tiempo', value: '15h/sem' },
      { label: 'Crecimiento', value: '+200%' },
    ],
  },
  {
    id: 5,
    name: 'David López',
    role: 'CEO',
    company: 'Eventos Premium',
    content: 'La gestión de clientes integrada ha transformado mi negocio. Puedo seguir cada evento, cliente y presupuesto desde un solo lugar. El white-label me permite ofrecer la plataforma como mi propio producto, aumentando mi valor percibido.',
    rating: 5,
    date: 'Hace 8 meses',
    imageColor: 'from-indigo-500 to-purple-600',
    stats: [
      { label: 'Facturación', value: '€85K/mes' },
      { label: 'Equipo', value: '12' },
      { label: 'Satisfacción', value: '99%' },
    ],
  },
  {
    id: 6,
    name: 'Miguel Torres',
    role: 'Fundador',
    company: 'Wedding Solutions',
    content: 'La integración white-label me permite ofrecer la plataforma como mi propio producto a mis clientes. Ha sido un game-changer para mi negocio, permitiéndome escalar sin aumentar mi equipo. Los analytics me ayudan a optimizar cada evento.',
    rating: 5,
    date: 'Hace 1 año',
    imageColor: 'from-gray-700 to-gray-900',
    stats: [
      { label: 'Empresas', value: '50+' },
      { label: 'Países', value: '15' },
      { label: 'Retención', value: '95%' },
    ],
  },
];

export function TestimonialsSection() {
  const { detectedIntention } = useUserType();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-play testimonials
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 8000);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, [isPlaying]);

  const testimonials = detectedIntention === 'business' 
    ? professionalTestimonials 
    : personalTestimonials;

  const currentTestimonial = testimonials[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden" id="testimonials">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-6">
            <Award className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">
              {detectedIntention === 'business' 
                ? 'Casos de Éxito Empresarial' 
                : 'Historias de Usuarios Reales'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              {detectedIntention === 'business' ? 'nuestros clientes profesionales' : 'nuestros usuarios'}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            {detectedIntention === 'business'
              ? 'Empresas y profesionales que han transformado sus negocios con nuestra plataforma.'
              : 'Personas reales que han hecho sus eventos más especiales y memorables.'}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border-2 border-gray-200/50 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Testimonial Content */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTestimonial.imageColor} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-600">
                        {currentTestimonial.role}
                        {currentTestimonial.company && (
                          <span className="text-gray-500"> • {currentTestimonial.company}</span>
                        )}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4 text-amber-400 fill-current" 
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {currentTestimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="text-primary/20">
                    <Quote className="h-12 w-12" />
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <div className="relative mb-8">
                  <div className="absolute -top-4 -left-4 text-primary/10">
                    <Quote className="h-8 w-8" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed pl-4">
                    "{currentTestimonial.content}"
                  </p>
                </div>
                
                {/* Stats */}
                {currentTestimonial.stats && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {currentTestimonial.stats.map((stat, index) => (
                      <div 
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-4 text-center"
                      >
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    variant="premium"
                    className={`flex-1 ${
                      detectedIntention === 'business'
                        ? 'bg-gradient-to-r from-pro-primary to-blue-600'
                        : 'bg-gradient-to-r from-primary to-pink-600'
                    }`}
                    asChild
                  >
                    <Link href={detectedIntention === 'business' ? '/register' : '/create'}>
                      {detectedIntention === 'business' ? 'Comenzar como ellos' : 'Crear mi invitación'}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href="#">
                      Ver más testimonios
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right Column - Visual Preview */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 lg:p-16">
                <div className="relative h-full rounded-2xl overflow-hidden border-4 border-white/10">
                  {/* Stats Visualization */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-pro-primary/10" />
                  
                  <div className="relative p-6 h-full flex flex-col justify-between">
                    {/* Success Badge */}
                    <div className="inline-flex items-center self-start px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <TrendingUp className="h-4 w-4 text-white mr-2" />
                      <span className="text-sm font-medium text-white">
                        Caso de éxito
                      </span>
                    </div>
                    
                    {/* Impact Visualization */}
                    <div className="space-y-6">
                      <div>
                        <div className="text-white/80 text-sm mb-2">Impacto positivo</div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-pink-600 rounded-full"
                            style={{ width: '92%' }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-white/80 text-sm mb-2">Satisfacción del cliente</div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pro-primary to-blue-600 rounded-full"
                            style={{ width: '98%' }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-white/80 text-sm mb-2">Eficiencia mejorada</div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                            style={{ width: '85%' }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Icons */}
                    <div className="flex justify-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-pink-600 flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pro-primary to-blue-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={goToPrev}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index
                      ? 'bg-gradient-to-r from-primary to-pink-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-gray-700" />
              ) : (
                <Play className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Confían en nosotros
            </h3>
            <p className="text-gray-600">
              {detectedIntention === 'business'
                ? 'Métricas que demuestran nuestro impacto en la industria'
                : 'Números que hablan por sí solos'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50K+
              </div>
              <div className="text-sm text-gray-600">
                Invitaciones creadas
              </div>
              <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-primary to-pink-600 rounded-full" />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                4.9
                <Star className="inline h-5 w-5 text-amber-400 fill-current ml-1" />
              </div>
              <div className="text-sm text-gray-600">
                Rating promedio
              </div>
              <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-pro-primary to-blue-600 rounded-full" />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {detectedIntention === 'business' ? '200+' : '120+'}
              </div>
              <div className="text-sm text-gray-600">
                {detectedIntention === 'business' ? 'Empresas clientes' : 'Países'}
              </div>
              <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                98%
              </div>
              <div className="text-sm text-gray-600">
                Tasa de satisfacción
              </div>
              <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}