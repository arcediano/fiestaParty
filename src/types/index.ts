export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  isPremium: boolean
  price?: number
  rating: number
  usageCount: number
  htmlContent: string
  cssContent: string
  jsContent?: string
  previewImage?: string
  features: string[]
  tags: string[]
  colorScheme: ColorScheme
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface StrapiTemplateResponse {
  data: {
    id: string
    attributes: Omit<Template, 'id'> & {
      previewImage?: {
        data?: {
          attributes: {
            url: string
            formats: any
          }
        }
      }
    }
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface UserTemplate {
  id: string
  userId: string
  templateId: string
  template: Template
  customData: any
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

// Tipos para el editor
export interface TemplateField {
  id: string
  type: 'text' | 'number' | 'date' | 'color' | 'image' | 'select'
  label: string
  defaultValue: any
  options?: string[]
  required: boolean
}

export interface TemplateSection {
  id: string
  name: string
  fields: TemplateField[]
}