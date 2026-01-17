// src/lib/constants/templates.ts
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'free' | 'premium';
  thumbnailColor: string;
  features: string[];
  isPremium: boolean;
  price?: number;
  tags: string[];
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y contemporáneo perfecto para eventos actuales',
    category: 'free',
    thumbnailColor: 'from-blue-400 to-cyan-400',
    features: ['Diseño responsive', 'Animaciones suaves', 'Paleta moderna'],
    isPremium: false,
    tags: ['moderno', 'elegante', 'minimalista'],
  },
  {
    id: 'elegant',
    name: 'Elegante',
    description: 'Para eventos formales y sofisticados',
    category: 'free',
    thumbnailColor: 'from-purple-400 to-pink-400',
    features: ['Tipografía elegante', 'Espaciado premium', 'Detalles dorados'],
    isPremium: false,
    tags: ['elegante', 'formal', 'sofisticado'],
  },
  {
    id: 'rustic',
    name: 'Rústico',
    description: 'Estilo campestre y acogedor para bodas y eventos al aire libre',
    category: 'free',
    thumbnailColor: 'from-amber-400 to-orange-400',
    features: ['Texturas naturales', 'Colores tierra', 'Iconografía orgánica'],
    isPremium: false,
    tags: ['rústico', 'natural', 'campestre'],
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Menos es más, diseño esencial y atemporal',
    category: 'premium',
    thumbnailColor: 'from-gray-400 to-gray-600',
    features: ['Espacio negativo', 'Tipografía geométrica', 'Animaciones precisas'],
    isPremium: true,
    price: 4.99,
    tags: ['minimalista', 'simple', 'elegante'],
  },
  {
    id: 'luxury',
    name: 'Lujo',
    description: 'Para eventos exclusivos y VIP, con acabados dorados',
    category: 'premium',
    thumbnailColor: 'from-yellow-400 to-amber-400',
    features: ['Efectos dorados', 'Animaciones premium', 'Diseño exclusivo'],
    isPremium: true,
    price: 4.99,
    tags: ['lujo', 'exclusivo', 'premium'],
  },
  {
    id: 'playful',
    name: 'Divertido',
    description: 'Colorido y animado perfecto para fiestas y cumpleaños',
    category: 'premium',
    thumbnailColor: 'from-green-400 to-teal-400',
    features: ['Animaciones juguetonas', 'Colores vibrantes', 'Iconos personalizados'],
    isPremium: true,
    price: 4.99,
    tags: ['divertido', 'colorido', 'animado'],
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Estilo retro inspirado en épocas pasadas',
    category: 'premium',
    thumbnailColor: 'from-rose-400 to-red-400',
    features: ['Texturas envejecidas', 'Tipografía clásica', 'Colores sepia'],
    isPremium: true,
    price: 4.99,
    tags: ['vintage', 'retro', 'clásico'],
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    description: 'Profesional y serio para eventos empresariales',
    category: 'premium',
    thumbnailColor: 'from-indigo-400 to-blue-400',
    features: ['Diseño profesional', 'Paleta corporativa', 'Elementos formales'],
    isPremium: true,
    price: 4.99,
    tags: ['corporativo', 'profesional', 'empresarial'],
  },
];

// Funciones utilitarias
export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getFreeTemplates(): Template[] {
  return templates.filter(t => !t.isPremium);
}

export function getPremiumTemplates(): Template[] {
  return templates.filter(t => t.isPremium);
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase();
  return templates.filter(t => 
    t.name.toLowerCase().includes(lowercaseQuery) ||
    t.description.toLowerCase().includes(lowercaseQuery) ||
    t.tags.some(tag => tag.includes(lowercaseQuery))
  );
}