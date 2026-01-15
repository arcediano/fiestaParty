'use client'

import { Card, CardContent } from '@/components/ui/cards/Card'
import { 
  Mail,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp
} from 'lucide-react'

export function InvitationStats() {
  const stats = [
    {
      title: 'Total invitaciones',
      value: '15',
      icon: Mail,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+3 esta semana',
    },
    {
      title: 'Total invitados',
      value: '245',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+45 nuevos',
    },
    {
      title: 'Confirmados',
      value: '156',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '64% tasa',
    },
    {
      title: 'Pendientes',
      value: '65',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '26% pendiente',
    },
    {
      title: 'Rechazados',
      value: '24',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '10% rechazado',
    },
    {
      title: 'Tasa de respuesta',
      value: '74%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8% desde ayer',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs mt-1">{stat.change}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}