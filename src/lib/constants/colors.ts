// src/lib/constants/colors.ts
export interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  textColor: string;
}

export const colorSchemes: ColorScheme[] = [
  {
    id: 'pink',
    name: 'Rosa Vibrante',
    colors: ['#FF6B8B', '#FF8FA3', '#FFB3C1', '#FFE4E9'],
    primary: '#FF6B8B',
    secondary: '#FF8FA3',
    accent: '#FFE4E9',
    gradient: 'from-pink-500 to-rose-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'blue',
    name: 'Azul Profesional',
    colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#DBEAFE',
    gradient: 'from-blue-500 to-indigo-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'purple',
    name: 'Púrpura Elegante',
    colors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE'],
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#EDE9FE',
    gradient: 'from-purple-500 to-pink-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'green',
    name: 'Verde Fresco',
    colors: ['#10B981', '#34D399', '#6EE7B7', '#D1FAE5'],
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#D1FAE5',
    gradient: 'from-green-500 to-emerald-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'sunset',
    name: 'Atardecer',
    colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FEF3C7'],
    primary: '#F59E0B',
    secondary: '#FBBF24',
    accent: '#FEF3C7',
    gradient: 'from-amber-500 to-orange-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'ocean',
    name: 'Océano',
    colors: ['#06B6D4', '#22D3EE', '#67E8F9', '#CFFAFE'],
    primary: '#06B6D4',
    secondary: '#22D3EE',
    accent: '#CFFAFE',
    gradient: 'from-cyan-500 to-blue-500',
    textColor: 'text-gray-900',
  },
  {
    id: 'monochrome',
    name: 'Monocromático',
    colors: ['#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'],
    primary: '#6B7280',
    secondary: '#9CA3AF',
    accent: '#F3F4F6',
    gradient: 'from-gray-500 to-gray-700',
    textColor: 'text-gray-900',
  },
  {
    id: 'vibrant',
    name: 'Vibrante',
    colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#06B6D4'],
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    gradient: 'from-pink-500 via-purple-500 to-cyan-500',
    textColor: 'text-white',
  },
];

export function getColorSchemeById(id: string): ColorScheme | undefined {
  return colorSchemes.find(c => c.id === id);
}

export function getDefaultColorScheme(): ColorScheme {
  return colorSchemes[0]; // Rosa vibrante por defecto
}