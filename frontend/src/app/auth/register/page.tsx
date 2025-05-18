'use client'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ApiError, formSchema, FormSchema } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/api/auth'

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  const [show, setShow] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await registerUser(data)
      router.push('/files')
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('Registration failed')
      }
    }
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <section className="border-background flex flex-col items-center space-y-8 rounded-4xl border-2 bg-white/1 p-20 backdrop-blur-sm">
        <h1 className="text-background text-center text-5xl font-semibold">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-background flex flex-col items-center space-y-5"
        >
          <div className="w-90 space-y-2">
            {errors.username && (
              <p className="text-left text-sm text-red-400">{errors.username.message}</p>
            )}
            <Input
              id="username"
              type="text"
              {...register('username')}
              placeholder="Username"
              className="text-background h-10"
            />
          </div>
          <div className="w-90 space-y-2">
            {errors.email && (
              <p className="text-left text-sm text-red-400">{errors.email.message}</p>
            )}
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Email"
              className="text-background h-10"
            />
          </div>
          <div className="relative w-90 space-y-2">
            {errors.password && (
              <p className="text-left text-sm text-red-400">{errors.password.message}</p>
            )}
            <Input
              id="password"
              type={show ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className="text-background h-10"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="text-background absolute top-1/2 right-2 -translate-y-[67%]"
              tabIndex={-1}
            >
              {show ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          <Button type="submit" variant="outline" className="text-foreground h-12 w-90 text-lg">
            Sing up
          </Button>
          {error && <p className="text-left text-sm text-red-400">{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default Register
