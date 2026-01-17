// src/lib/hooks/useSimpleEditor.ts
'use client';

import { create } from 'zustand';

interface Guest {
  id: string;
  name: string;
  email: string;
  confirmed: boolean;
}

interface InvitationData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  templateId: string;
  colorScheme: string;
  guests: Guest[];
  isPremium: boolean;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  updatedAt: string;
  createdAt: string;
}

interface SimpleEditorStore {
  // Estado
  invitationData: InvitationData;
  isSaving: boolean; // <-- AÑADIR ESTA PROPIEDAD
  lastSaveTime: string | null;
  
  // Acciones
  updateField: (field: keyof InvitationData, value: any) => void;
  addGuest: (guest: Omit<Guest, 'id' | 'confirmed'>) => void;
  removeGuest: (id: string) => void;
  toggleGuestConfirmation: (id: string) => void;
  shareInvitation: () => void;
  exportToPDF: () => void;
  upgradeToPremium: () => void;
  resetData: () => void;
  saveChanges: () => Promise<void>; // <-- NUEVA ACCIÓN
}

const initialData: InvitationData = {
  id: '1',
  title: 'Mi Evento Especial',
  description: 'Una celebración inolvidable llena de momentos especiales',
  date: '2024-12-25',
  time: '18:00',
  duration: '4h',
  location: 'Salón Jardines del Paraíso',
  address: 'Av. Principal #123, Col. Centro, Ciudad de México',
  templateId: 'classic',
  colorScheme: 'pink-rose',
  guests: [
    { id: '1', name: 'Juan Pérez', email: 'juan@ejemplo.com', confirmed: true },
    { id: '2', name: 'María García', email: 'maria@ejemplo.com', confirmed: false },
    { id: '3', name: 'Carlos López', email: 'carlos@ejemplo.com', confirmed: true },
    { id: '4', name: 'Ana Martínez', email: 'ana@ejemplo.com', confirmed: false },
  ],
  isPremium: false,
  hostName: 'Alejandro Rodríguez',
  hostEmail: 'contacto@evento.com',
  hostPhone: '+52 55 1234 5678',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

export const useSimpleEditor = create<SimpleEditorStore>((set, get) => ({
  // Estado inicial
  invitationData: initialData,
  isSaving: false, // <-- INICIALIZAR
  lastSaveTime: null,
  
  // Acción para guardar cambios (con simulación de API)
  saveChanges: async () => {
    if (get().isSaving) return;
    
    set({ isSaving: true });
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = get().invitationData;
      
      // Guardar en localStorage (o enviar a API real)
      if (typeof window !== 'undefined') {
        localStorage.setItem('editor-draft', JSON.stringify(data));
      }
      
      set({ 
        lastSaveTime: new Date().toISOString(),
        isSaving: false 
      });
      
      console.log('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      set({ isSaving: false });
    }
  },
  
  updateField: (field, value) =>
    set((state) => {
      const newData = {
        ...state.invitationData,
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
      
      // Auto-guardar después de ciertos cambios
      const importantFields = ['title', 'date', 'location', 'templateId'];
      if (importantFields.includes(field)) {
        setTimeout(() => get().saveChanges(), 500);
      }
      
      return {
        invitationData: newData,
      };
    }),
  
  addGuest: (guest) =>
    set((state) => {
      const newData = {
        ...state.invitationData,
        guests: [
          ...state.invitationData.guests,
          {
            id: Date.now().toString(),
            ...guest,
            confirmed: false,
          },
        ],
        updatedAt: new Date().toISOString(),
      };
      
      // Auto-guardar
      setTimeout(() => get().saveChanges(), 500);
      
      return {
        invitationData: newData,
      };
    }),
  
  removeGuest: (id) =>
    set((state) => {
      const newData = {
        ...state.invitationData,
        guests: state.invitationData.guests.filter((g) => g.id !== id),
        updatedAt: new Date().toISOString(),
      };
      
      setTimeout(() => get().saveChanges(), 500);
      
      return {
        invitationData: newData,
      };
    }),
  
  toggleGuestConfirmation: (id) =>
    set((state) => {
      const newData = {
        ...state.invitationData,
        guests: state.invitationData.guests.map((guest) =>
          guest.id === id
            ? { ...guest, confirmed: !guest.confirmed }
            : guest
        ),
        updatedAt: new Date().toISOString(),
      };
      
      return {
        invitationData: newData,
      };
    }),
  
  shareInvitation: () => {
    const data = get().invitationData;
    console.log('Compartiendo invitación:', data);
    
    // Simular share
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: data.title,
        text: `Te invito a mi evento: ${data.title}`,
        url: window.location.href,
      });
    } else {
      alert(`URL para compartir: ${window.location.origin}/invitation/${data.id}`);
    }
  },
  
  exportToPDF: () => {
    const data = get().invitationData;
    console.log('Exportando a PDF:', data);
    
    // Simular exportación
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${data.title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .info { margin: 20px 0; }
              .guest-list { margin-top: 30px; }
            </style>
          </head>
          <body>
            <h1>${data.title}</h1>
            <div class="info">
              <p><strong>Fecha:</strong> ${data.date}</p>
              <p><strong>Hora:</strong> ${data.time}</p>
              <p><strong>Lugar:</strong> ${data.location}</p>
              <p><strong>Dirección:</strong> ${data.address}</p>
            </div>
            ${data.description ? `<div class="info"><strong>Descripción:</strong><p>${data.description}</p></div>` : ''}
            <div class="guest-list">
              <h3>Invitados (${data.guests.length})</h3>
              <ul>
                ${data.guests.map(g => `<li>${g.name} - ${g.confirmed ? '✓ Confirmado' : 'Pendiente'}</li>`).join('')}
              </ul>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  },
  
  upgradeToPremium: () =>
    set((state) => {
      const newData = {
        ...state.invitationData,
        isPremium: true,
        updatedAt: new Date().toISOString(),
      };
      
      // Guardar automáticamente
      setTimeout(() => get().saveChanges(), 500);
      
      return {
        invitationData: newData,
      };
    }),
  
  resetData: () =>
    set({
      invitationData: initialData,
      isSaving: false,
      lastSaveTime: null,
    }),
}));

// Hook helper con acceso a isSaving
export const useEditorState = () => {
  const isSaving = useSimpleEditor((state) => state.isSaving);
  const lastSaveTime = useSimpleEditor((state) => state.lastSaveTime);
  const saveChanges = useSimpleEditor((state) => state.saveChanges);
  const invitationData = useSimpleEditor((state) => state.invitationData);
  
  return {
    isSaving,
    lastSaveTime,
    saveChanges,
    invitationData,
    // Métodos para formato
    getLastSaveText: () => {
      if (!lastSaveTime) return 'Nunca guardado';
      const time = new Date(lastSaveTime);
      return `Guardado ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    },
  };
};