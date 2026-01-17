// src/components/editor/simpleEditor/EditorHeader.tsx
'use client';

interface EditorHeaderProps {
  onUpgradeClick: () => void;
  activeSection: string;
  selectedTemplate: string | null;
}

export function EditorHeader({ onUpgradeClick, activeSection, selectedTemplate }: EditorHeaderProps) {
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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Editor de Invitaciones</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">
                Plantilla: <span className="font-medium text-pink-600">{getTemplateName()}</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {selectedTemplate === 'blank' ? 'Personalizado' : 'Plantilla'}
              </span>
            </div>
          </div>
          
          {/* Indicador de progreso */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">Progreso:</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 w-3/4"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">75%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="editor-btn editor-btn-outline text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Guardar borrador
          </button>
          
          <button className="editor-btn editor-btn-primary text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Publicar
          </button>
          
          <button 
            onClick={onUpgradeClick}
            className="editor-btn text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Upgrade Premium
          </button>
        </div>
      </div>
    </header>
  );
}