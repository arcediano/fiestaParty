'use client'

import { Button } from '@/components/ui/buttons/Button'
import { 
  Bell, 
  User, 
  Menu, 
  Search, 
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface DashboardHeaderProps {
  onMenuClick: () => void
  user?: any
}

export function DashboardHeader({ onMenuClick, user }: DashboardHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva plantilla disponible', time: 'Hace 2 horas', read: false },
    { id: 2, title: 'Invitación confirmada', time: 'Hace 1 día', read: false },
    { id: 3, title: 'Recordatorio de evento', time: 'Hace 2 días', read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ID</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Invitaciones Digitales
              </h1>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="search"
                placeholder="Buscar invitaciones, plantillas, invitados..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:inline-flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/help')}
            >
              <HelpCircle className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-accent cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{notification.title}</p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => {
                        setShowNotifications(false)
                        router.push('/dashboard/notifications')
                      }}
                    >
                      Ver todas las notificaciones
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'Usuario'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden md:inline text-sm font-medium">
                  {user?.name || 'Usuario'}
                </span>
              </Button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <p className="font-semibold truncate">{user?.name || 'Usuario'}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        setShowProfileMenu(false)
                        router.push('/dashboard/settings')
                      }}
                    >
                      Configuración
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        setShowProfileMenu(false)
                        router.push('/dashboard/billing')
                      }}
                    >
                      Facturación
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        setShowProfileMenu(false)
                        router.push('/help')
                      }}
                    >
                      Ayuda y soporte
                    </Button>
                  </div>
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="search"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </header>
  )
}