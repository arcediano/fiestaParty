import { z } from 'zod'

export const invitationSchema = z.object({
  basicInfo: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    age: z.number().min(1, 'La edad debe ser mayor a 0').max(120, 'Edad inválida'),
    photo: z.string().optional(),
    adults: z.number().min(1, 'Debe haber al menos 1 adulto'),
    children: z.number().min(0, 'El número de niños no puede ser negativo'),
  }),
  eventDetails: z.object({
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
    placeName: z.string().optional(),
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  guests: z.object({
    rsvpEnabled: z.boolean(),
    maxGuests: z.number().min(1, 'El número máximo de invitados debe ser al menos 1'),
    foodPreferences: z.boolean(),
    allergiesEnabled: z.boolean(),
  }),
  design: z.object({
    theme: z.enum(['modern', 'elegant', 'kids', 'themed', 'minimal']),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    font: z.string().optional(),
    customImages: z.array(z.string()).optional(),
  }),
})

export type InvitationFormData = z.infer<typeof invitationSchema>