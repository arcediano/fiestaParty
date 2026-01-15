'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { 
  TrendingUp,
  Users,
  Calendar,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/buttons/Button'
import { useState, useMemo } from 'react'

interface AnalyticsChartsProps {
  dateRange: string
}

export function AnalyticsCharts({ dateRange }: AnalyticsChartsProps) {
  const [activeChart, setActiveChart] = useState('views')

  const charts = [
    { id: 'views', label: 'Vistas', color: 'bg-blue-500' },
    { id: 'guests', label: 'Invitados', color: 'bg-green-500' },
    { id: 'confirmations', label: 'Confirmaciones', color: 'bg-purple-500' },
    { id: 'engagement', label: 'Engagement', color: 'bg-orange-500' },
  ]

  // Datos de ejemplo para gráficos
  const chartData = {
    views: [120, 98, 156, 45, 67, 89, 134],
    guests: [45, 60, 30, 35, 50, 40, 55],
    confirmations: [28, 42, 30, 12, 18, 25, 32],
    engagement: [65, 72, 80, 45, 60, 75, 85],
  }

  const timeLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  // Calcular el valor máximo una vez usando useMemo
  const maxValue = useMemo(() => {
    const allValues = Object.values(chartData).flat()
    return Math.max(...allValues)
  }, [])

  // Obtener los datos activos
  const activeChartData = chartData[activeChart as keyof typeof chartData]

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {charts.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeChart === chart.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {chart.label}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar datos
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {charts.find(c => c.id === activeChart)?.label} por día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              {/* Bar Chart Simulation */}
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
                {activeChartData.map((value, index) => {
                  const height = (value / maxValue) * 100
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 rounded-t ${
                          activeChart === 'views' ? 'bg-blue-500' :
                          activeChart === 'guests' ? 'bg-green-500' :
                          activeChart === 'confirmations' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-muted-foreground mt-2">
                        {timeLabels[index]}
                      </div>
                      <div className="text-xs font-semibold mt-1">
                        {value}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((line) => (
                <div
                  key={line}
                  className="absolute left-0 right-0 border-t border-gray-100"
                  style={{ bottom: `${line}%` }}
                >
                  <span className="absolute left-0 text-xs text-muted-foreground">
                    {line === 0 ? '0' : line === 100 ? maxValue : ''}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guest Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Distribución de invitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Confirmados', value: 156, percentage: 64, color: 'bg-green-500' },
                { label: 'Pendientes', value: 65, percentage: 27, color: 'bg-yellow-500' },
                { label: 'Rechazados', value: 24, percentage: 10, color: 'bg-red-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Resumen por evento</h4>
              <div className="space-y-3">
                {[
                  { event: 'Cumpleaños María', guests: 45, confirmed: 28 },
                  { event: 'Fiesta Navidad', guests: 60, confirmed: 42 },
                  { event: 'Aniversario', guests: 30, confirmed: 30 },
                  { event: 'Baby Shower', guests: 35, confirmed: 12 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="truncate">{item.event}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.confirmed}/{item.guests}</span>
                      <span className="text-muted-foreground">
                        ({Math.round((item.confirmed / item.guests) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Análisis por hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Actividad por hora del día</h4>
                <div className="h-32 relative">
                  {/* Hourly activity bars */}
                  <div className="absolute inset-0 flex items-end justify-between">
                    {[8, 10, 12, 14, 16, 18, 20].map((hour, index) => {
                      const values = [15, 45, 80, 65, 90, 70, 40]
                      const height = (values[index] / 100) * 100
                      
                      return (
                        <div key={hour} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-gradient-to-t from-primary to-accent rounded-t"
                            style={{ height: `${height}%` }}
                          />
                          <div className="text-xs text-muted-foreground mt-2">
                            {hour}:00
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  Pico de actividad: 4:00 PM - 6:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Plataformas de acceso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: 'Desktop', percentage: 65, color: 'bg-blue-500' },
                { platform: 'Mobile', percentage: 30, color: 'bg-green-500' },
                { platform: 'Tablet', percentage: 5, color: 'bg-purple-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.platform}</span>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Dispositivos más usados</h4>
              <div className="space-y-2">
                {[
                  { device: 'iPhone 14', percentage: 18 },
                  { device: 'Samsung Galaxy', percentage: 12 },
                  { device: 'iPad', percentage: 8 },
                  { device: 'MacBook Pro', percentage: 15 },
                  { device: 'Windows PC', percentage: 22 },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.device}</span>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}