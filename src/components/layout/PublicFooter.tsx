'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Facebook, Twitter, Instagram, Heart, 
  Sparkles, Mail, MessageSquare, Globe,
  ChevronRight, CheckCircle, Zap,
  ArrowUp, Linkedin, Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUserType } from '@/lib/hooks/useUserType';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();
  const { detectedIntention } = useUserType();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la lógica de suscripción real
      console.log('Email suscrito:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Plantillas', href: '/templates' },
    { label: 'Casos de Uso', href: '/use-cases' },
    { label: 'API', href: '/api' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Guías', href: '/guides' },
    { label: 'Centro de Ayuda', href: '/help' },
    { label: 'Comunidad', href: '/community' },
    { label: 'Documentación', href: '/docs' },
  ];

  const companyLinks = [
    { label: 'Sobre Nosotros', href: '/about' },
    { label: 'Carreras', href: '/careers' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Prensa', href: '/press' },
    { label: 'Socios', href: '/partners' },
  ];

  const legalLinks = [
    { label: 'Privacidad', href: '/privacy' },
    { label: 'Términos', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Seguridad', href: '/security' },
    { label: 'Aviso Legal', href: '/legal' },
  ];

  return (
    <>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/5 to-pro-primary/5 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column */}
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-pink-100 border border-primary/20 mb-4">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">
                      Mantente actualizado
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Suscríbete a nuestro newsletter
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    Recibe consejos profesionales, nuevas plantillas y ofertas exclusivas 
                    directamente en tu email. Sin spam, solo contenido de valor.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Consejos profesionales semanales</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Nuevas plantillas y diseños</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Ofertas exclusivas para suscriptores</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Form */}
                <div>
                  {isSubscribed ? (
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        ¡Gracias por suscribirte!
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Te hemos enviado un email de confirmación. 
                        Revisa tu bandeja de entrada.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Tu email profesional
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tunombre@empresa.com"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="consent"
                          className="mt-1 rounded border-gray-300 text-primary focus:ring-primary flex-shrink-0"
                          required
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600">
                          Acepto recibir emails con contenido relevante. Puedo darme de baja en cualquier momento.
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        variant="premium"
                        size="lg"
                        className={`w-full ${
                          detectedIntention === 'business'
                            ? 'bg-gradient-to-r from-pro-primary to-blue-600'
                            : 'bg-gradient-to-r from-primary to-pink-600'
                        }`}
                      >
                        Suscribirme ahora
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        Protegemos tu privacidad. Nunca compartiremos tu información.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Solución óptima */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Flexbox principal para estructura responsive */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            
            {/* Brand Section - 40% ancho en desktop */}
            <div className="lg:w-2/5 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-pink-600 rounded-full animate-ping" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Invitaciones<span className="text-primary">+</span>
                  </h2>
                  <p className="text-sm text-gray-400">
                    Plataforma Dual Profesional
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                La plataforma líder para creación de invitaciones digitales. 
                Diseñada tanto para eventos personales memorables como para 
                negocios profesionales que buscan escalar.
              </p>
              
              {/* Social Media - Versión responsive */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <a 
                    href="#" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
                
                {/* App Store Badges - Solo en desktop */}
                <div className="hidden lg:flex space-x-3">
                  <a href="#" className="block">
                    <div className="bg-black rounded-xl px-3 py-2 flex items-center space-x-2 hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <div>
                        <div className="text-[10px]">Download on the</div>
                        <div className="font-bold text-xs">App Store</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="bg-black rounded-xl px-3 py-2 flex items-center space-x-2 hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 20.5v-17c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v17c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1zM8 13.5h8v1H8v-1z"/>
                      </svg>
                      <div>
                        <div className="text-[10px]">GET IT ON</div>
                        <div className="font-bold text-xs">Google Play</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Columns - 60% ancho en desktop */}
            <div className="lg:w-3/5">
              {/* Grid interno para las columnas de navegación */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                
                {/* Product Links */}
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm md:text-base">Producto</span>
                  </h3>
                  <ul className="space-y-3">
                    {productLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                        >
                          <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources Links */}
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <MessageSquare className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm md:text-base">Recursos</span>
                  </h3>
                  <ul className="space-y-3">
                    {resourceLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                        >
                          <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Globe className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm md:text-base">Empresa</span>
                  </h3>
                  <ul className="space-y-3">
                    {companyLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                        >
                          <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <h3 className="font-bold text-lg mb-4">
                    <span className="text-sm md:text-base">Legal</span>
                  </h3>
                  <ul className="space-y-3">
                    {legalLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="my-8 border-t border-gray-700" />

          {/* Bottom Bar - Versión optimizada para todos los dispositivos */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left order-2 md:order-1">
              <p className="flex flex-col md:flex-row items-center gap-2">
                <span>© {currentYear} Invitaciones+. Todos los derechos reservados.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center">
                  Hecho con <Heart className="inline h-3 w-3 text-primary mx-1" /> para eventos inolvidables.
                </span>
              </p>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400 order-1 md:order-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="whitespace-nowrap">Sistema activo 24/7</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="hidden lg:block">ISO 27001 Certified</div>
              <div className="hidden md:block">•</div>
              <div>
                <a 
                  href="mailto:soporte@invitacionesplus.com" 
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  soporte@invitacionesplus.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button - Solo desktop */}
        {!isMobile && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary to-pink-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        )}
      </footer>
    </>
  );
}