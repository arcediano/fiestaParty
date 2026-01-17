// ==============================================
// ENUMS Y TIPOS BÁSICOS
// ==============================================

export type TemplateCategory = 
  | 'birthday'           // Cumpleaños
  | 'wedding'            // Bodas
  | 'baby-shower'        // Baby shower
  | 'corporate'          // Eventos corporativos
  | 'graduation'         // Graduaciones
  | 'anniversary'        // Aniversarios
  | 'christmas'          // Navidad
  | 'halloween'          // Halloween
  | 'thanksgiving'       // Acción de gracias
  | 'new-year'           // Año nuevo
  | 'engagement'         // Compromisos
  | 'retirement'         // Jubilaciones
  | 'housewarming'       // Fiestas de casa nueva
  | 'bridal-shower'      // Despedida de soltera
  | 'gender-reveal'     // Revelación de género
  | 'quinceanera'       // 15 años
  | 'baptism'           // Bautizos
  | 'communion'         // Comuniones
  | 'other'             // Otros

export type TemplateStatus = 
  | 'draft'             // Borrador
  | 'published'         // Publicado
  | 'archived'         // Archivado

export type ColorScheme = {
  primary: string      // Color primario (#FF6B8B)
  secondary: string    // Color secundario (#4ECDC4)
  accent: string       // Color de acento (#45B7D1)
  background: string   // Color de fondo
  text: string        // Color de texto
  muted: string       // Color atenuado
}

export type TemplateTheme = 
  | 'modern'          // Diseño moderno
  | 'classic'         // Diseño clásico
  | 'elegant'         // Elegante
  | 'minimalist'      // Minimalista
  | 'vintage'         // Vintage/Retro
  | 'playful'         // Juguetón
  | 'romantic'        // Romántico
  | 'professional'    // Profesional
  | 'festive'         // Festivo
  | 'seasonal'        // Estacional

export type TemplateLayout = 
  | 'single-page'     // Una sola página
  | 'multi-page'      // Múltiples páginas
  | 'interactive'     // Interactivo
  | 'animated'        // Animado
  | 'responsive'      // Responsive especial

// ==============================================
// INTERFACES PRINCIPALES
// ==============================================

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  theme: TemplateTheme
  layout: TemplateLayout
  isPremium: boolean
  price?: number
  rating: number
  usageCount: number
  htmlContent: string
  cssContent: string
  jsContent?: string
  previewImage?: string
  features: string[]
  tags: string[]
  colorScheme: ColorScheme
  isActive: boolean
  createdAt: string
  updatedAt: string
  metadata?: TemplateMetadata
}

export interface TemplateMetadata {
  compatibleEvents: string[]
  recommendedFor: string[]
  minGuests: number
  maxGuests: number
  setupTime: number // en minutos
  difficulty: 'easy' | 'medium' | 'advanced'
  accessibility: {
    screenReader: boolean
    highContrast: boolean
    keyboardNavigation: boolean
  }
}

