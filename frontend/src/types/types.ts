import { z } from 'zod'

export type File = {
  id: number
  filename: string
  uploaded_at: string
  owner_id: number
}

export interface IUser {
  id?: number
  username?: string
  email: string
  password?: string
}

export type ApiError = {
  message: string
  status?: number
  details?: unknown
}

export const formSchema = z.object({
  username: z.string().min(4, { message: 'Username must be at least 4 symbols' }),
  email: z
    .string()
    .email({ message: 'Invalid email ' })
    .regex(/^[\w.-]+@innopolis\.university$/, {
      message: 'Only for Innopolis University students'
    }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})

export type FormSchema = z.infer<typeof formSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email ' })
    .regex(/^[\w.-]+@innopolis\.university$/, {
      message: 'Only for Innopolis University students'
    }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
})

export type LoginSchema = z.infer<typeof loginSchema>
