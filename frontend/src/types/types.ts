import { z } from 'zod'

export type File = {
  id: number
  name: string
  uploaded_from: number
}

export interface User {
  user_id: number
  username: string
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
