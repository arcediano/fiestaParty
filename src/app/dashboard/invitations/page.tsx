'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { Button } from '@/components/ui/buttons/Button'
import { 
  Plus,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Users,
  Mail,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { InvitationTable } from './components/InvitationTable'
import { InvitationStats } from './components/InvitationStats'

export default function InvitationsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('all')

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'draft', label: 'Borradores' },
    { value: 'active', label: 'Activas' },
    { value: 'completed', label: 'Completadas' },
    { value: 'archived', label: 'Archivadas' },
  ]

  const dateOptions = [
    { value: 'all', label: 'Todo el tiempo' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'upcoming', label: 'Próximas' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invitaciones</h1>
          <p className="text-muted-foreground">
            Gestiona todas tus invitaciones creadas
          </p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/templates')}
          className="bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva invitación
        </Button>
      </div>

      {/* Stats */}
      <InvitationStats />

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="search"
                  placeholder="Buscar invitaciones por título, invitado, etc..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Más filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir selección
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar selección
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invitations Table */}
      <InvitationTable 
        search={search}
        statusFilter={statusFilter}
        dateRange={dateRange}
      />

      {/* Quick Tips */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Recordatorios automáticos</h4>
                <p className="text-sm text-muted-foreground">
                  Programa recordatorios para aumentar las confirmaciones
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Gestión de invitados</h4>
                <p className="text-sm text-muted-foreground">
                  Controla alergias y preferencias alimentarias
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Sincronización</h4>
                <p className="text-sm text-muted-foreground">
                  Sincroniza con Google Calendar automáticamente
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}