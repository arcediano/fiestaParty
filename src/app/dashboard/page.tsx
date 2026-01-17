'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  PlusCircle, 
  Users, 
  Calendar, 
  BarChart3,
  FileText,
  Gift,
  Settings,
  Sparkles
} from 'lucide-react'

export default function DashboardPage() {
  const currentHour = new Date().getHours()
  let greeting = 'Buenas noches'
  
  if (currentHour < 12) {
    greeting = 'Buenos días'
  } else if (currentHour < 18) {
    greeting = 'Buenas tardes'
  }

  const stats = [
    { label: 'Invitaciones Activas', value: '12', icon: FileText, change: '+3', color: 'text-primary' },
    { label: 'Invitados Totales', value: '245', icon: Users, change: '+12%', color: 'text-secondary' },
    { label: 'Confirmaciones', value: '189', icon: Calendar, change: '+8%', color: 'text-green-500' },
    { label: 'Tasa RSVP', value: '77%', icon: BarChart3, change: '+5%', color: 'text-accent' },
  ]

  const quickActions = [
    { label: 'Nueva Invitación', icon: PlusCircle, href: '/dashboard/invitations/new' },
    { label: 'Gestionar Invitados', icon: Users, href: '/dashboard/guests' },
    { label: 'Ver Analíticas', icon: BarChart3, href: '/dashboard/analytics' },
    { label: 'Sistema de Regalos', icon: Gift, href: '/dashboard/gifts' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{greeting}, Usuario</h1>
        <p className="text-muted-foreground mt-2">
          Aquí tienes un resumen de tu actividad reciente
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> desde el mes pasado
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
          <CardDescription className="text-muted-foreground">
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-3 hover:bg-accent hover:text-accent-foreground border-border"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invitations */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Invitaciones Recientes</CardTitle>
            <CardDescription className="text-muted-foreground">
              Tus últimas 5 invitaciones creadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/5">
                  <div>
                    <p className="font-medium text-foreground">Cumpleaños de María #{i}</p>
                    <p className="text-sm text-muted-foreground">15 Nov 2024 • 45 invitados</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      Activa
                    </span>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Consejo del Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-foreground">
                💡 <strong>Envía recordatorios 3 días antes del evento</strong> para aumentar las confirmaciones en un 30%.
              </p>
              <p className="text-sm text-muted-foreground">
                Los invitados que reciben recordatorios tienen más probabilidades de confirmar su asistencia.
              </p>
              <Button className="w-full" variant="outline">
                Configurar recordatorios automáticos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}