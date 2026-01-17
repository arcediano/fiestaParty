// src/app/(public)/page.tsx - USO SIMPLIFICADO
'use client';

import { useEffect, useState } from 'react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { HeroSection } from '@/components/layout/HeroSection';
import { FeatureSections } from '@/components/layout/FeatureSections';
import { TestimonialsSection } from '@/components/layout/TestimonialsSection';
import { PricingComparison } from '@/components/shared/PricingComparison';
import { CTASection } from '@/components/layout/CTASection';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { FloatingActionMenu } from '@/components/shared/FloatingActionMenu';
import { Sparkles, Share2, MessageCircle, Rocket, Calendar, Users, Heart } from 'lucide-react';
import '@/styles/landing.css';

export default function DualLandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Items personalizados
  const fabItems = [
    {
      id: 'create',
      label: 'Crear Invitación',
      icon: <Sparkles className="h-5 w-5" />,
      onClick: () => {
        window.location.href = '/dashboard/create';
      },
      variant: 'premium' as const,
    },
    {
      id: 'share',
      label: 'Compartir',
      icon: <Share2 className="h-5 w-5" />,
      onClick: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Fiesta Party',
            text: '¡Descubre esta plataforma para crear invitaciones!',
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('¡Enlace copiado!');
        }
      },
      variant: 'info' as const,
    },
    {
      id: 'guests',
      label: 'Invitados',
      icon: <Users className="h-5 w-5" />,
      onClick: () => {
        console.log('Gestionar invitados');
      },
      variant: 'success' as const,
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: <Calendar className="h-5 w-5" />,
      onClick: () => {
        console.log('Abrir calendario');
      },
      variant: 'warning' as const,
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: <Heart className="h-5 w-5" />,
      onClick: () => {
        console.log('Ver favoritos');
      },
      variant: 'destructive' as const,
    },
    {
      id: 'scroll-top',
      label: 'Volver Arriba',
      icon: <Rocket className="h-5 w-5" />,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      variant: 'primary' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PublicHeader />
      
      {isMobile && <MobileNavigation />}
      
      <main className="relative">
        <HeroSection />
        <FeatureSections />
        <TestimonialsSection />
        <PricingComparison />
        <CTASection />
      </main>

      <PublicFooter />
      
      {/* Floating Action Menu */}
      {scrollPosition > 300 && (
        <FloatingActionMenu 
          items={fabItems}
          isOpen={isFabOpen}
          onMenuToggle={setIsFabOpen}
          isMobile={isMobile}
          direction={isMobile ? "up" : "left"}
          labelPosition={isMobile ? "left" : "right"}
          showLabels={!isMobile}
          position={isMobile ? "center-bottom" : "bottom-right"}
          backdrop={true}
          className="transition-all duration-500"
        />
      )}
      
      {/* Efectos de fondo */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}