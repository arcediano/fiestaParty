'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Palette, 
  Zap, 
  Users, 
  CreditCard,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useUserType } from '@/lib/hooks/useUserType';

const mobileNavItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Palette, label: 'Plantillas', href: '/templates' },
  { icon: Zap, label: 'Características', href: '#features' },
  { icon: Users, label: 'Testimonios', href: '#testimonials' },
  { icon: CreditCard, label: 'Precios', href: '#pricing' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const { detectedIntention } = useUserType();

  useEffect(() => {
    const handleRouteChange = () => {
      setActiveItem(window.location.pathname);
    };
    
    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const getThemeColor = () => {
    return detectedIntention === 'business' 
      ? 'from-pro-primary to-blue-600' 
      : 'from-primary to-pink-600';
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-3">
          {mobileNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all
                ${activeItem === item.href
                  ? `text-white bg-gradient-to-r ${getThemeColor()} shadow-lg`
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }
              `}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
          
          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex flex-col items-center justify-center p-2 rounded-xl transition-all
              ${isOpen
                ? `text-white bg-gradient-to-r ${getThemeColor()} shadow-lg`
                : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }
            `}
          >
            {isOpen ? (
              <X className="w-5 h-5 mb-1" />
            ) : (
              <Menu className="w-5 h-5 mb-1" />
            )}
            <span className="text-xs font-medium">Más</span>
          </button>
        </div>
      </nav>

      {/* Expanded Menu */}
      {isOpen && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-bottom-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getThemeColor()} flex items-center justify-center`}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">Acciones rápidas</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/create"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-pink-100 border border-primary/20 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <Palette className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-900">Crear Invitación</span>
                <span className="text-xs text-gray-500">Gratis y rápido</span>
              </Link>
              
              <Link
                href="/templates"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-gradient-to-r from-pro-primary/10 to-blue-100 border border-pro-primary/20 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <Sparkles className="w-6 h-6 text-pro-primary mb-2" />
                <span className="text-sm font-medium text-gray-900">Ver Plantillas</span>
                <span className="text-xs text-gray-500">100+ diseños</span>
              </Link>
              
              <Link
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <CreditCard className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Planes</span>
                <span className="text-xs text-gray-500">Ver precios</span>
              </Link>
              
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-gradient-to-r from-purple-100 to-violet-100 border border-purple-200 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Blog</span>
                <span className="text-xs text-gray-500">Consejos y guías</span>
              </Link>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  localStorage.setItem('user_intention', 
                    detectedIntention === 'business' ? 'personal' : 'business'
                  );
                  window.location.reload();
                }}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  detectedIntention === 'business'
                    ? 'bg-gradient-to-r from-primary to-pink-600 text-white'
                    : 'bg-gradient-to-r from-pro-primary to-blue-600 text-white'
                }`}
              >
                Cambiar a modo {detectedIntention === 'business' ? 'Personal' : 'Profesional'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer para bottom navigation */}
      <div className="lg:hidden h-16" />
    </>
  );
}