'use client'

import { Card, CardContent } from '@/components/ui/cards/Card'
import { 
  TrendingUp,
  Users,
  Eye,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Share2
} from 'lucide-react'

interface MetricsCardsProps {
  dateRange: string
}

export function MetricsCards({ dateRange }: MetricsCardsProps) {
  const metrics = [
    {
      title: 'Vistas totales',
      value: '1,245',
      icon: Eye,
      change: '+12%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Invitados únicos',
      value: '856',
      icon: Users,
      change: '+8%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tasa de apertura',
      value: '78%',
      icon: Mail,
      change: '+5%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Tiempo promedio',
      value: '2:18',
      icon: Clock,
      change: '-15s',
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Tasa de confirmación',
      value: '64%',
      icon: CheckCircle,
      change: '+8%',
      trend: 'up',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      title: 'Tasa de rechazo',
      value: '12%',
      icon: XCircle,
      change: '-3%',
      trend: 'down',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Compartido',
      value: '245',
      icon: Share2,
      change: '+42%',
      trend: 'up',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Crecimiento',
      value: '28%',
      icon: TrendingUp,
      change: '+7%',
      trend: 'up',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${metric.bgColor} mb-3`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {metric.title}
              </div>
              <div className={`text-xs font-medium flex items-center ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}