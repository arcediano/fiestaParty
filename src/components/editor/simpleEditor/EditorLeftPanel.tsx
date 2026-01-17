// src/components/editor/simpleEditor/EditorLeftPanel.tsx
'use client';

import { cn } from '@/lib/utils';

interface EditorLeftPanelProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
  selectedTemplate: string | null;
}

export function EditorLeftPanel({ onSectionChange, activeSection, selectedTemplate }: EditorLeftPanelProps) {
  // Secciones del editor en tabs horizontales
  const sections = [
    { id: 'basic-info', title: 'Información Básica', icon: '📝', description: 'Título, novios y descripción' },
    { id: 'date-time', title: 'Fecha y Hora', icon: '📅', description: 'Fecha, hora y recordatorios' },
    { id: 'location', title: 'Ubicación', icon: '📍', description: 'Lugar, mapa y direcciones' },
    { id: 'design', title: 'Diseño', icon: '🎨', description: 'Colores, fuentes y estilo' },
    { id: 'guests', title: 'Invitados', icon: '👥', description: 'Lista y gestión de invitados' },
    { id: 'extras', title: 'Extras', icon: '✨', description: 'Regalos, hashtag y detalles' },
    { id: 'settings', title: 'Configuración', icon: '⚙️', description: 'Ajustes y privacidad' },
  ];

  return (
    <div className="h-full">
      {/* Header con info de plantilla */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Editor de Invitación</h2>
            <p className="text-sm text-gray-600">
              Plantilla seleccionada: <span className="font-medium text-pink-600">Boda Elegante</span>
            </p>
          </div>
          <button className="editor-btn editor-btn-outline text-sm">
            Cambiar plantilla
          </button>
        </div>
      </div>

      {/* TABS HORIZONTALES - UNA SOLA LÍNEA */}
      <div className="sticky top-[72px] z-10 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex min-w-max px-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "editor-tab flex-shrink-0 flex flex-col items-center justify-center min-w-[120px] px-4 py-3 relative group",
                activeSection === section.id ? "editor-tab-active" : ""
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              
              {/* Indicador activo */}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-pink-500 rounded-t-full"></div>
              )}
              
              {/* Tooltip hover */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                {section.description}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO DE LA SECCIÓN ACTUAL */}
      <div className="p-6 space-y-6 pb-20">
        {activeSection === 'basic-info' && (
          <BasicInfoSection />
        )}
        
        {activeSection === 'date-time' && (
          <DateTimeSection />
        )}
        
        {activeSection === 'location' && (
          <LocationSection />
        )}
        
        {activeSection === 'design' && (
          <DesignSection />
        )}
        
        {activeSection === 'guests' && (
          <GuestsSection />
        )}
        
        {activeSection === 'extras' && (
          <ExtrasSection />
        )}
        
        {activeSection === 'settings' && (
          <SettingsSection />
        )}
      </div>
    </div>
  );
}

