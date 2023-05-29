'use client'

import axios from "axios";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/input/Input";
import { BsGithub, BsGoogle } from "react-icons/bs"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthSocialButton } from "./AuthSocialButton";
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated'){
      router.push('/conversations')
    }
  },[session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN');
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Credenciais Inválida!');
        }

        if (callback?.ok) {
          toast.success('Logado!')
          router.push('/conversations')
        }
      })
      .catch(() => toast.error('Algo deu errado!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Credenciais Inválida!');
        }

        if (callback?.ok) {
          toast.success('Logado!')
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Credenciais Inválida!');
        }

        if (callback?.ok) {
          toast.success('Logado!')
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false));
  }


  return(
    <div
    className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div
      className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"
      >
        <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Nome"
              register={register}
              errors={errors}
            />
          )}
          <Input
              id="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div
            className=""
            >
              <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              >
                {variant === 'LOGIN' ? 'Entrar' : 'Registrar'}
              </Button>
            </div>
        </form>

        <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Ou continuar com
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                Icon={BsGithub}
                onClick={() => socialAction('github')}
              />

              <AuthSocialButton
                Icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
            </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? 'Novo no Messanger?' : 'Já possui uma conta?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Crie uma conta' : 'Entrar'}
          </div>
        </div>
      </div>
    </div>
  )
}
