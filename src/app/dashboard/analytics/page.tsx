'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { Button } from '@/components/ui/buttons/Button'
import { 
  Download,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Share2,
  Mail,
  Clock,
  BarChart3
} from 'lucide-react'
import { useState } from 'react'
import { AnalyticsCharts } from './components/AnalyticsCharts'
import { MetricsCards } from './components/MetricsCards'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days')

  const dateRanges = [
    { value: '7days', label: '7 días' },
    { value: '30days', label: '30 días' },
    { value: '90days', label: '90 días' },
    { value: 'year', label: '1 año' },
    { value: 'all', label: 'Todo el tiempo' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analíticas</h1>
          <p className="text-muted-foreground">
            Estadísticas y métricas de tus invitaciones
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <Button variant="outline">
            <Calendar className="w-5 h-5 mr-2" />
            Rango personalizado
          </Button>
          <Button>
            <Download className="w-5 h-5 mr-2" />
            Exportar reporte
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsCards dateRange={dateRange} />

      {/* Charts */}
      <AnalyticsCharts dateRange={dateRange} />

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Insights clave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Mejor hora para enviar',
                  value: '3:00 PM - 5:00 PM',
                  description: 'Tasa de apertura más alta',
                  improvement: '+25%',
                },
                {
                  title: 'Día con más confirmaciones',
                  value: 'Miércoles',
                  description: 'Promedio de confirmaciones',
                  improvement: '+18%',
                },
                {
                  title: 'Plantilla más efectiva',
                  value: 'Cumpleaños Infantil',
                  description: 'Tasa de respuesta',
                  improvement: '+32%',
                },
                {
                  title: 'Tiempo promedio de respuesta',
                  value: '2.3 horas',
                  description: 'Desde envío hasta confirmación',
                  improvement: '-15%',
                },
              ].map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{insight.value}</p>
                    <p className={`text-sm ${insight.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {insight.improvement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Envía recordatorios',
                  description: '3 invitaciones tienen invitados pendientes de respuesta',
                  action: 'Enviar recordatorios ahora',
                  priority: 'high',
                },
                {
                  title: 'Optimiza tiempos de envío',
                  description: 'Prueba enviar invitaciones los miércoles a las 3 PM',
                  action: 'Programar envíos',
                  priority: 'medium',
                },
                {
                  title: 'Segmenta tus invitados',
                  description: 'Crea grupos para enviar mensajes personalizados',
                  action: 'Crear segmentos',
                  priority: 'low',
                },
                {
                  title: 'Prueba nuevas plantillas',
                  description: 'Las plantillas premium tienen 40% más de engagement',
                  action: 'Explorar plantillas',
                  priority: 'medium',
                },
              ].map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          recommendation.priority === 'high' ? 'bg-red-500' :
                          recommendation.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <h4 className="font-semibold">{recommendation.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    {recommendation.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Reporte completo</h3>
              <p className="text-muted-foreground">
                Descarga un reporte detallado con todas las métricas y estadísticas
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-5 h-5 mr-2" />
                PDF
              </Button>
              <Button variant="outline">
                <Download className="w-5 h-5 mr-2" />
                Excel
              </Button>
              <Button variant="outline">
                <Download className="w-5 h-5 mr-2" />
                CSV
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Share2 className="w-5 h-5 mr-2" />
                Compartir reporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}