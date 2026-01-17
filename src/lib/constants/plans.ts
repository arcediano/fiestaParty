export const CASUAL_PRICING = {
  free: {
    name: 'Gratis',
    price: '$0',
    period: 'para siempre',
    features: [
      '15 plantillas básicas',
      'Editor simple',
      'Compartir por link/WhatsApp',
      'RSVP básico',
      'Guardado automático',
      'Sin registro obligatorio',
    ],
    cta: 'Comenzar gratis',
    ctaVariant: 'secondary' as const, // Usamos 'secondary' en lugar de 'default'
  },
  premium: {
    name: 'Premium',
    price: '$4.99',
    period: 'pago único por invitación',
    features: [
      'Todas las plantillas premium',
      'Sin marca de agua',
      'Plantillas exclusivas',
      'Descarga PDF de alta calidad',
      'Soporte prioritario',
      'Estadísticas básicas',
    ],
    cta: 'Crear invitación premium',
    ctaVariant: 'premium' as const, // Usamos 'premium' en lugar de 'primary'
  },
  credits: {
    name: 'Pack Créditos',
    price: '$9.99',
    period: '3 invitaciones premium',
    features: [
      '3 invitaciones premium',
      'Ahorra 33%',
      'Usa cuando quieras',
      'Sin fecha de expiración',
      'Comparte entre eventos',
      'Mejor relación calidad-precio',
    ],
    cta: 'Comprar pack',
    ctaVariant: 'outline' as const, // Correcto
  },
};

export const PROFESSIONAL_PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: '$19.99',
    period: '/mes',
    features: [
      '50 invitaciones/mes',
      'Todas las plantillas premium',
      'Analytics básicos',
      'Dashboard profesional',
      'Gestión de invitados',
      'Soporte por email',
    ],
    cta: 'Comenzar prueba',
    ctaVariant: 'secondary' as const, // Usamos 'secondary'
    recommended: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49.99',
    period: '/mes',
    features: [
      'Invitaciones ilimitadas',
      'Gestión de clientes',
      'Colaboración en equipo (3 usuarios)',
      'White-label',
      'Exportación Excel',
      'Soporte prioritario',
    ],
    cta: 'Elegir plan Pro',
    ctaVariant: 'premium' as const, // Usamos 'premium' en lugar de 'primary'
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Empresa',
    price: '$199.99',
    period: '/mes',
    features: [
      'Todo lo del plan Pro',
      'API access',
      'Usuarios ilimitados',
      'SLA 99.9%',
      'Soporte 24/7',
      'Onboarding personalizado',
    ],
    cta: 'Contactar ventas',
    ctaVariant: 'outline' as const, // Correcto
    recommended: false,
  },
];