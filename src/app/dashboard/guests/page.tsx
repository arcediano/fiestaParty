'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Search,
  Filter,
  Download,
  Mail,
  Users,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical
} from 'lucide-react'
import { useState } from 'react'
import { GuestList } from './components/GuestList'
import { GuestFilters } from './components/GuestFilters'

export default function GuestsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedGuests, setSelectedGuests] = useState<number[]>([])

  const stats = [
    {
      title: 'Total invitados',
      value: '245',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Confirmados',
      value: '156',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pendientes',
      value: '65',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Rechazados',
      value: '24',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  const handleBulkAction = (action: string) => {
    // Lógica para acciones en masa
    console.log(`${action} para:`, selectedGuests)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invitados</h1>
          <p className="text-muted-foreground">
            Gestiona todos los invitados de tus eventos
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedGuests.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar email ({selectedGuests.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('reminder')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Recordatorio
              </Button>
            </>
          )}
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Importar invitados
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <GuestFilters 
            onFilterChange={(filters) => {
              // Implementar lógica de filtrado
              console.log('Filters:', filters)
            }}
          />
        </div>

        {/* Guest List */}
        <div className="lg:col-span-3">
          <GuestList
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onSelectionChange={setSelectedGuests}
          />
        </div>
      </div>

      {/* Quick Actions Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Recordatorios automáticos</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Programa recordatorios para aumentar las confirmaciones
                </p>
                <Button size="sm" variant="outline">
                  Configurar
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Preferencias alimentarias</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Gestiona alergias y preferencias de tus invitados
                </p>
                <Button size="sm" variant="outline">
                  Ver reporte
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Download className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Exportar datos</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Descarga lista de invitados en CSV, Excel o PDF
                </p>
                <Button size="sm" variant="outline">
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}