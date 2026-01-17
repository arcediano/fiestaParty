'use client'

import { useState } from 'react'
import { 
  useTemplates, 
  useDeleteTemplate,
  usePopularTemplates 
} from '@/lib/hooks/useTemplates'
import { Template, TemplateCategory } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Crown,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCategoryInfo } from '@/types/utils'

export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  // Usar hooks de React Query
  const { data: templatesData, isLoading } = useTemplates({
    search: searchQuery,
    filters: {
      ...(selectedCategory !== 'all' && { category: selectedCategory }),
      ...(showPremiumOnly && { isPremium: true })
    }
  })

  const { data: popularTemplates } = usePopularTemplates(4)
  const deleteMutation = useDeleteTemplate()

  const templates = templatesData?.data || []
  const pagination = templatesData?.pagination

  const categories: Array<TemplateCategory | 'all'> = [
    'all',
    'birthday',
    'wedding',
    'baby-shower',
    'corporate',
    'graduation',
    'anniversary',
    'other'
  ]

  const handleDeleteTemplate = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      try {
        await deleteMutation.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting template:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plantillas</h1>
          <p className="text-muted-foreground mt-2">
            {templates.length} plantillas disponibles • {pagination?.total || 0} en total
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Plantilla
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar plantillas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Categorías */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const info = category === 'all' 
                  ? { label: 'Todas', icon: '📁', color: '#6B7280' }
                  : getCategoryInfo(category)
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors',
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <span>{info.icon}</span>
                    <span>{info.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Controles de vista */}
            <div className="flex items-center gap-2">
              <Button
                variant={showPremiumOnly ? 'default' : 'outline'}
                size="icon"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                className={showPremiumOnly ? 'bg-amber-500 hover:bg-amber-600' : ''}
              >
                <Crown className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plantillas Populares */}
      {popularTemplates && popularTemplates.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Plantillas Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Todas las Plantillas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Todas las Plantillas {selectedCategory !== 'all' && `- ${getCategoryInfo(selectedCategory).label}`}
          </h2>
          <div className="text-sm text-muted-foreground">
            Página {pagination?.page} de {pagination?.pageCount}
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                viewMode="grid"
                onDelete={handleDeleteTemplate}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {templates.map((template) => (
              <TemplateListItem 
                key={template.id} 
                template={template}
                onDelete={handleDeleteTemplate}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No se encontraron plantillas
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay plantillas disponibles'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente Card para vista grid
interface TemplateCardProps {
  template: Template
  viewMode: 'grid' | 'list'
  onDelete?: (id: string) => void
}

function TemplateCard({ template, onDelete }: TemplateCardProps) {
  const categoryInfo = getCategoryInfo(template.category)
  
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow group">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span>{categoryInfo.icon}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {categoryInfo.label}
              </span>
              {template.isPremium && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                  <Crown className="inline h-3 w-3 mr-1" />
                  Premium
                </span>
              )}
            </div>
            <CardTitle className="text-lg text-foreground line-clamp-1">
              {template.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2 mt-1">
              {template.description}
            </CardDescription>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {/* Preview Image */}
        <div 
          className="aspect-video rounded-lg mb-4 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        >
          {template.previewImage ? (
            <img 
              src={template.previewImage} 
              alt={template.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="text-3xl mb-2">{categoryInfo.icon}</div>
              <div className="text-sm">Vista previa</div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{template.rating.toFixed(1)}</span>
            <span className="mx-1">•</span>
            <span>{template.usageCount} usos</span>
          </div>
          {template.price && (
            <div className="font-semibold text-foreground">
              ${template.price}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <Eye className="h-3 w-3" />
            Vista previa
          </Button>
          <Button size="sm" className="flex-1 gap-2">
            <Edit className="h-3 w-3" />
            Usar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para vista lista
function TemplateListItem({ template, onDelete }: TemplateCardProps) {
  const categoryInfo = getCategoryInfo(template.category)
  
  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
      {/* Preview */}
      <div className="w-24 h-16 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        {categoryInfo.icon}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-foreground">{template.name}</h3>
          {template.isPremium && (
            <Crown className="h-3 w-3 text-amber-500" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {template.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {categoryInfo.label}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span>{template.rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {template.usageCount} usos
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        {template.price ? (
          <div className="font-semibold text-foreground">${template.price}</div>
        ) : (
          <div className="text-sm text-green-600">Gratis</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        {onDelete && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDelete(template.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}