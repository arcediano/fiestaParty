'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { Button } from '@/components/ui/buttons/Button'
import { 
  Plus,
  TrendingUp,
  Users,
  Mail,
  Calendar,
  Download,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// Mock data - en producción vendría de una API
const mockStats = {
  totalInvitations: 12,
  activeInvitations: 5,
  totalGuests: 156,
  confirmedGuests: 89,
  pendingGuests: 45,
  declinedGuests: 22,
  rsvpRate: 57,
  upcomingEvents: 3,
}

const recentInvitations = [
  {
    id: 1,
    title: 'Cumpleaños de María - 5 años',
    date: '2024-12-20',
    guests: 45,
    confirmed: 28,
    status: 'active',
    template: 'Kids Birthday',
  },
  {
    id: 2,
    title: 'Fiesta de Navidad',
    date: '2024-12-15',
    guests: 60,
    confirmed: 42,
    status: 'active',
    template: 'Christmas Party',
  },
  {
    id: 3,
    title: 'Aniversario de Bodas',
    date: '2024-11-30',
    guests: 30,
    confirmed: 30,
    status: 'completed',
    template: 'Elegant Wedding',
  },
  {
    id: 4,
    title: 'Baby Shower',
    date: '2025-01-15',
    guests: 35,
    confirmed: 12,
    status: 'draft',
    template: 'Baby Shower',
  },
]

const quickActions = [
  {
    title: 'Crear invitación',
    description: 'Comienza una nueva invitación',
    icon: Plus,
    color: 'from-primary to-pink-500',
    href: '/dashboard/templates',
  },
  {
    title: 'Ver calendario',
    description: 'Próximos eventos',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
    href: '/dashboard/calendar',
  },
  {
    title: 'Exportar datos',
    description: 'Descargar estadísticas',
    icon: Download,
    color: 'from-green-500 to-emerald-500',
    href: '/dashboard/analytics',
  },
  {
    title: 'Invitar amigos',
    description: 'Comparte la plataforma',
    icon: Share2,
    color: 'from-purple-500 to-pink-500',
    href: '/referral',
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Buenos días')
    else if (hour < 19) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')
  }, [])

  const statCards = [
    {
      title: 'Invitaciones activas',
      value: mockStats.activeInvitations,
      icon: Mail,
      change: '+2 esta semana',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total invitados',
      value: mockStats.totalGuests,
      icon: Users,
      change: '+12 nuevos',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Tasa de confirmación',
      value: `${mockStats.rsvpRate}%`,
      icon: TrendingUp,
      change: '+5% desde ayer',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Próximos eventos',
      value: mockStats.upcomingEvents,
      icon: Calendar,
      change: 'Próximo: en 5 días',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting}, {session?.user?.name?.split(' ')[0] || 'Usuario'}!
          </h1>
          <p className="text-muted-foreground">
            Aquí tienes un resumen de tu actividad
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => router.push('/dashboard/templates')}
          className="bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva invitación
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => router.push(action.href)}
            >
              <CardContent className="p-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} w-fit mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Invitations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invitaciones recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => router.push(`/dashboard/invitations/${invitation.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded ${
                      invitation.status === 'active' ? 'bg-green-100 text-green-600' :
                      invitation.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {invitation.status === 'active' ? (
                        <Eye className="w-5 h-5" />
                      ) : invitation.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{invitation.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{invitation.date}</span>
                        <span>{invitation.guests} invitados</span>
                        <span>{invitation.confirmed} confirmados</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{invitation.template}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      invitation.status === 'active' ? 'bg-green-100 text-green-600' :
                      invitation.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {invitation.status === 'active' ? 'Activo' :
                       invitation.status === 'completed' ? 'Completado' : 'Borrador'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => router.push('/dashboard/invitations')}
            >
              Ver todas las invitaciones
            </Button>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Invitación creada', time: 'Hace 2 horas', type: 'create' },
                { action: '15 invitados confirmados', time: 'Hace 4 horas', type: 'confirm' },
                { action: 'Plantilla personalizada', time: 'Ayer', type: 'template' },
                { action: 'Evento compartido', time: 'Hace 2 días', type: 'share' },
                { action: 'Factura pagada', time: 'Hace 3 días', type: 'payment' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'create' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'confirm' ? 'bg-green-100 text-green-600' :
                    activity.type === 'template' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'share' ? 'bg-orange-100 text-orange-600' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {activity.type === 'create' && <Plus className="w-4 h-4" />}
                    {activity.type === 'confirm' && <CheckCircle className="w-4 h-4" />}
                    {activity.type === 'template' && <Eye className="w-4 h-4" />}
                    {activity.type === 'share' && <Share2 className="w-4 h-4" />}
                    {activity.type === 'payment' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
              <h4 className="font-semibold mb-2">Consejo del día</h4>
              <p className="text-sm text-muted-foreground">
                Envía recordatorios automáticos 3 días antes del evento para aumentar las confirmaciones en un 40%.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}