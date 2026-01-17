// src/components/editor/simpleEditor/TemplateSelector.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  onStartFromScratch: () => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'wedding' | 'birthday' | 'corporate' | 'baby-shower' | 'graduation';
  type: 'free' | 'premium';
  thumbnailColor: string;
  featured?: boolean;
}

export function TemplateSelector({ onTemplateSelect, onStartFromScratch }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'free' | 'premium'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Plantillas de ejemplo
  const templates: Template[] = [
    // Bodas
    { id: 'wedding-elegant', name: 'Boda Elegante', description: 'Diseño clásico con toques modernos', category: 'wedding', type: 'free', thumbnailColor: 'from-pink-400 to-rose-500', featured: true },
    { id: 'wedding-modern', name: 'Boda Moderna', description: 'Líneas limpias y diseño contemporáneo', category: 'wedding', type: 'premium', thumbnailColor: 'from-purple-500 to-pink-500' },
    { id: 'wedding-vintage', name: 'Boda Vintage', description: 'Inspiración retro con detalles clásicos', category: 'wedding', type: 'free', thumbnailColor: 'from-amber-400 to-orange-500' },
    { id: 'wedding-minimal', name: 'Boda Minimalista', description: 'Simplicidad y elegancia', category: 'wedding', type: 'free', thumbnailColor: 'from-gray-300 to-gray-400' },
    
    // Cumpleaños
    { id: 'birthday-party', name: 'Fiesta de Cumpleaños', description: 'Celebración divertida y colorida', category: 'birthday', type: 'free', thumbnailColor: 'from-blue-400 to-cyan-500', featured: true },
    { id: 'birthday-elegant', name: 'Cumpleaños Elegante', description: 'Para celebraciones sofisticadas', category: 'birthday', type: 'premium', thumbnailColor: 'from-indigo-500 to-purple-500' },
    
    // Corporativo
    { id: 'corporate-event', name: 'Evento Corporativo', description: 'Profesional y moderno', category: 'corporate', type: 'free', thumbnailColor: 'from-slate-600 to-slate-700' },
    { id: 'conference', name: 'Conferencia', description: 'Diseño formal para eventos profesionales', category: 'corporate', type: 'premium', thumbnailColor: 'from-blue-600 to-blue-700' },
    
    // Baby Shower
    { id: 'baby-shower-modern', name: 'Baby Shower Moderno', description: 'Dulce y contemporáneo', category: 'baby-shower', type: 'free', thumbnailColor: 'from-cyan-300 to-blue-400' },
    { id: 'baby-shower-gender', name: 'Revelación de Género', description: 'Para anuncios especiales', category: 'baby-shower', type: 'premium', thumbnailColor: 'from-green-400 to-teal-500' },
    
    // Graduación
    { id: 'graduation-classic', name: 'Graduación Clásica', description: 'Celebra logros académicos', category: 'graduation', type: 'free', thumbnailColor: 'from-yellow-400 to-amber-500' },
    { id: 'graduation-modern', name: 'Graduación Moderna', description: 'Diseño fresco para graduados', category: 'graduation', type: 'premium', thumbnailColor: 'from-emerald-400 to-green-500' },
  ];

  // Categorías
  const categories = [
    { id: 'all', name: 'Todas', icon: '🎉' },
    { id: 'wedding', name: 'Bodas', icon: '💍' },
    { id: 'birthday', name: 'Cumpleaños', icon: '🎂' },
    { id: 'corporate', name: 'Corporativo', icon: '💼' },
    { id: 'baby-shower', name: 'Baby Shower', icon: '👶' },
    { id: 'graduation', name: 'Graduación', icon: '🎓' },
  ];

  // Filtrar plantillas
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Elige tu <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">plantilla perfecta</span>
        </h1>
        <p className="text-lg text-gray-600">
          Selecciona una plantilla o comienza desde cero. Puedes personalizar cada detalle después.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Barra de búsqueda */}
          <div className="w-full lg:w-auto lg:flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Buscar plantillas..."
                className="editor-input pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filtro por tipo */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={cn(
                "editor-btn editor-btn-outline",
                selectedType === 'all' && "!border-pink-500 !text-pink-600"
              )}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedType('free')}
              className={cn(
                "editor-btn editor-btn-outline",
                selectedType === 'free' && "!border-green-500 !text-green-600"
              )}
            >
              Gratis
            </button>
            <button
              onClick={() => setSelectedType('premium')}
              className={cn(
                "editor-btn editor-btn-outline",
                selectedType === 'premium' && "!border-purple-500 !text-purple-600"
              )}
            >
              Premium
            </button>
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                selectedCategory === category.id
                  ? "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 text-gray-700"
              )}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="max-w-6xl mx-auto">
        {/* Plantillas destacadas */}
        {selectedCategory === 'all' && filteredTemplates.filter(t => t.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates
                .filter(t => t.featured)
                .map(template => (
                  <TemplateCard 
                    key={template.id}
                    template={template}
                    onSelect={onTemplateSelect}
                  />
                ))
              }
            </div>
          </div>
        )}

        {/* Todas las plantillas */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'Todas las plantillas' : 
               categories.find(c => c.id === selectedCategory)?.name + 's'}
            </h2>
            <span className="text-gray-600">
              {filteredTemplates.length} plantilla{filteredTemplates.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron plantillas</h3>
              <p className="text-gray-600">Intenta con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  onSelect={onTemplateSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Opción para empezar desde cero */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">¿Quieres más control?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Crea una invitación completamente personalizada desde cero. Tendrás acceso a todas las herramientas de diseño.
            </p>
            <button
              onClick={onStartFromScratch}
              className="editor-btn editor-btn-outline px-8 py-3 text-lg border-2 border-dashed hover:border-pink-500 hover:bg-pink-50"
            >
              <span className="flex items-center gap-2">
                <span>🎨</span>
                Empezar desde cero
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, onSelect }: { template: Template; onSelect: (id: string) => void }) {
  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      'wedding': 'Boda',
      'birthday': 'Cumpleaños',
      'corporate': 'Corporativo',
      'baby-shower': 'Baby Shower',
      'graduation': 'Graduación'
    };
    return names[category] || category;
  };

  return (
    <div className="editor-card group cursor-pointer h-full" onClick={() => onSelect(template.id)}>
      {/* Badge premium/free */}
      <div className="absolute top-3 right-3 z-10">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold",
          template.type === 'premium'
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
        )}>
          {template.type === 'premium' ? 'PREMIUM' : 'GRATIS'}
        </span>
      </div>

      {/* Thumbnail */}
      <div className={cn(
        "h-48 rounded-xl mb-4 relative overflow-hidden bg-gradient-to-br",
        template.thumbnailColor
      )}>
        {/* Mockup de dispositivo en miniatura */}
        <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="w-24 h-40 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-2xl mb-2">
                {template.category === 'wedding' && '💍'}
                {template.category === 'birthday' && '🎂'}
                {template.category === 'corporate' && '💼'}
                {template.category === 'baby-shower' && '👶'}
                {template.category === 'graduation' && '🎓'}
              </div>
              <div className="text-xs font-bold text-gray-900">{template.name.split(' ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Efecto hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium shadow-lg">
              Seleccionar
            </span>
          </div>
        </div>
      </div>

      {/* Información */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg truncate">{template.name}</h3>
          {template.featured && (
            <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Destacada
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <span>📁</span>
            {getCategoryName(template.category)}
          </span>
          
          <button className="text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center gap-1">
            Ver detalles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}