// src/components/editor/simpleEditor/EditorPreview.tsx
'use client';

import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { DeviceMockup } from './DeviceMockup';

interface EditorPreviewProps {
  activeSection: string;
  selectedTemplate: string | null;
}

export const EditorPreview = forwardRef<HTMLDivElement, EditorPreviewProps>(
  ({ activeSection, selectedTemplate }, ref) => {
    const [scale, setScale] = useState(1);

    // Ajustar escala para dispositivos pequeños
    useEffect(() => {
      const updateScale = () => {
        const container = document.querySelector('.editor-preview-container');
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          
          // Ajustar escala basada en el tamaño del contenedor
          const maxDeviceWidth = 375; // Ancho máximo del dispositivo mockup
          const maxDeviceHeight = 667; // Altura máxima del dispositivo mockup
          
          const widthScale = (containerWidth * 0.9) / maxDeviceWidth;
          const heightScale = (containerHeight * 0.9) / maxDeviceHeight;
          const newScale = Math.min(widthScale, heightScale, 1);
          
          setScale(Math.max(0.7, newScale)); // Escala mínima de 0.7
        }
      };

      updateScale();
      window.addEventListener('resize', updateScale);
      
      return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
      <div 
        ref={ref}
        className="editor-preview h-full w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.3),transparent_50%)]"></div>
        </div>
        
        {/* Contenedor del dispositivo - CENTRADO */}
        <div 
          className="relative z-10 transition-all duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <DeviceMockup 
            activeSection={activeSection} 
            selectedTemplate={selectedTemplate}
          />
        </div>
        
        {/* Indicador de sección activa (solo para vista previa) */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full border border-gray-700">
            <div className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse"></div>
            <span className="text-xs font-medium text-gray-200">
              Vista previa
            </span>
          </div>
        </div>
        
        {/* Indicador de zoom */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-gray-300">
            {Math.round(scale * 100)}%
          </div>
        </div>
      </div>
    );
  }
);

EditorPreview.displayName = 'EditorPreview';