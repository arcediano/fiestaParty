'use client'

import { Button } from '@/components/ui/buttons/Button'
import { 
  LayoutDashboard,
  LayoutTemplate,
  Mail,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  CreditCard,
  FileText,
  Calendar,
  MapPin,
  Crown,
  X,
  ChevronRight
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  isPremium: boolean
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: 'Plantillas',
    href: '/dashboard/templates',
    icon: LayoutTemplate,
    badge: null,
  },
  {
    title: 'Mis Plantillas',
    href: '/dashboard/my-templates',
    icon: FileText,
    badge: null,
  },
  {
    title: 'Invitaciones',
    href: '/dashboard/invitations',
    icon: Mail,
    badge: '5',
  },
  {
    title: 'Invitados',
    href: '/dashboard/guests',
    icon: Users,
    badge: '12',
  },
  {
    title: 'Analíticas',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null,
  },
  {
    title: 'Calendario',
    href: '/dashboard/calendar',
    icon: Calendar,
    badge: '3',
  },
  {
    title: 'Mapas',
    href: '/dashboard/maps',
    icon: MapPin,
    badge: null,
  },
]

const settingsItems = [
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Facturación',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    title: 'Ayuda',
    href: '/help',
    icon: HelpCircle,
  },
]

export function DashboardSidebar({ isOpen, onClose, isPremium }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 border-r bg-background z-40">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ID</span>
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Invitaciones
              </h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
              Navegación
            </p>
            
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary/50'
                  )}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Button>
              )
            })}
          </div>

          {/* Premium Upgrade Banner */}
          {!isPremium && (
            <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-semibold">Actualiza a Premium</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Desbloquea todas las funciones
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-accent"
                onClick={() => router.push('/pricing')}
              >
                Actualizar ahora
              </Button>
            </div>
          )}

          {/* Settings */}
          <div className="mt-8 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
              Configuración
            </p>
            
            {settingsItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </nav>

        {/* User info */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Usuario Ejemplo</p>
              <p className="text-xs text-muted-foreground truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 h-screen w-64 border-r bg-background z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ID</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Invitaciones</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary/50'
                  )}
                  onClick={() => {
                    router.push(item.href)
                    onClose()
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}