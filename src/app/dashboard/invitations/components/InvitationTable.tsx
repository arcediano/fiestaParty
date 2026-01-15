'use client'

import { Button } from '@/components/ui/buttons/Button'
import { 
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Mail,
  Users,
  Calendar,
  MoreVertical
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface InvitationTableProps {
  search: string
  statusFilter: string
  dateRange: string
}

// Mock data
const invitations = [
  {
    id: 1,
    title: 'Cumpleaños de María - 5 años',
    eventDate: '2024-12-20',
    status: 'active',
    template: 'Kids Birthday',
    guests: 45,
    confirmed: 28,
    views: 120,
    lastActivity: 'Hace 2 horas',
  },
  {
    id: 2,
    title: 'Fiesta de Navidad Empresarial',
    eventDate: '2024-12-15',
    status: 'active',
    template: 'Christmas Party',
    guests: 60,
    confirmed: 42,
    views: 98,
    lastActivity: 'Hace 4 horas',
  },
  {
    id: 3,
    title: 'Aniversario de Bodas #25',
    eventDate: '2024-11-30',
    status: 'completed',
    template: 'Elegant Wedding',
    guests: 30,
    confirmed: 30,
    views: 156,
    lastActivity: 'Hace 2 días',
  },
  {
    id: 4,
    title: 'Baby Shower - ¡Es niño!',
    eventDate: '2025-01-15',
    status: 'draft',
    template: 'Baby Shower',
    guests: 35,
    confirmed: 12,
    views: 45,
    lastActivity: 'Hace 3 días',
  },
  {
    id: 5,
    title: 'Graduación Universitaria',
    eventDate: '2025-06-10',
    status: 'active',
    template: 'Graduation',
    guests: 50,
    confirmed: 18,
    views: 67,
    lastActivity: 'Hace 1 semana',
  },
]

export function InvitationTable({ search, statusFilter, dateRange }: InvitationTableProps) {
  const router = useRouter()
  const [selectedInvitations, setSelectedInvitations] = useState<number[]>([])

  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invitation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectedInvitations.length === filteredInvitations.length) {
      setSelectedInvitations([])
    } else {
      setSelectedInvitations(filteredInvitations.map(inv => inv.id))
    }
  }

  const handleSelectInvitation = (id: number) => {
    setSelectedInvitations(prev => 
      prev.includes(id) 
        ? prev.filter(invId => invId !== id)
        : [...prev, id]
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-600' },
      active: { label: 'Activo', color: 'bg-green-100 text-green-600' },
      completed: { label: 'Completado', color: 'bg-blue-100 text-blue-600' },
      archived: { label: 'Archivado', color: 'bg-purple-100 text-purple-600' },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-800">
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectedInvitations.length === filteredInvitations.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-4 text-left font-semibold">Invitación</th>
              <th className="p-4 text-left font-semibold">Fecha</th>
              <th className="p-4 text-left font-semibold">Estado</th>
              <th className="p-4 text-left font-semibold">Invitados</th>
              <th className="p-4 text-left font-semibold">Vistas</th>
              <th className="p-4 text-left font-semibold">Última actividad</th>
              <th className="p-4 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvitations.map((invitation) => (
              <tr 
                key={invitation.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => router.push(`/dashboard/invitations/${invitation.id}`)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedInvitations.includes(invitation.id)}
                    onChange={() => handleSelectInvitation(invitation.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{invitation.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Plantilla: {invitation.template}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {invitation.eventDate}
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(invitation.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{invitation.confirmed}/{invitation.guests}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((invitation.confirmed / invitation.guests) * 100)}% confirmado
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{invitation.views}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm">{invitation.lastActivity}</div>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => router.push(`/invitation/${invitation.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => router.push(`/dashboard/invitations/${invitation.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredInvitations.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No hay invitaciones</h3>
          <p className="text-muted-foreground mb-6">
            {search ? 'No se encontraron invitaciones con esa búsqueda' : 'Comienza creando tu primera invitación'}
          </p>
          <Button
            onClick={() => router.push('/dashboard/templates')}
            className="bg-gradient-to-r from-primary to-accent"
          >
            Crear primera invitación
          </Button>
        </div>
      )}

      {/* Footer */}
      {filteredInvitations.length > 0 && (
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredInvitations.length} de {invitations.length} invitaciones
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
    </div>
  )
}