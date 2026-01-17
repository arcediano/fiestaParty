// src/components/editor/simpleEditor/SimpleEditor.tsx
'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { EditorHeader } from './EditorHeader';
import { EditorLeftPanel } from './EditorLeftPanel';
import { EditorPreview } from './EditorPreview';
import { MobileEditorView } from './MobileEditorView';
import { UpgradeModal } from './UpgradeModal';
import { TemplateSelector } from './TemplateSelector';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function SimpleEditor() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isTemplateSelected, setIsTemplateSelected] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll automático a la sección activa
  useEffect(() => {
    if (previewRef.current && !isLoading && isTemplateSelected) {
      const previewElement = previewRef.current;
      const sectionElement = previewElement.querySelector(`[data-section="${activeSection}"]`);
      
      if (sectionElement) {
        const scrollOptions: ScrollIntoViewOptions = {
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        };
        
        sectionElement.scrollIntoView(scrollOptions);
      }
    }
  }, [activeSection, isLoading, isTemplateSelected]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsTemplateSelected(true);
    setActiveSection('basic-info'); // Ir a la primera sección de edición
  };

  const handleStartFromScratch = () => {
    setSelectedTemplate('blank');
    setIsTemplateSelected(true);
    setActiveSection('basic-info');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="h-16 w-16 mx-auto border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Cargando editor</h3>
            <p className="text-gray-600 mt-1">Preparando todas las herramientas creativas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return <MobileEditorView onUpgradeClick={() => setShowUpgradeModal(true)} />;
  }

  // Si no se ha seleccionado plantilla, mostrar selector
  if (!isTemplateSelected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <TemplateSelector 
          onTemplateSelect={handleTemplateSelect}
          onStartFromScratch={handleStartFromScratch}
        />
      </div>
    );
  }

  // Editor normal con plantilla seleccionada
  return (
    <>
      <div className="editor-container min-h-screen flex flex-col bg-gray-50">
        <EditorHeader 
          onUpgradeClick={() => setShowUpgradeModal(true)}
          activeSection={activeSection}
          selectedTemplate={selectedTemplate}
        />
        
        {/* Contenedor principal - Panel izquierdo más ancho */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panel izquierdo - 60% del espacio CON SCROLL */}
          <div 
            ref={leftPanelRef}
            className={cn(
              "editor-left-panel w-full border-r border-gray-200 bg-white overflow-y-auto editor-scrollbar",
              "lg:w-[60%] xl:w-[65%] 2xl:w-[70%]"
            )}
          >
            <div className="min-h-full">
              <EditorLeftPanel 
                onSectionChange={setActiveSection}
                activeSection={activeSection}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
          
          {/* Vista previa - 40% del espacio, fija a la derecha */}
          <div className={cn(
            "editor-preview-container flex-1 bg-gray-900",
            "lg:w-[40%] xl:w-[35%] 2xl:w-[30%]"
          )}>
            <EditorPreview 
              ref={previewRef}
              activeSection={activeSection}
              selectedTemplate={selectedTemplate}
            />
          </div>
        </div>
        
        {/* Indicador de sección activa (solo en vista previa) */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Editando: {activeSection === 'basic-info' ? 'Información Básica' :
                        activeSection === 'date-time' ? 'Fecha y Hora' :
                        activeSection === 'location' ? 'Ubicación' :
                        activeSection === 'design' ? 'Diseño' :
                        activeSection === 'guests' ? 'Invitados' :
                        activeSection === 'extras' ? 'Extras' : 'Configuración'}
            </span>
          </div>
        </div>
      </div>
      
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </>
  );
}