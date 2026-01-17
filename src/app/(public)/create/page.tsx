'use client';

import dynamic from 'next/dynamic';
import '@/styles/editor.css';
import { useEffect } from 'react';

const SimpleEditor = dynamic(
  () => import('@/components/editor/simpleEditor/SimpleEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center space-y-6">
          <div className="relative">
            {/* Spinner mejorado */}
            <div className="relative h-20 w-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-pink-500 border-r-pink-300 animate-spin"></div>
              <div className="absolute inset-4 rounded-full border-[3px] border-transparent border-b-rose-500 border-l-rose-300 animate-spin animation-delay-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse"></div>
              </div>
            </div>
            
            {/* Texto de carga mejorado */}
            <div className="space-y-3 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Preparando tu espacio creativo
                </h3>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                  Cargando todas las herramientas necesarias para crear una invitación increíble...
                </p>
              </div>
              
              {/* Indicador de progreso */}
              <div className="w-48 mx-auto h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 animate-progress"></div>
              </div>
              
              <p className="text-xs text-gray-500">
                Esto solo tomará unos segundos...
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function CreatePage() {
  useEffect(() => {
    // Eliminar scroll globalmente
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restaurar scroll al desmontar
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return <SimpleEditor />;
}