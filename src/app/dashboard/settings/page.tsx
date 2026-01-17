'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Download,
  Mail,
  Lock,
  Smartphone,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import { useState } from 'react'
import { ProfileForm } from './components/ProfileForm'
import { SubscriptionCard } from './components/SubscriptionCard'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
    { id: 'integrations', label: 'Integraciones', icon: Globe },
    { id: 'billing', label: 'Facturación', icon: CreditCard },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />
      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
                <CardDescription>
                  Controla cómo y cuándo recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Confirmaciones de invitados', enabled: true },
                  { label: 'Recordatorios de eventos', enabled: true },
                  { label: 'Actualizaciones de la plataforma', enabled: true },
                  { label: 'Promociones y ofertas', enabled: false },
                  { label: 'Notificaciones por email', enabled: true },
                  { label: 'Notificaciones push', enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Recibir notificaciones sobre {item.label.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )
      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad de la cuenta</CardTitle>
                <CardDescription>
                  Mantén tu cuenta segura con estas opciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: 'Cambiar contraseña',
                    description: 'Actualiza tu contraseña regularmente',
                    icon: Lock,
                    action: 'Cambiar',
                  },
                  {
                    title: 'Autenticación de dos factores',
                    description: 'Añade una capa extra de seguridad',
                    icon: Shield,
                    action: 'Activar',
                  },
                  {
                    title: 'Sesiones activas',
                    description: 'Revisa y gestiona sesiones iniciadas',
                    icon: Smartphone,
                    action: 'Ver sesiones',
                  },
                  {
                    title: 'Historial de inicio de sesión',
                    description: 'Revisa los accesos a tu cuenta',
                    icon: Download,
                    action: 'Descargar',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Button variant="outline">{item.action}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )
      case 'appearance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>
                  Personaliza la apariencia de tu dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Tema</h4>
                    <div className="space-y-2">
                      {['Claro', 'Oscuro', 'Automático'].map((theme) => (
                        <div
                          key={theme}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent"
                        >
                          <span>{theme}</span>
                          <div className="w-4 h-4 rounded-full border"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Densidad</h4>
                    <div className="space-y-2">
                      {['Compacto', 'Cómodo', 'Espaciado'].map((density) => (
                        <div
                          key={density}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent"
                        >
                          <span>{density}</span>
                          <div className="w-4 h-4 rounded-full border"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'billing':
        return <SubscriptionCard />
      default:
        return <ProfileForm />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración de tu cuenta y preferencias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                ))}
              </div>
              
              {/* Help Section */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="font-semibold">¿Necesitas ayuda?</h4>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Documentación
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Contactar soporte
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Preguntas frecuentes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}