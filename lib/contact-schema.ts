import { z } from "zod"

type ContactSchemaMessages = {
  name: string
  company: string
  email: string
  phone: string
}

export function createContactSchema(messages: ContactSchemaMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name),
    company: z.string().trim().min(1, messages.company),
    email: z.string().trim().email(messages.email),
    phone: z.string().trim().min(5, messages.phone),
    message: z.string().trim().optional(),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
  message: z.string().trim().optional(),
})
