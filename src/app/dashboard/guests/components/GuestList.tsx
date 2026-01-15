'use client'

import { Button } from '@/components/ui/buttons/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { 
  Search,
  Filter,
  Mail,
  Phone,
  User,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Download,
  UserPlus
} from 'lucide-react'
import { useState } from 'react'

interface GuestListProps {
  search: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSelectionChange: (ids: number[]) => void
}

// Mock data
const guests = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana@email.com',
    phone: '+1 (555) 123-4567',
    invitation: 'Cumpleaños de María',
    status: 'confirmed',
    adults: 2,
    children: 1,
    allergies: ['Nueces'],
    lastResponse: 'Hace 2 horas',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos@email.com',
    phone: '+1 (555) 987-6543',
    invitation: 'Fiesta de Navidad',
    status: 'pending',
    adults: 1,
    children: 0,
    allergies: [],
    lastResponse: 'Hace 1 día',
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria@email.com',
    phone: '+1 (555) 456-7890',
    invitation: 'Aniversario de Bodas',
    status: 'confirmed',
    adults: 2,
    children: 0,
    allergies: ['Mariscos', 'Lácteos'],
    lastResponse: 'Hace 3 días',
  },
  {
    id: 4,
    name: 'Juan Martínez',
    email: 'juan@email.com',
    phone: '+1 (555) 321-0987',
    invitation: 'Baby Shower',
    status: 'declined',
    adults: 0,
    children: 0,
    allergies: [],
    lastResponse: 'Hace 4 días',
  },
  {
    id: 5,
    name: 'Sofía Fernández',
    email: 'sofia@email.com',
    phone: '+1 (555) 654-3210',
    invitation: 'Cumpleaños de María',
    status: 'confirmed',
    adults: 1,
    children: 2,
    allergies: ['Gluten'],
    lastResponse: 'Hace 5 días',
  },
]

export function GuestList({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSelectionChange,
}: GuestListProps) {
  const [selectedGuests, setSelectedGuests] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  const handleSelectGuest = (id: number) => {
    const newSelection = selectedGuests.includes(id)
      ? selectedGuests.filter(guestId => guestId !== id)
      : [...selectedGuests, id]
    
    setSelectedGuests(newSelection)
    onSelectionChange(newSelection)
  }

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([])
      onSelectionChange([])
    } else {
      const allIds = filteredGuests.map(guest => guest.id)
      setSelectedGuests(allIds)
      onSelectionChange(allIds)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Confirmado
          </span>
        )
      case 'pending':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3 inline mr-1" />
            Pendiente
          </span>
        )
      case 'declined':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3 inline mr-1" />
            Rechazado
          </span>
        )
      default:
        return null
    }
  }

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = search === '' || 
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase()) ||
      guest.invitation.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Lista de invitados</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Tabla
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar invitado
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="search"
                placeholder="Buscar por nombre, email o evento..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmados</option>
              <option value="pending">Pendientes</option>
              <option value="declined">Rechazados</option>
            </select>
            
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Guest Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            {filteredGuests.length} invitados encontrados
            {selectedGuests.length > 0 && ` (${selectedGuests.length} seleccionados)`}
          </div>
          {selectedGuests.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Enviar email
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          )}
        </div>

        {viewMode === 'table' ? (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedGuests.length === filteredGuests.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="p-3 text-left font-semibold">Invitado</th>
                  <th className="p-3 text-left font-semibold">Contacto</th>
                  <th className="p-3 text-left font-semibold">Evento</th>
                  <th className="p-3 text-left font-semibold">Estado</th>
                  <th className="p-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => handleSelectGuest(guest.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                          {guest.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{guest.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {guest.adults} adultos, {guest.children} niños
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4" />
                          {guest.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" />
                          {guest.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{guest.invitation}</div>
                      <div className="text-sm text-muted-foreground">
                        Última respuesta: {guest.lastResponse}
                      </div>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(guest.status)}
                      {guest.allergies.length > 0 && (
                        <div className="text-xs text-red-600 mt-1">
                          Alergias: {guest.allergies.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className={`border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedGuests.includes(guest.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectGuest(guest.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {guest.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{guest.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {guest.adults} adultos, {guest.children} niños
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedGuests.includes(guest.id)}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleSelectGuest(guest.id)
                    }}
                    className="w-4 h-4"
                  />
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    {guest.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    {guest.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    {guest.invitation}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(guest.status)}
                  <span className="text-xs text-muted-foreground">
                    {guest.lastResponse}
                  </span>
                </div>

                {guest.allergies.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs font-medium text-red-600 mb-1">
                      Alergias:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guest.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredGuests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay invitados</h3>
            <p className="text-muted-foreground mb-6">
              {search ? 'No se encontraron invitados con esa búsqueda' : 'Comienza agregando invitados a tus eventos'}
            </p>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <UserPlus className="w-5 h-5 mr-2" />
              Agregar primer invitado
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredGuests.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Mostrando 1-{filteredGuests.length} de {guests.length} invitados
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}