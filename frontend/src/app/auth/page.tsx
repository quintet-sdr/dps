'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  const [show, setShow] = useState<boolean>(false)

  const router = useRouter()

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <section className="border-background flex flex-col items-center space-y-8 rounded-4xl border-2 bg-white/1 p-20 backdrop-blur-sm">
        <h1 className="text-background text-center text-5xl font-semibold">Log in</h1>
        <form className="flex flex-col items-center space-y-5">
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
            Log in
          </Button>
        </form>
        <hr className="text-background w-90" />
        <section className="text-background flex flex-col space-y-4">
          <h4 className="text-center text-xl font-semibold">First time here?</h4>
          <Button
            type="submit"
            variant="default"
            className="text-background hover:border-background h-12 w-90 border border-transparent bg-[#edfff1] text-lg hover:bg-[#EDF1F8]"
            onClick={() => router.push('/auth/register')}
          >
            Sign up
          </Button>
        </section>
      </section>
    </main>
  )
}

export default Auth
