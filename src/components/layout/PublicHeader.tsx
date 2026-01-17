'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useUserType } from '@/lib/hooks/useUserType';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';

export function PublicHeader() {
  const { userType, isAuthenticated, detectedIntention } = useUserType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 20);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    checkScroll();
    checkMobile();
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const navigationItems = [
    { label: 'Plantillas', href: '/templates' },
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-primary to-pro-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-pro-primary rounded-full animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Invitaciones+
                </span>
                <span className="text-xs text-gray-500 hidden lg:block">
                  Plataforma dual profesional
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Button 
                  variant="premium" 
                  size="sm" 
                  className="hidden sm:flex"
                  asChild
                >
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
              ) : userType === 'professional' ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:flex"
                    asChild
                  >
                    <Link href="/login">
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button 
                    variant="premium" 
                    size="sm"
                    className="bg-gradient-to-r from-pro-primary to-blue-600"
                    asChild
                  >
                    <Link href="/register">
                      <span className="hidden sm:inline">Registro</span>
                      <span className="sm:hidden">Pro</span>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:flex"
                    asChild
                  >
                    <Link href="/login">
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button 
                    variant="premium" 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-pink-600"
                    asChild
                  >
                    <Link href="/create">
                      <span className="hidden sm:inline">Crear Gratis</span>
                      <span className="sm:hidden">Crear</span>
                    </Link>
                  </Button>
                </>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top-4">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Selecciona tu perfil:
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          localStorage.setItem('user_intention', 'personal');
                          setIsMenuOpen(false);
                          window.location.reload();
                        }}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          detectedIntention === 'personal'
                            ? 'bg-gradient-to-r from-primary to-pink-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Personal
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem('user_intention', 'business');
                          setIsMenuOpen(false);
                          window.location.reload();
                        }}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          detectedIntention === 'business'
                            ? 'bg-gradient-to-r from-pro-primary to-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Profesional
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer para header fijo */}
      <div className="h-16 lg:h-20" />
    </>
  );
}