const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export const strapi = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${STRAPI_URL}/api${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
      cache: 'no-store', // Para desarrollo, en producción usar revalidate
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Strapi API Error (${response.status}): ${error}`)
    }

    return response.json()
  },

  // Templates con búsqueda avanzada
  templates: {
    getAll: async (params?: {
      filters?: any
      sort?: string
      pagination?: { page: number; pageSize: number }
      populate?: string
    }) => {
      const queryParams = new URLSearchParams()
      
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            queryParams.append(`filters[${key}]`, JSON.stringify(value))
          }
        })
      }
      
      if (params?.sort) queryParams.append('sort', params.sort)
      if (params?.pagination) {
        queryParams.append('pagination[page]', params.pagination.page.toString())
        queryParams.append('pagination[pageSize]', params.pagination.pageSize.toString())
      }
      if (params?.populate) queryParams.append('populate', params.populate)
      
      return strapi.fetch(`/templates?${queryParams.toString()}`)
    },

    getById: async (id: string, populate?: string) => {
      const queryParams = new URLSearchParams()
      if (populate) queryParams.append('populate', populate)
      return strapi.fetch(`/templates/${id}?${queryParams.toString()}`)
    },

    getCategories: async () => {
      const response = await strapi.fetch('/templates?fields[0]=category')
      // const categories = [...new Set(response.data.map((t: any) => t.attributes.category))]
      // return categories.filter(Boolean)
      return null;
    },

    search: async (query: string, filters?: any) => {
      const searchFilters = {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
          { tags: { $containsi: query } },
        ],
        ...filters,
      }
      
      return strapi.templates.getAll({ filters: searchFilters, populate: '*' })
    },
  },

  // User templates (plantillas del usuario)
  userTemplates: {
    create: async (userId: string, templateId: string, data: any) => {
      return strapi.fetch('/user-templates', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            user: userId,
            template: templateId,
            customData: data,
            status: 'draft',
          }
        }),
      })
    },

    update: async (id: string, data: any) => {
      return strapi.fetch(`/user-templates/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ data }),
      })
    },

    getUserTemplates: async (userId: string) => {
      return strapi.fetch(`/user-templates?filters[user][id][$eq]=${userId}&populate=template`)
    },
  },
}