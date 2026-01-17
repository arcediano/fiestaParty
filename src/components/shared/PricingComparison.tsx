'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { CASUAL_PRICING, PROFESSIONAL_PLANS } from '@/lib/constants/plans';
import { useUserType } from '@/lib/hooks/useUserType';
import { 
  Check, X, Star, Zap, Shield, Users, 
  Globe, BarChart, CreditCard, ChevronRight,
  Sparkles, HelpCircle, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export function PricingComparison() {
  const { detectedIntention, setIntention } = useUserType();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIntentionChange = (intention: 'personal' | 'business') => {
    setIntention(intention);
    // Recarga suave sin refrescar toda la página
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const annualDiscount = 0.20; // 20% de descuento anual

  const getAnnualPrice = (monthlyPrice: string) => {
    const price = parseFloat(monthlyPrice.replace('$', ''));
    const annualPrice = price * 12 * (1 - annualDiscount);
    return `$${annualPrice.toFixed(2)}`;
  };

  const professionalPlansWithAnnual = PROFESSIONAL_PLANS.map(plan => ({
    ...plan,
    annualPrice: getAnnualPrice(plan.price),
    annualSavings: `Ahorra ${(annualDiscount * 100)}%`,
  }));

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden" id="pricing">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-pro-primary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-6">
            <CreditCard className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Precios Transparentes • Sin Sorpresas
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Planes para{' '}
            <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              cada necesidad
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Elige el plan perfecto para ti. Sin contratos, sin compromisos, 
            solo el poder que necesitas.
          </p>

          {/* User Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => handleIntentionChange('personal')}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  detectedIntention !== 'business'
                    ? 'bg-gradient-to-r from-primary to-pink-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Personal</span>
              </button>
              <button
                onClick={() => handleIntentionChange('business')}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  detectedIntention === 'business'
                    ? 'bg-gradient-to-r from-pro-primary to-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-pro-primary hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Profesional</span>
              </button>
            </div>
          </div>

          {/* Annual Toggle - Solo para profesionales */}
          {detectedIntention === 'business' && (
            <div className="flex items-center justify-center space-x-3 mb-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Mensual
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 rounded-full bg-gradient-to-r from-primary to-pink-600 transition-all"
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  isAnnual ? 'transform translate-x-8' : 'transform translate-x-1'
                }`} />
              </button>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Anual
                </span>
                <div className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                  <span className="text-xs font-medium text-green-700">
                    -20%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Plans */}
        {detectedIntention !== 'business' ? (
          /* Personal Pricing */
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(CASUAL_PRICING).map(([key, plan]) => (
                <div
                  key={key}
                  className={`relative rounded-3xl border-2 p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] ${
                    key === 'premium'
                      ? 'border-primary/30 bg-gradient-to-b from-white to-primary/5 shadow-xl'
                      : 'border-gray-200 bg-white hover:border-primary/20 hover:shadow-lg'
                  }`}
                >
                  {/* Popular Badge */}
                  {key === 'premium' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1.5 bg-gradient-to-r from-primary to-pink-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Más Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      key === 'free' ? 'bg-gray-100' :
                      key === 'premium' ? 'bg-gradient-to-r from-primary to-pink-600' :
                      'bg-gradient-to-r from-pro-primary to-blue-600'
                    }`}>
                      {key === 'free' && <Shield className="h-6 w-6 text-gray-700" />}
                      {key === 'premium' && <Star className="h-6 w-6 text-white" />}
                      {key === 'credits' && <Zap className="h-6 w-6 text-white" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center mb-1">
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    
                    {key === 'credits' && (
                      <div className="text-sm text-gray-500">
                        ≈ ${(9.99 / 3).toFixed(2)} por invitación
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className={`w-full ${
                      key === 'premium' 
                        ? 'bg-gradient-to-r from-primary to-pink-600 hover:shadow-lg' 
                        : ''
                    }`}
                    asChild
                  >
                    {key === 'free' ? (
                      <Link href="/create">
                        {plan.cta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : key === 'premium' ? (
                      <Link href="/create?premium=true">
                        {plan.cta}
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <Link href="/pricing/credits">
                        {plan.cta}
                        <Zap className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </Button>

                  {/* Extra Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      {key === 'free' && (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          <span>Gratis para siempre</span>
                        </>
                      )}
                      {key === 'premium' && (
                        <>
                          <Globe className="h-4 w-4 mr-2" />
                          <span>Sin marca de agua</span>
                        </>
                      )}
                      {key === 'credits' && (
                        <>
                          <BarChart className="h-4 w-4 mr-2" />
                          <span>Sin fecha de expiración</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Plan Comparison */}
            <div className="mt-12 lg:mt-16">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Comparación de Planes Personales
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 font-medium text-gray-500">Característica</th>
                        <th className="text-center py-4 font-medium text-gray-500">Gratis</th>
                        <th className="text-center py-4 font-medium text-gray-500">Premium</th>
                        <th className="text-center py-4 font-medium text-gray-500">Créditos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Plantillas básicas', '✅ 15', '✅ 100+', '✅ 100+'],
                        ['Sin marca de agua', '❌', '✅', '✅'],
                        ['Descarga PDF HD', '❌', '✅', '✅'],
                        ['Soporte prioritario', '❌', '✅', '✅'],
                        ['Estadísticas básicas', '❌', '✅', '✅'],
                        ['Compartir ilimitado', '✅', '✅', '✅'],
                        ['RSVP básico', '✅', '✅', '✅'],
                        ['Guardado automático', '✅', '✅', '✅'],
                      ].map(([feature, free, premium, credits], index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 text-gray-700">{feature}</td>
                          <td className="py-4 text-center">
                            <span className={free.startsWith('✅') ? 'text-green-600' : 'text-gray-400'}>
                              {free}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={premium.startsWith('✅') ? 'text-green-600' : 'text-gray-400'}>
                              {premium}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={credits.startsWith('✅') ? 'text-green-600' : 'text-gray-400'}>
                              {credits}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Professional Pricing */
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {professionalPlansWithAnnual.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl border-2 p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] ${
                    plan.recommended
                      ? 'border-pro-primary/30 bg-gradient-to-b from-white to-pro-primary/5 shadow-2xl scale-105'
                      : 'border-gray-200 bg-white hover:border-pro-primary/20 hover:shadow-xl'
                  }`}
                >
                  {/* Recommended Badge */}
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1.5 bg-gradient-to-r from-pro-primary to-blue-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>Recomendado</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-pro-primary to-blue-600'
                        : 'bg-gray-100'
                    }`}>
                      {plan.id === 'basic' && <Users className="h-6 w-6 text-gray-700" />}
                      {plan.id === 'pro' && <Zap className="h-6 w-6 text-white" />}
                      {plan.id === 'enterprise' && <Globe className="h-6 w-6 text-white" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center mb-1">
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                        {isAnnual ? plan.annualPrice : plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {isAnnual ? '/año' : plan.period}
                      </span>
                    </div>
                    
                    {isAnnual && plan.id !== 'enterprise' && (
                      <div className="text-sm text-green-600 font-medium">
                        {plan.annualSavings}
                      </div>
                    )}
                    
                    {plan.id === 'basic' && (
                      <div className="text-sm text-gray-500 mt-2">
                        50 invitaciones/mes
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className={`w-full ${
                      plan.recommended 
                        ? 'bg-gradient-to-r from-pro-primary to-blue-600 hover:shadow-lg' 
                        : ''
                    }`}
                    asChild
                  >
                    {plan.id === 'enterprise' ? (
                      <Link href="/contact">
                        {plan.cta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <Link href={`/register?plan=${plan.id}&annual=${isAnnual}`}>
                        {plan.cta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </Button>

                  {/* Trial Info */}
                  {plan.id !== 'enterprise' && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full">
                        <Sparkles className="h-3 w-3 text-green-600 mr-1.5" />
                        <span className="text-sm text-green-700 font-medium">
                          14 días gratis
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Professional Comparison Table */}
            <div className="mt-12 lg:mt-16">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-gray-900">
                    Comparación Completa de Planes Pro
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    <span>Desliza para ver más →</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 font-medium text-gray-500">Característica</th>
                        <th className="text-center py-4 font-medium text-gray-500">Básico</th>
                        <th className="text-center py-4 font-medium text-gray-500">Pro</th>
                        <th className="text-center py-4 font-medium text-gray-500">Empresa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Invitaciones/mes', '50', 'Ilimitadas', 'Ilimitadas'],
                        ['Gestión de clientes', '✅ Básica', '✅ Avanzada', '✅ Completa'],
                        ['Usuarios del equipo', '1', '3', 'Ilimitados'],
                        ['White-label', '❌', '✅', '✅'],
                        ['Analytics', '✅ Básicos', '✅ Avanzados', '✅ Completos'],
                        ['Soporte', 'Email', 'Prioritario', '24/7 + SLA'],
                        ['API access', '❌', '❌', '✅'],
                        ['Onboarding', 'Automatizado', 'Guiado', 'Personalizado'],
                        ['Exportación', 'PDF', 'PDF + Excel', 'Todos formatos'],
                        ['Backup automático', '✅', '✅', '✅ + Redundante'],
                      ].map(([feature, basic, pro, enterprise], index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 text-gray-700">{feature}</td>
                          <td className="py-4 text-center">
                            <span className={basic.startsWith('✅') || !isNaN(parseInt(basic)) ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                              {basic}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={pro.startsWith('✅') || pro === 'Ilimitadas' ? 'text-pro-primary font-medium' : 'text-gray-900 font-medium'}>
                              {pro}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={enterprise.startsWith('✅') || enterprise.includes('24/7') ? 'text-green-600 font-medium' : 'text-gray-900 font-medium'}>
                              {enterprise}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 lg:mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              Preguntas frecuentes
            </h4>
            <p className="text-gray-600">
              ¿Tienes dudas? Aquí están las respuestas a las preguntas más comunes.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: '¿Puedo cambiar de plan en cualquier momento?',
                a: 'Sí, puedes cambiar entre planes en cualquier momento. Los cambios se prorratean automáticamente.'
              },
              {
                q: '¿Hay algún compromiso de permanencia?',
                a: 'No, todos nuestros planes son mensuales y puedes cancelar en cualquier momento sin penalización.'
              },
              {
                q: '¿Qué métodos de pago aceptan?',
                a: 'Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencia bancaria.'
              },
              {
                q: '¿Ofrecen descuentos para organizaciones sin fines de lucro?',
                a: 'Sí, ofrecemos un 30% de descuento en todos los planes para organizaciones sin fines de lucro verifi'
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-pink-100 flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-primary">Q</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">{faq.q}</h5>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              size="lg"
              asChild
            >
              <Link href="/faq">
                Ver todas las preguntas frecuentes
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}