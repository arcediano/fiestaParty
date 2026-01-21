import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Template, TemplateCategory, FilterOptions } from '@/types'
// import { templateService } from '@/lib/services/template-service'

export const useTemplates = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['templates', filters],
    // queryFn: () => templateService.getTemplates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useTemplate = (id: string) => {
  return useQuery({
    queryKey: ['template', id],
    // queryFn: () => templateService.getTemplateById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useCreateTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    // mutationFn: (data: Partial<Template>) => templateService.createTemplate(data),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient()
  
  // return useMutation({
  //   mutationFn: ({ id, data }: { id: string; data: Partial<Template> }) =>
  //     templateService.updateTemplate(id, data),
  //   onSuccess: (_, variables) => {
  //     // Invalidar queries específicas
  //     queryClient.invalidateQueries({ queryKey: ['templates'] })
  //     queryClient.invalidateQueries({ queryKey: ['template', variables.id] })
  //   },
  // })
}

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient()
  
  // return useMutation({
  //   mutationFn: (id: string) => templateService.deleteTemplate(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['templates'] })
  //   },
  // })
}

export const useTemplatesByCategory = (category: TemplateCategory) => {
  return useQuery({
    queryKey: ['templates', 'category', category],
    // queryFn: () => templateService.getTemplatesByCategory(category),
    staleTime: 10 * 60 * 1000,
  })
}

export const usePopularTemplates = (limit?: number) => {
  return useQuery({
    queryKey: ['templates', 'popular', limit],
    // queryFn: () => templateService.getPopularTemplates(limit),
    staleTime: 15 * 60 * 1000, // 15 minutos
  })
}

export const useSearchTemplates = (query: string) => {
  return useQuery({
    queryKey: ['templates', 'search', query],
    // queryFn: () => templateService.searchTemplates(query),
    enabled: query.length > 2, // Solo buscar si hay más de 2 caracteres
    staleTime: 2 * 60 * 1000, // 2 minutos para búsquedas
  })
}