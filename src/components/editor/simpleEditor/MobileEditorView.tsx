// src/components/editor/simpleEditor/MobileEditorView.tsx
'use client';

import { Menu, Smartphone, Palette, Type, Share2, Home, User, ChevronLeft, Save, Eye, Download, Sparkles, Settings, Users, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useSimpleEditor } from '@/lib/hooks/useSimpleEditor';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { templates } from '@/lib/constants/templates';
import { colorSchemes } from '@/lib/constants/colors';

interface MobileEditorViewProps {
  onUpgradeClick: () => void;
}

export function MobileEditorView({ onUpgradeClick }: MobileEditorViewProps) {
  const { isSaving, invitationData, updateField, shareInvitation } = useSimpleEditor();
  const [activeTab, setActiveTab] = useState<'edit' | 'design' | 'preview' | 'guests'>('edit');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(invitationData.templateId);
  const [selectedColor, setSelectedColor] = useState(invitationData.colorScheme);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateField('templateId', templateId);
  };

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    updateField('colorScheme', colorId);
  };

  const renderEditTab = () => (
    <div className="space-y-6 p-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSideMenu(true)}
            className="p-2 rounded-lg bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Editar invitación</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isSaving ? 'animate-pulse bg-amber-500' : 'bg-green-500'}`} />
          <span className="text-sm text-gray-600">{isSaving ? 'Guardando...' : 'Guardado'}</span>
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Título del evento
          </label>
          <input
            type="text"
            value={invitationData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Boda de María y Carlos"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={invitationData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Hora
            </label>
            <input
              type="time"
              value={invitationData.time}
              onChange={(e) => updateField('time', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Lugar
          </label>
          <input
            type="text"
            value={invitationData.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="Nombre del lugar"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition mb-3"
          />
          <input
            type="text"
            value={invitationData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Dirección completa"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Descripción
          </label>
          <textarea
            rows={4}
            value={invitationData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Comparte los detalles especiales de tu evento..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderDesignTab = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSideMenu(true)}
            className="p-2 rounded-lg bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Personalizar diseño</h2>
        </div>
      </div>

      {/* Plantillas */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Plantillas</h3>
          <span className="text-sm text-gray-600">{templates.length} disponibles</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`flex-shrink-0 w-40 rounded-2xl border-2 p-3 transition-all ${
                selectedTemplate === template.id
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Vista previa */}
              <div className={`h-32 rounded-xl mb-3 bg-gradient-to-br ${template.thumbnailColor} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <div className="h-4 w-16 bg-white/30 rounded mx-auto mb-2"></div>
                  <div className="h-2 w-12 bg-white/30 rounded mx-auto"></div>
                </div>
              </div>
              
              <div className="text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{template.name}</span>
                  {template.isPremium && (
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paleta de colores</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => handleColorSelect(scheme.id)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                selectedColor === scheme.id
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex h-8 w-full rounded-lg overflow-hidden mb-2">
                {scheme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{scheme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade banner */}
      {!invitationData.isPremium && (
        <div className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Desbloquea plantillas Premium</h4>
              <p className="text-sm text-gray-700 mb-3">
                Accede a todas las plantillas exclusivas y características avanzadas
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                onClick={onUpgradeClick}
              >
                Ver planes Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPreviewTab = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSideMenu(true)}
            className="p-2 rounded-lg bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Vista previa</h2>
        </div>
        <button className="p-2 rounded-lg bg-gray-100">
          <Eye className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Mockup móvil */}
      <div className="flex justify-center">
        <div className="w-[280px]">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-3">
            {/* Notch */}
            <div className="h-6 w-40 bg-black rounded-b-2xl mx-auto mb-3"></div>
            
            {/* Pantalla */}
            <div className="bg-white rounded-2xl p-4 h-[500px] overflow-y-auto">
              {/* Header */}
              <div className="h-32 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 mb-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">{invitationData.title || 'Mi Evento'}</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20">
                    <span className="text-sm">{invitationData.date || 'Próximamente'}</span>
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 bg-gray-100 rounded-xl"></div>
                  <div className="h-16 bg-gray-100 rounded-xl"></div>
                </div>

                <div className="h-24 bg-gray-100 rounded-xl"></div>

                {/* Botón de acción */}
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold">
                  Confirmar Asistencia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones de vista previa */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="border-gray-300"
          onClick={shareInvitation}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Compartir
        </Button>
        <Button
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
          onClick={onUpgradeClick}
        >
          <Download className="h-4 w-4 mr-2" />
          Descargar
        </Button>
      </div>
    </div>
  );

  const renderGuestsTab = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSideMenu(true)}
            className="p-2 rounded-lg bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Invitados</h2>
        </div>
        <span className="text-sm text-gray-600">
          {invitationData.guests.filter(g => g.confirmed).length}/{invitationData.guests.length} confirmados
        </span>
      </div>

      {/* Lista de invitados */}
      <div className="space-y-3">
        {invitationData.guests.map((guest) => (
          <div
            key={guest.id}
            className="bg-white rounded-2xl p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold">
                  {guest.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{guest.name}</h4>
                  <p className="text-sm text-gray-600">{guest.email}</p>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                guest.confirmed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {guest.confirmed ? 'Confirmado' : 'Pendiente'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agregar invitado */}
      <div className="mt-6 bg-gradient-to-r from-gray-50 to-white border border-dashed border-gray-300 rounded-2xl p-4 text-center">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <Users className="h-6 w-6 text-gray-600" />
        </div>
        <h4 className="font-medium text-gray-900 mb-2">Agregar invitado</h4>
        <p className="text-sm text-gray-600 mb-4">Agrega más personas a tu lista de invitados</p>
        <Button
          variant="outline"
          className="border-pink-300 text-pink-600 w-full"
        >
          + Agregar invitado
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header móvil */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Volver</span>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="font-bold text-gray-900">Editor móvil</h1>
            <p className="text-xs text-gray-600">Creando tu invitación</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-100">
              <Save className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs de navegación */}
      <div className="sticky top-14 z-30 bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'edit' as const, label: 'Editar', icon: Type },
            { id: 'design' as const, label: 'Diseño', icon: Palette },
            { id: 'preview' as const, label: 'Vista', icon: Smartphone },
            { id: 'guests' as const, label: 'Invitados', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-pink-500 text-pink-600'
                    : 'text-gray-500'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido principal */}
      <main>
        {activeTab === 'edit' && renderEditTab()}
        {activeTab === 'design' && renderDesignTab()}
        {activeTab === 'preview' && renderPreviewTab()}
        {activeTab === 'guests' && renderGuestsTab()}
      </main>

      {/* Menú lateral móvil */}
      {showSideMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl animate-in slide-in-from-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Menú</h2>
                <button
                  onClick={() => setShowSideMenu(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
                >
                  <Home className="h-5 w-5 text-gray-700" />
                  <span className="font-medium">Inicio</span>
                </Link>

                <button
                  onClick={onUpgradeClick}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Hacer Premium</span>
                </button>

                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <ImageIcon className="h-5 w-5 text-gray-700" />
                  <span className="font-medium">Subir imágenes</span>
                </button>

                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <Settings className="h-5 w-5 text-gray-700" />
                  <span className="font-medium">Configuración</span>
                </button>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
                >
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="font-medium">Mi cuenta</span>
                </Link>
              </div>

              {/* Información de la invitación */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Tu invitación</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Estado:</span>
                    <span className="font-medium text-green-600">Activa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Invitados:</span>
                    <span className="font-medium">{invitationData.guests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versión:</span>
                    <span className="font-medium">
                      {invitationData.isPremium ? 'Premium' : 'Gratuita'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex h-16">
          {[
            { id: 'edit', label: 'Editar', icon: Type, active: activeTab === 'edit' },
            { id: 'design', label: 'Diseño', icon: Palette, active: activeTab === 'design' },
            { id: 'preview', label: 'Vista', icon: Smartphone, active: activeTab === 'preview' },
            { id: 'guests', label: 'Invitados', icon: Users, active: activeTab === 'guests' },
            { id: 'menu', label: 'Menú', icon: Menu, active: showSideMenu },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'menu') {
                    setShowSideMenu(true);
                  } else {
                    setActiveTab(item.id as any);
                  }
                }}
                className={`flex-1 flex flex-col items-center justify-center transition-colors ${
                  item.active ? 'text-pink-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className={`relative ${item.active ? 'text-pink-600' : ''}`}>
                  <Icon className="h-5 w-5 mb-1" />
                  {item.active && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-pink-500"></div>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Botón flotante de acción */}
      <button
        onClick={shareInvitation}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xl flex items-center justify-center z-30 animate-bounce hover:scale-110 transition-transform"
      >
        <Share2 className="h-6 w-6" />
      </button>
    </div>
  );
}