// Componentes de cada sección
function BasicInfoSection() {
  return (
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
              defaultValue="¡Nuestra Boda!"
            />
          </div>
          
          <div>
            <label className="editor-label">Subtítulo o eslogan</label>
            <input 
              type="text" 
              className="editor-input"
              placeholder="Ej: Ana & Carlos"
              defaultValue="Ana & Carlos"
            />
          </div>
          
          <div>
            <label className="editor-label">Mensaje principal *</label>
            <textarea 
              className="editor-input editor-textarea"
              placeholder="Escribe un mensaje cálido para tus invitados..."
              rows={4}
              defaultValue="Con mucha alegría en nuestros corazones, queremos invitarte a compartir con nosotros el día más especial de nuestras vidas."
            />
            <div className="text-right mt-2">
              <span className="text-sm text-gray-500">120/500 caracteres</span>
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
              defaultValue="Ana María"
            />
          </div>
          <div>
            <label className="editor-label">Nombre del novio *</label>
            <input 
              type="text" 
              className="editor-input"
              placeholder="Carlos Eduardo"
              defaultValue="Carlos Eduardo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DateTimeSection() {
  return (
    <div className="editor-section p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Fecha y Hora del Evento</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="editor-label">Fecha del evento *</label>
            <input 
              type="date" 
              className="editor-input"
              defaultValue="2024-06-15"
            />
          </div>
          <div>
            <label className="editor-label">Hora de inicio *</label>
            <input 
              type="time" 
              className="editor-input"
              defaultValue="18:00"
            />
          </div>
        </div>
        
        <div>
          <label className="editor-label">Hora de finalización</label>
          <input 
            type="time" 
            className="editor-input"
            defaultValue="23:00"
          />
        </div>
        
        <div>
          <label className="editor-label mb-3 block">Recordatorios</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer">
              <input type="checkbox" className="rounded text-pink-500" defaultChecked />
              <div>
                <span className="font-medium">Recordatorio 1 semana antes</span>
                <p className="text-sm text-gray-500">Se enviará automáticamente a todos los invitados</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer">
              <input type="checkbox" className="rounded text-pink-500" defaultChecked />
              <div>
                <span className="font-medium">Recordatorio 1 día antes</span>
                <p className="text-sm text-gray-500">Recordatorio final del evento</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationSection() {
  return (
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
              defaultValue="Salón de Eventos Las Flores"
            />
          </div>
          
          <div>
            <label className="editor-label">Dirección completa *</label>
            <textarea 
              className="editor-input editor-textarea"
              placeholder="Dirección, ciudad, estado, código postal"
              rows={3}
              defaultValue="Av. Principal 123, Colonia Centro, Ciudad de México, 06000"
            />
          </div>
          
          <div>
            <label className="editor-label">Instrucciones adicionales</label>
            <textarea 
              className="editor-input editor-textarea"
              placeholder="Instrucciones de estacionamiento, entradas, etc."
              rows={2}
              defaultValue="Estacionamiento gratuito disponible en el sótano. Entrada por puerta principal."
            />
          </div>
        </div>
      </div>
      
      <div className="editor-section p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Mapa y Coordenadas</h3>
        <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">Vista previa del mapa</p>
            <p className="text-sm text-gray-500 mt-1">Se mostrará automáticamente con la dirección</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignSection() {
  return (
    <div className="space-y-6">
      <div className="editor-section p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Colores y Tema</h3>
        <div className="space-y-6">
          <div>
            <label className="editor-label">Color principal</label>
            <div className="flex gap-3">
              {['#EC4899', '#8B5CF6', '#10B981', '#3B82F6', '#F59E0B'].map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 rounded-lg cursor-pointer border-4 border-white shadow-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
              <button className="editor-btn editor-btn-outline">
                Personalizar
              </button>
            </div>
          </div>
          
          <div>
            <label className="editor-label">Tipografía</label>
            <select className="editor-input editor-select">
              <option>Playfair Display (Elegante)</option>
              <option>Montserrat (Moderno)</option>
              <option>Inter (Neutro)</option>
              <option>Dancing Script (Cursiva)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="editor-section p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Imágenes y Fondo</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-gray-600 mb-2">Arrastra tu imagen aquí o haz clic para subir</p>
            <p className="text-sm text-gray-500">Recomendado: 1200x800 px, JPG o PNG</p>
            <button className="editor-btn editor-btn-outline mt-4">
              Subir imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuestsSection() {
  return (
    <div className="editor-section p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Gestión de Invitados</h3>
      <div className="space-y-6">
        <div>
          <label className="editor-label">Método de invitación</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="editor-btn editor-btn-outline h-auto py-4">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-medium">Por correo</div>
              <p className="text-xs text-gray-500 mt-1">Enviar enlaces por email</p>
            </button>
            <button className="editor-btn editor-btn-outline h-auto py-4 border-pink-500 text-pink-600">
              <div className="text-2xl mb-2">🔗</div>
              <div className="font-medium">Enlace público</div>
              <p className="text-xs text-gray-500 mt-1">Cualquiera con el enlace</p>
            </button>
            <button className="editor-btn editor-btn-outline h-auto py-4">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">Por WhatsApp</div>
              <p className="text-xs text-gray-500 mt-1">Compartir directamente</p>
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
            />
            <button className="editor-btn editor-btn-primary">
              Añadir
            </button>
          </div>
        </div>
        
        <div className="editor-guest-list">
          <h4 className="font-bold text-gray-900 mb-4">Lista de invitados (3)</h4>
          {[
            { name: 'María González', email: 'maria@ejemplo.com', status: 'confirmed' },
            { name: 'Juan Pérez', email: 'juan@ejemplo.com', status: 'pending' },
            { name: 'Ana Rodríguez', email: 'ana@ejemplo.com', status: 'confirmed' },
          ].map((guest, index) => (
            <div key={index} className="editor-guest-item">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="editor-guest-avatar">
                    {guest.name.charAt(0)}
                  </div>
                  <div>
                    <div className="editor-guest-name">{guest.name}</div>
                    <div className="editor-guest-email">{guest.email}</div>
                  </div>
                </div>
                <div className={cn(
                  "editor-guest-status",
                  guest.status === 'confirmed' ? 'editor-guest-status-confirmed' : 'editor-guest-status-pending'
                )}>
                  {guest.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExtrasSection() {
  return (
    <div className="space-y-6">
      <div className="editor-section p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Regalos y Detalles</h3>
        <div>
          <label className="editor-label">Mensaje sobre regalos</label>
          <textarea 
            className="editor-input editor-textarea"
            placeholder="Información sobre regalos..."
            rows={3}
            defaultValue="Tu presencia es el mejor regalo. Si deseas hacernos un detalle, preferimos contribuciones a nuestra luna de miel."
          />
        </div>
      </div>
      
      <div className="editor-section p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Redes Sociales</h3>
        <div className="space-y-4">
          <div>
            <label className="editor-label">Hashtag del evento</label>
            <input 
              type="text" 
              className="editor-input"
              placeholder="#AnaYCarlos2024"
              defaultValue="#AnaYCarlos2024"
            />
          </div>
          <div>
            <label className="editor-label">Instagram para fotos</label>
            <input 
              type="text" 
              className="editor-input"
              placeholder="@anaycarlos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="editor-section p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Configuración y Privacidad</h3>
      <div className="space-y-6">
        <div>
          <label className="editor-label mb-3 block">Privacidad</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer">
              <input type="radio" name="privacy" className="text-pink-500" defaultChecked />
              <div>
                <span className="font-medium">Pública</span>
                <p className="text-sm text-gray-500">Cualquiera con el enlace puede ver la invitación</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer">
              <input type="radio" name="privacy" className="text-pink-500" />
              <div>
                <span className="font-medium">Privada</span>
                <p className="text-sm text-gray-500">Solo invitados pueden ver la invitación</p>
              </div>
            </label>
          </div>
        </div>
        
        <div>
          <label className="editor-label">Idioma</label>
          <select className="editor-input editor-select">
            <option>Español</option>
            <option>English</option>
            <option>Français</option>
          </select>
        </div>
        
        <div>
          <label className="editor-label">Zona horaria</label>
          <select className="editor-input editor-select">
            <option>CDMX (UTC-6)</option>
            <option>Barcelona (UTC+1)</option>
            <option>Nueva York (UTC-5)</option>
          </select>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button className="editor-btn editor-btn-primary flex-1">
              Guardar cambios
            </button>
            <button className="editor-btn editor-btn-outline">
              Vista previa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}