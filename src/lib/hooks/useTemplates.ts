import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { strapi } from '@/lib/strapi'
import { Template } from '@/types'

export const useTemplates = (filters?: {
  search?: string
  category?: string
  isPremium?: boolean
  sort?: string
  page?: number
  pageSize?: number
}) => {
  return useQuery({
    queryKey: ['templates', filters],
    queryFn: async () => {
      const params: any = {
        populate: '*',
        sort: filters?.sort || 'createdAt:desc',
      }

      if (filters?.search) {
        params.filters = {
          $or: [
            { name: { $containsi: filters.search } },
            { description: { $containsi: filters.search } },
            { tags: { $containsi: filters.search } },
          ]
        }
      }

      if (filters?.category) {
        params.filters = {
          ...params.filters,
          category: { $eq: filters.category }
        }
      }

      if (filters?.isPremium !== undefined) {
        params.filters = {
          ...params.filters,
          isPremium: { $eq: filters.isPremium }
        }
      }

      if (filters?.page && filters?.pageSize) {
        params.pagination = {
          page: filters.page,
          pageSize: filters.pageSize
        }
      }

      const response = await strapi.templates.getAll(params)
      
      // Transformar datos de Strapi
      return response.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        category: item.attributes.category,
        isPremium: item.attributes.isPremium,
        price: item.attributes.price,
        rating: item.attributes.rating,
        usageCount: item.attributes.usageCount,
        htmlContent: item.attributes.htmlContent,
        cssContent: item.attributes.cssContent,
        jsContent: item.attributes.jsContent,
        previewImage: item.attributes.previewImage?.data?.attributes?.url,
        features: item.attributes.features || [],
        tags: item.attributes.tags || [],
        colorScheme: item.attributes.colorScheme || {},
        isActive: item.attributes.isActive,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      })) as Template[]
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useTemplate = (id: string) => {
  return useQuery({
    queryKey: ['template', id],
    queryFn: () => strapi.templates.getById(id, '*'),
    enabled: !!id,
  })
}

export const useCreateUserTemplate = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, templateId, data }: {
      userId: string
      templateId: string
      data: any
    }) => strapi.userTemplates.create(userId, templateId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-templates'] })
    },
  })
}