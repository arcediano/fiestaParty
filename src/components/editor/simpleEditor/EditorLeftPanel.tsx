// src/components/editor/simpleEditor/EditorLeftPanel.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  MapPin, 
  Palette, 
  Users, 
  Gift,
  Settings,
  Image as ImageIcon,
  Clock,
  Mail,
  Share2,
  Smartphone,
  Globe,
  Lock,
  Eye,
  Download,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Section {
  id: string;
  title: string;
  fullTitle: string;
  icon: React.ReactNode;
  description: string;
  step: string;
}

interface EditorLeftPanelProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
  selectedTemplate: string | null;
  onTemplateChange?: () => void;
}

export function EditorLeftPanel({ 
  onSectionChange, 
  activeSection, 
  selectedTemplate,
  onTemplateChange 
}: EditorLeftPanelProps) {
  const [eventData, setEventData] = useState({
    title: '¡Nuestra Boda!',
    subtitle: 'Ana & Carlos',
    message: 'Con mucha alegría en nuestros corazones, queremos invitarte a compartir con nosotros el día más especial de nuestras vidas.',
    brideName: 'Ana María',
    groomName: 'Carlos Eduardo',
    date: '2024-06-15',
    startTime: '18:00',
    endTime: '23:00',
    locationName: 'Salón de Eventos Las Flores',
    address: 'Av. Principal 123, Colonia Centro, Ciudad de México, 06000',
    instructions: 'Estacionamiento gratuito disponible en el sótano. Entrada por puerta principal.',
    giftMessage: 'Tu presencia es el mejor regalo. Si deseas hacernos un detalle, preferimos contribuciones a nuestra luna de miel.',
    hashtag: '#AnaYCarlos2024',
    instagram: '@anaycarlos',
    colorScheme: '#EC4899',
    typography: 'Playfair Display',
    privacy: 'public',
    language: 'Español',
    timezone: 'CDMX (UTC-6)'
  });

  const [reminders, setReminders] = useState({
    oneWeek: true,
    oneDay: true
  });

  const [guests, setGuests] = useState([
    { id: 1, name: 'María González', email: 'maria@ejemplo.com', status: 'confirmed' },
    { id: 2, name: 'Juan Pérez', email: 'juan@ejemplo.com', status: 'pending' },
    { id: 3, name: 'Ana Rodríguez', email: 'ana@ejemplo.com', status: 'confirmed' },
  ]);

  const [invitationMethod, setInvitationMethod] = useState<'email' | 'link' | 'whatsapp'>('link');
  const [newGuestEmail, setNewGuestEmail] = useState('');

  // Secciones del editor en tabs horizontales
  const sections: Section[] = [
    { 
      id: 'basic-info', 
      title: 'Info', 
      fullTitle: 'Información Básica del Evento',
      icon: <span className="text-lg">📝</span>, 
      description: 'Título, novios y descripción',
      step: 'Paso 1/7'
    },
    { 
      id: 'date-time', 
      title: 'Fecha', 
      fullTitle: 'Fecha y Hora del Evento',
      icon: <Calendar className="h-4 w-4" />, 
      description: 'Fecha, hora y recordatorios',
      step: 'Paso 2/7'
    },
    { 
      id: 'location', 
      title: 'Lugar', 
      fullTitle: 'Ubicación del Evento',
      icon: <MapPin className="h-4 w-4" />, 
      description: 'Lugar, mapa y direcciones',
      step: 'Paso 3/7'
    },
    { 
      id: 'design', 
      title: 'Diseño', 
      fullTitle: 'Diseño y Personalización',
      icon: <Palette className="h-4 w-4" />, 
      description: 'Colores, fuentes y estilo',
      step: 'Paso 4/7'
    },
    { 
      id: 'guests', 
      title: 'Invitados', 
      fullTitle: 'Gestión de Invitados',
      icon: <Users className="h-4 w-4" />, 
      description: 'Lista y gestión de invitados',
      step: 'Paso 5/7'
    },
    { 
      id: 'extras', 
      title: 'Extras', 
      fullTitle: 'Detalles y Extras',
      icon: <Gift className="h-4 w-4" />, 
      description: 'Regalos, hashtag y detalles',
      step: 'Paso 6/7'
    },
    { 
      id: 'settings', 
      title: 'Config', 
      fullTitle: 'Configuración y Privacidad',
      icon: <Settings className="h-4 w-4" />, 
      description: 'Ajustes y privacidad',
      step: 'Paso 7/7'
    },
  ];

  const colorOptions = [
    { value: '#EC4899', name: 'Rosa Vibrante' },
    { value: '#8B5CF6', name: 'Púrpura Real' },
    { value: '#10B981', name: 'Verde Esmeralda' },
    { value: '#3B82F6', name: 'Azul Profesional' },
    { value: '#F59E0B', name: 'Ámbar Cálido' },
  ];

  const typographyOptions = [
    { value: 'Playfair Display', name: 'Playfair Display (Elegante)' },
    { value: 'Montserrat', name: 'Montserrat (Moderno)' },
    { value: 'Inter', name: 'Inter (Neutro)' },
    { value: 'Dancing Script', name: 'Dancing Script (Cursiva)' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReminderChange = (reminder: keyof typeof reminders) => {
    setReminders(prev => ({
      ...prev,
      [reminder]: !prev[reminder]
    }));
  };

  const addGuest = () => {
    if (!newGuestEmail.trim()) return;
    
    const newGuest = {
      id: guests.length + 1,
      name: newGuestEmail.split('@')[0],
      email: newGuestEmail,
      status: 'pending' as const
    };
    
    setGuests([...guests, newGuest]);
    setNewGuestEmail('');
  };

  const removeGuest = (id: number) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header con info de plantilla */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Editor de Invitación</h2>
            <p className="text-sm text-gray-600">
              Plantilla: <span className="font-medium text-pink-600">{selectedTemplate || 'Boda Elegante'}</span>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onTemplateChange}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cambiar plantilla
          </Button>
        </div>
      </div>

      {/* TABS COMPLETAMENTE RESPONSIVE */}
      <div className="sticky top-[72px] z-10 bg-white border-b border-gray-200">
        <div className="flex items-stretch">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 px-1 min-w-0 relative transition-all duration-200 group",
                activeSection === section.id 
                  ? "bg-gradient-to-b from-pink-50/50 to-transparent" 
                  : "hover:bg-gray-50/50"
              )}
            >
              <div className="flex flex-col items-center w-full">
                <div className={cn(
                  "mb-1.5 transition-all duration-200",
                  activeSection === section.id 
                    ? "text-pink-600 scale-110" 
                    : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {section.icon}
                </div>
                
                <div className="w-full text-center">
                  <span className={cn(
                    "text-[10px] xs:text-xs font-medium transition-all duration-200 line-clamp-1",
                    activeSection === section.id 
                      ? "text-pink-600 font-semibold" 
                      : "text-gray-600 group-hover:text-gray-800"
                  )}>
                    {section.title}
                  </span>
                </div>
              </div>
              
              {activeSection === section.id && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"></div>
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-pink-300 blur-sm opacity-50"></div>
                </>
              )}
            </button>
          ))}
        </div>
        
        {/* Sección de título expandido */}
        {currentSection && (
          <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {currentSection.fullTitle}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentSection.description}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {currentSection.step}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTENIDO DE LA SECCIÓN ACTUAL */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {activeSection === 'basic-info' && (
          <div className="space-y-6">
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información Básica</h3>
              <div className="space-y-6">
                <div>
                  <label className="editor-label">Título de la invitación *</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="Ej: ¡Nuestra Boda!"
                    value={eventData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="editor-label">Subtítulo o eslogan</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="Ej: Ana & Carlos"
                    value={eventData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="editor-label">Mensaje principal *</label>
                  <textarea 
                    className="editor-input editor-textarea"
                    placeholder="Escribe un mensaje cálido para tus invitados..."
                    rows={4}
                    value={eventData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                  <div className="text-right mt-2">
                    <span className="text-sm text-gray-500">
                      {eventData.message.length}/500 caracteres
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de los Novios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="editor-label">Nombre de la novia *</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="Ana María"
                    value={eventData.brideName}
                    onChange={(e) => handleInputChange('brideName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="editor-label">Nombre del novio *</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="Carlos Eduardo"
                    value={eventData.groomName}
                    onChange={(e) => handleInputChange('groomName', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'date-time' && (
          <div className="editor-section p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Fecha y Hora del Evento</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="editor-label">Fecha del evento *</label>
                  <input 
                    type="date" 
                    className="editor-input"
                    value={eventData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="editor-label">Hora de inicio *</label>
                  <input 
                    type="time" 
                    className="editor-input"
                    value={eventData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="editor-label">Hora de finalización</label>
                <input 
                  type="time" 
                  className="editor-input"
                  value={eventData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                />
              </div>
              
              <div>
                <label className="editor-label mb-3 block">Recordatorios automáticos</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="rounded text-pink-500 focus:ring-pink-500"
                      checked={reminders.oneWeek}
                      onChange={() => handleReminderChange('oneWeek')}
                    />
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900">Recordatorio 1 semana antes</span>
                        <p className="text-sm text-gray-500">Se enviará automáticamente a todos los invitados</p>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="rounded text-pink-500 focus:ring-pink-500"
                      checked={reminders.oneDay}
                      onChange={() => handleReminderChange('oneDay')}
                    />
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900">Recordatorio 1 día antes</span>
                        <p className="text-sm text-gray-500">Recordatorio final del evento</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'location' && (
          <div className="space-y-6">
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ubicación del Evento</h3>
              <div className="space-y-6">
                <div>
                  <label className="editor-label">Nombre del lugar *</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="Ej: Salón de Eventos Las Flores"
                    value={eventData.locationName}
                    onChange={(e) => handleInputChange('locationName', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="editor-label">Dirección completa *</label>
                  <textarea 
                    className="editor-input editor-textarea"
                    placeholder="Dirección, ciudad, estado, código postal"
                    rows={3}
                    value={eventData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="editor-label">Instrucciones adicionales</label>
                  <textarea 
                    className="editor-input editor-textarea"
                    placeholder="Instrucciones de estacionamiento, entradas, etc."
                    rows={2}
                    value={eventData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Mapa y Coordenadas
                </div>
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-gray-300 mb-4">
                  <MapPin className="h-8 w-8 text-pink-500" />
                </div>
                <p className="text-gray-700 font-medium mb-1">Mapa interactivo</p>
                <p className="text-sm text-gray-500">Se mostrará automáticamente con la dirección proporcionada</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <Globe className="h-3 w-3 mr-2" />
                    Ver en Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'design' && (
          <div className="space-y-6">
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Colores y Tema
                </div>
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="editor-label mb-3 block">Color principal del tema</label>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleInputChange('colorScheme', color.value)}
                        className={cn(
                          "flex flex-col items-center gap-1",
                          eventData.colorScheme === color.value && "ring-2 ring-pink-500 ring-offset-2 rounded-lg"
                        )}
                      >
                        <div
                          className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 shadow-sm transition-transform hover:scale-105"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                        <span className="text-xs text-gray-600">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="editor-label">Tipografía</label>
                  <select 
                    className="editor-input editor-select"
                    value={eventData.typography}
                    onChange={(e) => handleInputChange('typography', e.target.value)}
                  >
                    {typographyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Imágenes y Fondo
                </div>
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-400 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-50 border border-pink-100 mb-4">
                    <ImageIcon className="h-8 w-8 text-pink-500" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">Sube una imagen de portada</p>
                  <p className="text-sm text-gray-500 mb-4">Recomendado: 1200x800 px, JPG o PNG, máximo 5MB</p>
                  <Button variant="outline" className="border-gray-300">
                    Seleccionar archivo
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-video bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg border border-gray-200"></div>
                  <div className="aspect-video bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border border-gray-200"></div>
                  <div className="aspect-video bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg border border-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'guests' && (
          <div className="editor-section p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de Invitados
              </div>
            </h3>
            <div className="space-y-6">
              <div>
                <label className="editor-label mb-3 block">Método de invitación</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setInvitationMethod('email')}
                    className={cn(
                      "editor-btn editor-btn-outline h-auto py-4 text-left transition-all",
                      invitationMethod === 'email' && "border-pink-500 text-pink-600 bg-pink-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Por correo</div>
                        <p className="text-xs text-gray-500 mt-1">Enviar enlaces por email</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setInvitationMethod('link')}
                    className={cn(
                      "editor-btn editor-btn-outline h-auto py-4 text-left transition-all",
                      invitationMethod === 'link' && "border-pink-500 text-pink-600 bg-pink-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <Share2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Enlace público</div>
                        <p className="text-xs text-gray-500 mt-1">Cualquiera con el enlace</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setInvitationMethod('whatsapp')}
                    className={cn(
                      "editor-btn editor-btn-outline h-auto py-4 text-left transition-all",
                      invitationMethod === 'whatsapp' && "border-pink-500 text-pink-600 bg-pink-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Por WhatsApp</div>
                        <p className="text-xs text-gray-500 mt-1">Compartir directamente</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="editor-label">Añadir invitados</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    className="editor-input flex-1"
                    placeholder="correo@ejemplo.com"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGuest()}
                  />
                  <Button 
                    onClick={addGuest}
                    disabled={!newGuestEmail.trim()}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    Añadir
                  </Button>
                </div>
              </div>
              
              <div className="editor-guest-list max-h-80">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">Lista de invitados ({guests.length})</h4>
                  <button className="text-sm text-pink-600 hover:text-pink-700">
                    Importar desde Excel
                  </button>
                </div>
                
                {guests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p>No hay invitados añadidos aún</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {guests.map((guest) => (
                      <div key={guest.id} className="editor-guest-item">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="editor-guest-avatar">
                              {guest.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="editor-guest-name">{guest.name}</div>
                              <div className="editor-guest-email truncate">{guest.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "editor-guest-status",
                              guest.status === 'confirmed' 
                                ? 'editor-guest-status-confirmed' 
                                : 'editor-guest-status-pending'
                            )}>
                              {guest.status === 'confirmed' ? '✓ Confirmado' : '⏳ Pendiente'}
                            </div>
                            <button
                              onClick={() => removeGuest(guest.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Eliminar"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'extras' && (
          <div className="space-y-6">
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Regalos y Detalles
                </div>
              </h3>
              <div>
                <label className="editor-label">Mensaje sobre regalos</label>
                <textarea 
                  className="editor-input editor-textarea"
                  placeholder="Información sobre regalos..."
                  rows={3}
                  value={eventData.giftMessage}
                  onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Sugerencia: Puedes incluir información sobre lista de bodas, preferencias, etc.
                </div>
              </div>
            </div>
            
            <div className="editor-section p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Redes Sociales y Compartir</h3>
              <div className="space-y-4">
                <div>
                  <label className="editor-label">Hashtag del evento</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        className="editor-input pl-8"
                        placeholder="#MiBodaFeliz"
                        value={eventData.hashtag}
                        onChange={(e) => handleInputChange('hashtag', e.target.value)}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">#</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="editor-label">Instagram para fotos</label>
                  <input 
                    type="text" 
                    className="editor-input"
                    placeholder="@tuevento"
                    value={eventData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="editor-label mb-3 block">Botones para compartir</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <span className="text-blue-500">f</span> Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <span className="text-blue-400">𝕏</span> Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <span className="text-pink-500">ig</span> Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <span className="text-green-500">WA</span> WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'settings' && (
          <div className="editor-section p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración y Privacidad
              </div>
            </h3>
            <div className="space-y-6">
              <div>
                <label className="editor-label mb-3 block">Privacidad de la invitación</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="privacy" 
                      className="text-pink-500 focus:ring-pink-500"
                      checked={eventData.privacy === 'public'}
                      onChange={() => handleInputChange('privacy', 'public')}
                    />
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900">Pública</span>
                        <p className="text-sm text-gray-500">Cualquiera con el enlace puede ver la invitación</p>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="privacy" 
                      className="text-pink-500 focus:ring-pink-500"
                      checked={eventData.privacy === 'private'}
                      onChange={() => handleInputChange('privacy', 'private')}
                    />
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900">Privada</span>
                        <p className="text-sm text-gray-500">Solo invitados pueden ver la invitación</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="editor-label">Idioma</label>
                  <select 
                    className="editor-input editor-select"
                    value={eventData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                  >
                    <option>Español</option>
                    <option>English</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                    <option>Italiano</option>
                  </select>
                </div>
                
                <div>
                  <label className="editor-label">Zona horaria</label>
                  <select 
                    className="editor-input editor-select"
                    value={eventData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option>CDMX (UTC-6)</option>
                    <option>Barcelona (UTC+1)</option>
                    <option>Nueva York (UTC-5)</option>
                    <option>Londres (UTC+0)</option>
                    <option>Tokio (UTC+9)</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Vista previa completa
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600"
                    onClick={() => onSectionChange('extras')}
                  >
                    ← Volver a Extras
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    onClick={() => alert('¡Invitación guardada exitosamente!')}
                  >
                    Guardar y finalizar
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}