'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { Button } from '@/components/ui/buttons/Button'
import { 
  Filter,
  Users,
  Calendar,
  MapPin,
  Tag,
  X
} from 'lucide-react'
import { useState } from 'react'

interface GuestFiltersProps {
  onFilterChange: (filters: any) => void
}

export function GuestFilters({ onFilterChange }: GuestFiltersProps) {
  const [filters, setFilters] = useState({
    events: [] as string[],
    status: [] as string[],
    dateRange: 'all',
    hasAllergies: false,
    hasFoodPreferences: false,
    confirmedOnly: false,
  })

  const eventOptions = [
    'Cumpleaños de María',
    'Fiesta de Navidad',
    'Aniversario de Bodas',
    'Baby Shower',
    'Graduación',
  ]

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmados' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'declined', label: 'Rechazados' },
  ]

  const handleEventToggle = (event: string) => {
    const newEvents = filters.events.includes(event)
      ? filters.events.filter(e => e !== event)
      : [...filters.events, event]
    
    const newFilters = { ...filters, events: newEvents }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    
    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleToggle = (key: keyof typeof filters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      events: [],
      status: [],
      dateRange: 'all',
      hasAllergies: false,
      hasFoodPreferences: false,
      confirmedOnly: false,
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const activeFilterCount = [
    filters.events.length,
    filters.status.length,
    filters.dateRange !== 'all' ? 1 : 0,
    filters.hasAllergies ? 1 : 0,
    filters.hasFoodPreferences ? 1 : 0,
    filters.confirmedOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-auto p-0"
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar ({activeFilterCount})
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Events Filter */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Eventos
            </h4>
            <div className="space-y-2">
              {eventOptions.map((event) => (
                <label key={event} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.events.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Estado
            </h4>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status.value)}
                    onChange={() => handleStatusToggle(status.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-semibold mb-3">Rango de fecha</h4>
            <select
              value={filters.dateRange}
              onChange={(e) => handleToggle('dateRange', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">Todo el tiempo</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="last30">Últimos 30 días</option>
            </select>
          </div>

          {/* Additional Filters */}
          <div>
            <h4 className="font-semibold mb-3">Filtros adicionales</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasAllergies}
                  onChange={(e) => handleToggle('hasAllergies', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Con alergias</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasFoodPreferences}
                  onChange={(e) => handleToggle('hasFoodPreferences', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Con preferencias alimentarias</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.confirmedOnly}
                  onChange={(e) => handleToggle('confirmedOnly', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Solo confirmados</span>
              </label>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">Acciones rápidas</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <Tag className="w-4 h-4 mr-2" />
                Exportar selección
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Ver en mapa
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Users className="w-4 h-4 mr-2" />
                Crear grupo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Estadísticas rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Total invitados', value: '245' },
            { label: 'Confirmados hoy', value: '12' },
            { label: 'Pendientes', value: '45' },
            { label: 'Con alergias', value: '18' },
            { label: 'Promedio por evento', value: '35' },
          ].map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}