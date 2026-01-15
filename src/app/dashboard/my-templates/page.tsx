'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/Card'
import { Button } from '@/components/ui/buttons/Button'
import { 
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  Copy,
  Share2,
  Star,
  Download,
  Eye
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Mock data
const userTemplates = [
  {
    id: 1,
    name: 'Cumpleaños Superhéroes',
    category: 'kids',
    isPremium: false,
    lastEdited: '2024-12-01',
    usageCount: 3,
    favorite: true,
    previewUrl: '/api/placeholder/400/300',
  },
  {
    id: 2,
    name: 'Boda Elegante',
    category: 'elegant',
    isPremium: true,
    lastEdited: '2024-11-28',
    usageCount: 1,
    favorite: false,
    previewUrl: '/api/placeholder/400/300',
  },
  {
    id: 3,
    name: 'Baby Shover Rosa',
    category: 'themed',
    isPremium: false,
    lastEdited: '2024-11-25',
    usageCount: 2,
    favorite: true,
    previewUrl: '/api/placeholder/400/300',
  },
  {
    id: 4,
    name: 'Fiesta de Disfraces',
    category: 'themed',
    isPremium: true,
    lastEdited: '2024-11-20',
    usageCount: 0,
    favorite: false,
    previewUrl: '/api/placeholder/400/300',
  },
]

export default function MyTemplatesPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([])

  const categories = [
    { value: '', label: 'Todas' },
    { value: 'kids', label: 'Infantiles' },
    { value: 'elegant', label: 'Elegantes' },
    { value: 'themed', label: 'Temáticos' },
    { value: 'modern', label: 'Modernos' },
  ]

  const filteredTemplates = userTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSelectTemplate = (id: number) => {
    setSelectedTemplates(prev => 
      prev.includes(id) 
        ? prev.filter(templateId => templateId !== id)
        : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    // Lógica para eliminar templates seleccionados
    setSelectedTemplates([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mis Plantillas</h1>
          <p className="text-muted-foreground">
            Gestiona tus plantillas personalizadas
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedTemplates.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar ({selectedTemplates.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </>
          )}
          <Button
            onClick={() => router.push('/dashboard/templates')}
            className="bg-gradient-to-r from-primary to-accent"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva plantilla
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="search"
              placeholder="Buscar en mis plantillas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total plantillas
                </p>
                <p className="text-2xl font-bold mt-2">{userTemplates.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Grid className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Veces usadas
                </p>
                <p className="text-2xl font-bold mt-2">
                  {userTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-secondary/10">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Favoritas
                </p>
                <p className="text-2xl font-bold mt-2">
                  {userTemplates.filter(t => t.favorite).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Star className="w-6 h-6 text-accent fill-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedTemplates.includes(template.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardContent className="p-0">
                {/* Preview */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <div className="w-full h-full bg-gray-200" />
                  {template.isPremium && (
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        PREMIUM
                      </div>
                    </div>
                  )}
                  {template.favorite && (
                    <div className="absolute top-2 left-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold truncate">{template.name}</h3>
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectTemplate(template.id)
                      }}
                      className="w-4 h-4"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                        {template.category}
                      </span>
                      <span>{template.usageCount} usos</span>
                    </div>
                    <span className="text-xs">Editado: {template.lastEdited}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedTemplates.includes(template.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedTemplates.includes(template.id)}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleSelectTemplate(template.id)
                    }}
                    className="w-5 h-5"
                  />
                  
                  {/* Preview */}
                  <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gray-200" />
                    {template.isPremium && (
                      <div className="absolute top-1 right-1">
                        <div className="px-1 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold rounded">
                          PREMIUM
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{template.name}</h3>
                      {template.favorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                        {template.category}
                      </span>
                      <span>{template.usageCount} usos</span>
                      <span>Editado: {template.lastEdited}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Grid className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay plantillas</h3>
            <p className="text-muted-foreground mb-6">
              {search ? 'No se encontraron plantillas con esa búsqueda' : 'Comienza creando tu primera plantilla'}
            </p>
            <Button
              onClick={() => router.push('/dashboard/templates')}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear primera plantilla
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}