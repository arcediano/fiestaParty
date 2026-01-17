// src/components/editor/simpleEditor/DeviceMockup.tsx
'use client';

import { cn } from '@/lib/utils';

interface DeviceMockupProps {
  activeSection: string;
  selectedTemplate: string | null;
}

export function DeviceMockup({ activeSection, selectedTemplate }: DeviceMockupProps) {
  // Función para obtener el nombre de la plantilla
  const getTemplateName = () => {
    if (!selectedTemplate) return 'Personalizada';
    if (selectedTemplate === 'blank') return 'Desde Cero';
    
    // Mapeo de IDs a nombres
    const templateNames: Record<string, string> = {
      'wedding-elegant': 'Boda Elegante',
      'wedding-modern': 'Boda Moderna',
      'wedding-vintage': 'Boda Vintage',
      'wedding-minimal': 'Boda Minimalista',
      'birthday-party': 'Fiesta de Cumpleaños',
      'birthday-elegant': 'Cumpleaños Elegante',
      'corporate-event': 'Evento Corporativo',
      'conference': 'Conferencia',
      'baby-shower-modern': 'Baby Shower Moderno',
      'baby-shower-gender': 'Revelación de Género',
      'graduation-classic': 'Graduación Clásica',
      'graduation-modern': 'Graduación Moderna',
    };
    
    return templateNames[selectedTemplate] || 'Plantilla Personalizada';
  };

  return (
    <div className="relative">
      {/* Mockup de iPhone/Mobile */}
      <div className="relative w-[375px] h-[667px] bg-black rounded-[3.5rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
        {/* Botón de volumen superior */}
        <div className="absolute -left-2 top-24 w-1 h-10 bg-gray-900 rounded-l-lg"></div>
        <div className="absolute -left-2 top-40 w-1 h-16 bg-gray-900 rounded-l-lg"></div>
        
        {/* Botón de encendido */}
        <div className="absolute -right-2 top-32 w-1 h-20 bg-gray-900 rounded-r-lg"></div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-20 flex items-start justify-center">
          <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-1"></div>
          <div className="absolute right-8 top-1.5 w-4 h-4 bg-gray-800 rounded-full"></div>
          <div className="absolute left-8 top-1.5 w-6 h-1.5 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* Pantalla del dispositivo */}
        <div className="absolute inset-[14px] bg-white rounded-[2.5rem] overflow-hidden">
          {/* Fondo de pantalla */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50">
            {/* Patrón decorativo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-300 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            </div>
            
            {/* Header con información de la plantilla */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <span className="text-white text-sm">🎉</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {getTemplateName()}
                  </span>
                </div>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {selectedTemplate === 'blank' ? 'Personalizado' : 'Plantilla'}
                </span>
              </div>
            </div>
            
            {/* Contenido de la invitación */}
            <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center">
              {/* Encabezado de la invitación */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">♥</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Te Invitamos!</h2>
                <p className="text-gray-600">A nuestra celebración especial</p>
              </div>
              
              {/* Información basada en la sección activa */}
              <div className="w-full max-w-[280px] bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
                <div className="space-y-4">
                  {/* Información Básica */}
                  {activeSection === 'basic-info' && (
                    <div className="animate-fade-in">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">¡Celebra con Nosotros!</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Un momento especial para compartir juntos
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <span className="text-pink-500">👰</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Ana & Carlos</p>
                            <p className="text-xs text-gray-500">Los novios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Fecha y Hora */}
                  {activeSection === 'date-time' && (
                    <div className="animate-fade-in text-center">
                      <div className="mb-3">
                        <div className="text-3xl font-bold text-pink-500">15</div>
                        <div className="text-sm font-medium text-gray-700">Junio 2024</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-500">🕒</span>
                          <span className="font-medium">18:00 hrs</span>
                        </div>
                        <p className="text-xs text-gray-500">Hora de inicio</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Ubicación */}
                  {activeSection === 'location' && (
                    <div className="animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-500">📍</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Salón de Eventos</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Av. Principal 123, Ciudad
                          </p>
                          <p className="text-xs text-blue-500 mt-2">Ver en mapa →</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Diseño */}
                  {activeSection === 'design' && (
                    <div className="animate-fade-in">
                      <div className="flex flex-col items-center">
                        <div className="w-full h-32 mb-4 rounded-xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-300"></div>
                        <div className="text-center">
                          <h4 className="font-bold text-gray-900 mb-1">Tema Moderno</h4>
                          <p className="text-sm text-gray-600">Rosa y dorado</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Invitados */}
                  {activeSection === 'guests' && (
                    <div className="animate-fade-in">
                      <div className="text-center mb-3">
                        <div className="text-2xl font-bold text-pink-500">120</div>
                        <p className="text-sm text-gray-600">Invitados confirmados</p>
                      </div>
                      <div className="flex justify-center -space-x-2">
                        {['👤', '👤', '👤', '👤'].map((emoji, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs">{emoji}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Extras */}
                  {activeSection === 'extras' && (
                    <div className="animate-fade-in text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                        <span className="text-white text-xl">🎁</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">Detalles Especiales</h4>
                      <p className="text-sm text-gray-600">Regalos y redes sociales</p>
                    </div>
                  )}
                  
                  {/* Configuración */}
                  {activeSection === 'settings' && (
                    <div className="animate-fade-in text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                        <span className="text-white text-xl">⚙️</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">Configuración</h4>
                      <p className="text-sm text-gray-600">Personaliza tu experiencia</p>
                    </div>
                  )}
                  
                  {/* Default cuando no hay match */}
                  {!['basic-info', 'date-time', 'location', 'design', 'guests', 'extras', 'settings'].includes(activeSection) && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">💌</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">Tu Invitación</h4>
                      <p className="text-sm text-gray-600">Selecciona una sección para editar</p>
                    </div>
                  )}
                </div>
                
                {/* Botón de acción */}
                <button className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
                  Confirmar Asistencia
                </button>
              </div>
              
              {/* Indicador de sección activa en el mockup */}
              <div className="mt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full">
                  <div className={cn(
                    "h-2 w-2 rounded-full animate-pulse",
                    activeSection === 'basic-info' && "bg-pink-500",
                    activeSection === 'date-time' && "bg-blue-500",
                    activeSection === 'location' && "bg-green-500",
                    activeSection === 'design' && "bg-purple-500",
                    activeSection === 'guests' && "bg-yellow-500",
                    activeSection === 'extras' && "bg-cyan-500",
                    activeSection === 'settings' && "bg-gray-500"
                  )}></div>
                  <span className="text-xs text-white">
                    Vista previa en tiempo real
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>
      
      {/* Marco decorativo */}
      <div className="absolute -inset-8 bg-gradient-to-br from-pink-200/20 via-transparent to-rose-200/20 rounded-[4.5rem] blur-xl -z-10"></div>
    </div>
  );
}