export interface StrapiTemplateResponse {
  data: {
    id: string
    attributes: Omit<Template, 'id'> & {
      previewImage?: {
        data?: {
          id: string
          attributes: {
            name: string
            alternativeText: string
            caption: string
            width: number
            height: number
            formats: {
              thumbnail?: ImageFormat
              small?: ImageFormat
              medium?: ImageFormat
              large?: ImageFormat
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: string | null
            provider: string
            createdAt: string
            updatedAt: string
          }
        }
      }
      category: {
        data: {
          id: string
          attributes: {
            name: string
            slug: string
            description?: string
            icon?: string
          }
        }
      }
    }
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

// ==============================================
// USUARIOS Y PLANTILLAS PERSONALIZADAS
// ==============================================

export interface UserTemplate {
  id: string
  userId: string
  templateId: string
  template: Template
  customData: Record<string, any>
  customizations: TemplateCustomization[]
  status: TemplateStatus
  lastEditedAt: string
  createdAt: string
  updatedAt: string
}

export interface TemplateCustomization {
  id: string
  sectionId: string
  fieldId: string
  value: any
  modifiedAt: string
}

// ==============================================
// EDITOR Y CAMPOS
// ==============================================

export type FieldType = 
  | 'text'             // Texto simple
  | 'textarea'         // Área de texto
  | 'number'           // Número
  | 'date'             // Fecha
  | 'time'             // Hora
  | 'datetime'         // Fecha y hora
  | 'color'            // Selector de color
  | 'image'            // Imagen
  | 'select'           // Selector
  | 'multiselect'      // Selector múltiple
  | 'checkbox'         // Checkbox
  | 'radio'            // Radio buttons
  | 'range'            // Rango
  | 'file'             // Archivo
  | 'richtext'         // Texto enriquecido
  | 'code'             // Código
  | 'json'             // JSON

export interface TemplateField {
  id: string
  type: FieldType
  label: string
  description?: string
  placeholder?: string
  defaultValue: any
  options?: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
  validation?: FieldValidation
  required: boolean
  visible: boolean
  editable: boolean
  order: number
  dependencies?: FieldDependency[]
}

export interface FieldValidation {
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  patternMessage?: string
  custom?: (value: any) => boolean
}

export interface FieldDependency {
  fieldId: string
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains'
  value: any
}

export interface TemplateSection {
  id: string
  name: string
  description?: string
  icon?: string
  order: number
  fields: TemplateField[]
  isCollapsible: boolean
  isCollapsed: boolean
}

// ==============================================
// INVITACIONES
// ==============================================

export interface Invitation {
  id: string
  title: string
  description?: string
  templateId: string
  template: Template
  userTemplateId?: string
  userTemplate?: UserTemplate
  eventDate: string
  eventTime?: string
  location: string
  locationDetails?: LocationDetails
  maxGuests: number
  isPublished: boolean
  isActive: boolean
  settings: InvitationSettings
  customizations: Record<string, any>
  metadata: InvitationMetadata
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface LocationDetails {
  address: string
  city: string
  state?: string
  country: string
  postalCode?: string
  coordinates?: {
    lat: number
    lng: number
  }
  mapUrl?: string
  additionalInfo?: string
}

export interface InvitationSettings {
  allowPlusOne: boolean
  maxPlusOnePerGuest: number
  requireRsvp: boolean
  rsvpDeadline?: string
  showGuestList: boolean
  allowComments: boolean
  allowGifts: boolean
  passwordProtected: boolean
  password?: string
  theme: InvitationTheme
  notifications: NotificationSettings
}

export interface InvitationTheme {
  colors: ColorScheme
  fontFamily: string
  fontSize: 'small' | 'medium' | 'large'
  animations: boolean
  backgroundMusic?: string
}

export interface NotificationSettings {
  onRsvp: boolean
  onComment: boolean
  onGift: boolean
  reminderDays: number[]
  reminderTime: string
}

export interface InvitationMetadata {
  views: number
  uniqueViews: number
  rsvpCount: number
  confirmedCount: number
  declinedCount: number
  pendingCount: number
  lastViewedAt?: string
  popularTimes: string[]
}

// ==============================================
// INVITADOS
// ==============================================

export type GuestStatus = 
  | 'pending'          // Pendiente
  | 'invited'          // Invitado
  | 'confirmed'        // Confirmado
  | 'declined'         // Rechazado
  | 'maybe'            // Tal vez
  | 'attended'         // Asistió
  | 'no-show'          // No se presentó

export interface Guest {
  id: string
  invitationId: string
  invitation?: Invitation
  name: string
  email: string
  phone?: string
  status: GuestStatus
  plusOne: boolean
  plusOneCount: number
  plusOneNames?: string[]
  dietaryRestrictions: string[]
  allergies: string[]
  specialRequests?: string
  adults: number
  children: number
  checkInAt?: string
  sentAt?: string
  respondedAt?: string
  notes?: string
  metadata: GuestMetadata
  createdAt: string
  updatedAt: string
}

export interface GuestMetadata {
  openCount: number
  lastOpenedAt?: string
  deviceInfo?: DeviceInfo
  locationInfo?: LocationInfo
  rsvpSource?: 'email' | 'link' | 'qr' | 'manual'
}

export interface DeviceInfo {
  deviceType: string
  browser: string
  os: string
  ipAddress?: string
}

export interface LocationInfo {
  country?: string
  city?: string
  timezone?: string
}

// ==============================================
// EVENTOS
// ==============================================

export type EventType = 
  | 'personal'         // Personal
  | 'corporate'        // Corporativo
  | 'non-profit'       // Sin fines de lucro
  | 'educational'      // Educativo

export interface Event {
  id: string
  userId: string
  title: string
  description?: string
  type: EventType
  invitations: Invitation[]
  startDate: string
  endDate?: string
  budget?: number
  status: EventStatus
  tasks: EventTask[]
  timeline: TimelineItem[]
  isRecurring: boolean
  recurrenceRule?: string
  metadata: EventMetadata
  createdAt: string
  updatedAt: string
}

export type EventStatus = 
  | 'planning'         // En planificación
  | 'active'           // Activo
  | 'in-progress'      // En curso
  | 'completed'        // Completado
  | 'cancelled'        // Cancelado

export interface EventTask {
  id: string
  title: string
  description?: string
  assignedTo?: string
  dueDate?: string
  completed: boolean
  completedAt?: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

export interface TimelineItem {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  type: 'milestone' | 'task' | 'reminder' | 'deadline'
  completed: boolean
}

export interface EventMetadata {
  totalGuests: number
  confirmedGuests: number
  budgetUsed: number
  tasksCompleted: number
  totalTasks: number
}

// ==============================================
// REGALOS
// ==============================================

export type GiftStatus = 
  | 'available'        // Disponible
  | 'reserved'         // Reservado
  | 'purchased'        // Comprado
  | 'delivered'        // Entregado
  | 'thanked'          // Agradecido

export interface Gift {
  id: string
  invitationId: string
  invitation?: Invitation
  name: string
  description?: string
  url?: string
  price?: number
  quantity: number
  reserved: number
  purchased: number
  status: GiftStatus
  priority: 'low' | 'medium' | 'high'
  category: GiftCategory
  imageUrl?: string
  metadata: GiftMetadata
  createdAt: string
  updatedAt: string
}

export type GiftCategory = 
  | 'home'             // Hogar
  | 'kitchen'          // Cocina
  | 'electronics'      // Electrónica
  | 'fashion'          // Moda
  | 'beauty'           // Belleza
  | 'books'           // Libros
  | 'toys'            // Juguetes
  | 'experience'       // Experiencia
  | 'cash'            // Dinero
  | 'charity'         // Donación
  | 'other'           // Otro

export interface GiftMetadata {
  views: number
  clicks: number
  purchases: number
  lastViewedAt?: string
}

export interface GiftReservation {
  id: string
  giftId: string
  gift?: Gift
  guestId: string
  guest?: Guest
  quantity: number
  status: 'reserved' | 'purchased' | 'cancelled'
  purchasedAt?: string
  thankYouSent: boolean
  thankYouSentAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// ==============================================
// ANALÍTICAS
// ==============================================

export interface Analytics {
  invitationId: string
  invitation?: Invitation
  totalViews: number
  uniqueViews: number
  totalGuests: number
  confirmedGuests: number
  declinedGuests: number
  pendingGuests: number
  rsvpRate: number
  averageResponseTime: number // en horas
  popularTimes: PopularTime[]
  deviceBreakdown: DeviceBreakdown[]
  locationBreakdown: LocationBreakdown[]
  dailyStats: DailyStat[]
  referralSources: ReferralSource[]
  createdAt: string
  updatedAt: string
}

export interface PopularTime {
  hour: number
  dayOfWeek: string
  views: number
}

export interface DeviceBreakdown {
  deviceType: string
  count: number
  percentage: number
}

export interface LocationBreakdown {
  country: string
  city?: string
  count: number
  percentage: number
}

export interface DailyStat {
  date: string
  views: number
  uniqueViews: number
  rsvps: number
  confirmations: number
}

export interface ReferralSource {
  source: string
  count: number
  percentage: number
}

// ==============================================
// USUARIOS Y SUSCRIPCIONES
// ==============================================

export type UserRole = 
  | 'user'             // Usuario normal
  | 'admin'            // Administrador
  | 'super-admin'      // Super administrador

export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
  emailVerified?: string
  preferences: UserPreferences
  metadata: UserMetadata
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: UserNotificationSettings
  privacy: PrivacySettings
}

export interface UserNotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

export interface PrivacySettings {
  showProfile: boolean
  allowTracking: boolean
  dataSharing: boolean
}

export interface UserMetadata {
  invitationsCreated: number
  templatesUsed: number
  totalGuests: number
  eventsCreated: number
  lastActiveAt: string
  loginCount: number
}

export type PlanType = 
  | 'free'             // Plan gratuito
  | 'premium'          // Plan premium
  | 'business'         // Plan empresa

export type SubscriptionStatus = 
  | 'active'           // Activa
  | 'canceled'         // Cancelada
  | 'past_due'         // Vencida
  | 'unpaid'           // Impaga
  | 'trialing'         // En periodo de prueba

export interface Subscription {
  id: string
  userId: string
  user?: User
  planId: string
  planType: PlanType
  status: SubscriptionStatus
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  canceledAt?: string
  trialStart?: string
  trialEnd?: string
  plan: Plan
  paymentMethod?: PaymentMethod
  invoices: Invoice[]
  createdAt: string
  updatedAt: string
}

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: PlanFeature[]
  limits: PlanLimits
  isActive: boolean
  isPopular: boolean
  createdAt: string
  updatedAt: string
}

export interface PlanFeature {
  id: string
  name: string
  description?: string
  enabled: boolean
  limit?: number
}

export interface PlanLimits {
  invitations: number
  guestsPerInvitation: number
  templates: number
  storage: number // en MB
  analyticsRetention: number // en días
  supportLevel: 'basic' | 'priority' | 'dedicated'
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank_transfer'
  last4?: string
  brand?: string
  expiresAt?: string
  isDefault: boolean
}

export interface Invoice {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'
  pdfUrl?: string
  periodStart: string
  periodEnd: string
  paidAt?: string
  createdAt: string
}

// ==============================================
// API RESPONSES
// ==============================================

export interface ApiResponse<T = any> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
    filters?: Record<string, any>
    sort?: string[]
  }
  error?: {
    code: string
    message: string
    details?: any
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

// ==============================================
// CONFIGURACIÓN Y SETTINGS
// ==============================================

export interface AppSettings {
  general: GeneralSettings
  email: EmailSettings
  integrations: IntegrationSettings
  security: SecuritySettings
  maintenance: MaintenanceSettings
}

export interface GeneralSettings {
  siteName: string
  siteUrl: string
  supportEmail: string
  defaultLanguage: string
  defaultTimezone: string
  dateFormat: string
  timeFormat: string
}

export interface EmailSettings {
  provider: 'resend' | 'sendgrid' | 'smtp'
  fromName: string
  fromEmail: string
  replyTo?: string
  templates: EmailTemplate[]
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
  isActive: boolean
}

export interface IntegrationSettings {
  stripe: StripeSettings
  google: GoogleSettings
  cloudinary: CloudinarySettings
  mapbox?: MapboxSettings
}

export interface StripeSettings {
  enabled: boolean
  publishableKey?: string
  secretKey?: string
  webhookSecret?: string
}

export interface GoogleSettings {
  enabled: boolean
  clientId?: string
  clientSecret?: string
  mapsApiKey?: string
  calendarApiKey?: string
}

export interface CloudinarySettings {
  enabled: boolean
  cloudName?: string
  apiKey?: string
  apiSecret?: string
}

export interface MapboxSettings {
  enabled: boolean
  accessToken?: string
}

export interface SecuritySettings {
  requireEmailVerification: boolean
  allowSocialLogin: boolean
  sessionTimeout: number // en minutos
  maxLoginAttempts: number
  passwordPolicy: PasswordPolicy
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
}

export interface MaintenanceSettings {
  mode: boolean
  message?: string
  allowedIps: string[]
}

// ==============================================
// UTILIDADES
// ==============================================

export type SortDirection = 'asc' | 'desc'

export interface FilterOptions {
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  search?: string
  filters?: Record<string, any>
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ApiError {
  status: number
  message: string
  errors?: ValidationError[]
  timestamp: string
}

// ==============================================
// CONSTANTES
// ==============================================

export const TEMPLATE_CATEGORIES: Array<{
  value: TemplateCategory
  label: string
  icon: string
  description: string
}> = [
  { value: 'birthday', label: 'Cumpleaños', icon: '🎂', description: 'Celebra momentos especiales' },
  { value: 'wedding', label: 'Bodas', icon: '💍', description: 'El día más especial' },
  { value: 'baby-shower', label: 'Baby Shower', icon: '👶', description: 'Bienvenida al nuevo miembro' },
  { value: 'corporate', label: 'Corporativos', icon: '💼', description: 'Eventos profesionales' },
  { value: 'graduation', label: 'Graduaciones', icon: '🎓', description: 'Logros académicos' },
  { value: 'anniversary', label: 'Aniversarios', icon: '❤️', description: 'Celebra años juntos' },
  { value: 'christmas', label: 'Navidad', icon: '🎄', description: 'Fiestas navideñas' },
  { value: 'halloween', label: 'Halloween', icon: '🎃', description: 'Noche de terror' },
  { value: 'thanksgiving', label: 'Acción de Gracias', icon: '🦃', description: 'Gratitud y familia' },
  { value: 'new-year', label: 'Año Nuevo', icon: '🎆', description: 'Nuevos comienzos' },
  { value: 'engagement', label: 'Compromisos', icon: '💎', description: 'Promesas de amor' },
  { value: 'retirement', label: 'Jubilaciones', icon: '👴', description: 'Nuevo capítulo' },
  { value: 'housewarming', label: 'Fiesta de Casa', icon: '🏠', description: 'Estreno de hogar' },
  { value: 'bridal-shower', label: 'Despedida Soltera', icon: '👰', description: 'Última noche libre' },
  { value: 'gender-reveal', label: 'Revelación Género', icon: '🎀', description: 'Sorpresa del bebé' },
  { value: 'quinceanera', label: '15 Años', icon: '👑', description: 'Quinceañera' },
  { value: 'baptism', label: 'Bautizos', icon: '✝️', description: 'Bienvenida espiritual' },
  { value: 'communion', label: 'Comuniones', icon: '⛪', description: 'Primera comunión' },
  { value: 'other', label: 'Otros', icon: '🎉', description: 'Eventos especiales' },
]

export const TEMPLATE_THEMES: Array<{
  value: TemplateTheme
  label: string
  description: string
}> = [
  { value: 'modern', label: 'Moderno', description: 'Diseño contemporáneo y limpio' },
  { value: 'classic', label: 'Clásico', description: 'Estilo tradicional y elegante' },
  { value: 'elegant', label: 'Elegante', description: 'Sofisticado y refinado' },
  { value: 'minimalist', label: 'Minimalista', description: 'Simple y funcional' },
  { value: 'vintage', label: 'Vintage', description: 'Estilo retro y nostálgico' },
  { value: 'playful', label: 'Juguetón', description: 'Divertido y colorido' },
  { value: 'romantic', label: 'Romántico', description: 'Delicado y amoroso' },
  { value: 'professional', label: 'Profesional', description: 'Formal y corporativo' },
  { value: 'festive', label: 'Festivo', description: 'Celebratorio y animado' },
  { value: 'seasonal', label: 'Estacional', description: 'Temas de temporada' },
]

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  free: [
    '3 invitaciones simultáneas',
    'Hasta 50 invitados por evento',
    'Plantillas básicas',
    'RSVP básico',
    'Estadísticas simples',
    'Soporte por email',
  ],
  premium: [
    'Invitaciones ilimitadas',
    'Hasta 500 invitados por evento',
    'Todas las plantillas premium',
    'Analíticas avanzadas',
    'Mapas interactivos',
    'Recordatorios automáticos',
    'Exportación PDF/CSV',
    'Soporte prioritario 24/7',
  ],
  business: [
    'Todo lo de Premium',
    'Invitados ilimitados',
    'Marca personalizada',
    'API access',
    'White-label solutions',
    'SLA 99.9%',
    'Gestor dedicado',
    'Onboarding personalizado',
  ],
}