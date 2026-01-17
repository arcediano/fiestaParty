// src/components/editor/simpleEditor/UpgradeModal.tsx
'use client';

import { X, Check, Sparkles, Lock, Zap, Crown, Shield, Star, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useSimpleEditor } from '@/lib/hooks/useSimpleEditor';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { upgradeToPremium, invitationData } = useSimpleEditor();
  const [selectedOption, setSelectedOption] = useState<'single' | 'pack'>('single');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Actualizar estado
    await upgradeToPremium();
    
    setIsProcessing(false);
    setShowSuccess(true);
    
    // Cerrar modal después de mostrar éxito
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const features = [
    { icon: Sparkles, text: 'Plantillas premium exclusivas' },
    { icon: Shield, text: 'Sin marca "Hecho con FiestaParty"' },
    { icon: Star, text: 'Descarga PDF de alta calidad' },
    { icon: Gift, text: 'Estadísticas avanzadas de invitados' },
    { icon: Clock, text: 'Soporte prioritario por email' },
    { icon: Zap, text: 'Acceso anticipado a nuevas funciones' },
  ];

  const options = [
    {
      id: 'single',
      name: 'Invitación Premium',
      description: 'Una sola invitación con todas las características premium',
      price: 4.99,
      originalPrice: 9.99,
      discount: '50%',
      features: ['1 invitación premium', 'Válido por 1 año', 'Actualizaciones gratuitas'],
      popular: false,
    },
    {
      id: 'pack',
      name: 'Pack de 3 créditos',
      description: 'Ahorra comprando múltiples invitaciones',
      price: 9.99,
      originalPrice: 14.99,
      discount: '33%',
      features: ['3 invitaciones premium', 'Válido por 2 años', 'Regalo: 1 plantilla extra'],
      popular: true,
    },
  ];

  const selectedPlan = options.find(opt => opt.id === selectedOption);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Desbloquea el poder de Premium
                </h2>
                <p className="text-pink-100 text-lg mt-2">
                  Lleva tu invitación al siguiente nivel con características exclusivas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {showSuccess ? (
            <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">¡Felicidades! 🎉</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Tu invitación ahora es <span className="font-bold text-pink-600">Premium</span>. 
                Todas las características exclusivas han sido desbloqueadas.
              </p>
              <div className="animate-pulse">
                <div className="h-2 w-48 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Opciones de compra */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedOption(option.id as any)}
                    className={`cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300 ${
                      selectedOption === option.id
                        ? 'border-pink-500 bg-pink-50 shadow-xl transform scale-[1.02]'
                        : 'border-gray-200 hover:border-pink-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Badge popular */}
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                          <Zap className="h-3 w-3 inline mr-1" />
                          MÁS POPULAR
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{option.name}</h3>
                        {selectedOption === option.id && (
                          <div className="flex items-center text-pink-600">
                            <Check className="h-5 w-5 mr-1" />
                            <span className="font-medium">Seleccionado</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{option.description}</p>
                      
                      {/* Precio */}
                      <div className="flex items-baseline mb-4">
                        <div className="text-4xl font-bold text-gray-900">${option.price}</div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-500 line-through">${option.originalPrice}</div>
                          <div className="text-sm font-medium text-green-600">Ahorra {option.discount}</div>
                        </div>
                      </div>

                      {/* Features específicas */}
                      <div className="space-y-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Valor estimado */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">Valor estimado:</div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">
                          ${(option.price * 3).toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          ¡Oferta especial!
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Todas las características premium */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Todo lo que obtienes con Premium:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-pink-300 transition-colors"
                      >
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-pink-600" />
                        </div>
                        <span className="font-medium text-gray-900">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comparación */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Comparación Gratis vs Premium</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="text-sm text-gray-600 mb-2">Tu plan actual:</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {invitationData.isPremium ? 'Premium' : 'Gratis'}
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-sm text-gray-600 mb-2">Invitaciones restantes:</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {invitationData.isPremium ? 'Ilimitadas' : '1/1'}
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-sm text-gray-600 mb-2">Ahorro estimado:</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${selectedPlan?.originalPrice! - selectedPlan?.price!}
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-16 text-lg"
                  onClick={onClose}
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Continuar Gratis
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white h-16 text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Procesando pago...
                    </>
                  ) : (
                    <>
                      <Lock className="h-6 w-6 mr-3" />
                      Comprar {selectedPlan?.name}
                      <Sparkles className="h-6 w-6 ml-3" />
                    </>
                  )}
                </Button>
              </div>

              {/* Garantía y seguridad */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-1">Pago 100% seguro</h5>
                    <p className="text-sm text-gray-600">Protegido con Stripe</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-1">Garantía de 30 días</h5>
                    <p className="text-sm text-gray-600">Devolución completa</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-1">Acceso inmediato</h5>
                    <p className="text-sm text-gray-600">Desbloqueo instantáneo</p>
                  </div>
                </div>
              </div>

              {/* Testimonios */}
              <div className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold text-gray-900">María González</h5>
                    <p className="text-sm text-gray-600">Wedding Planner</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "El upgrade a Premium transformó completamente mis invitaciones. 
                  Mis clientes quedan impresionados con el nivel profesional. 
                  ¡La mejor inversión para mi negocio!"
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}