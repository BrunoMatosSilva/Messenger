'use client'

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Modal } from "../Modal";
import { Input } from "../input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

export const SettingsModal = ({ isOpen, onClose, currentUser }: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUplodad = (result: any) => {
    setValue('image',  result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post(`/api/settings`, data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => {
      toast.error('Algo deu errado!')
    })
    .finally(() => setIsLoading(false));
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
        className="space-y-12"
        >
          <div
          className="border-b border-gray-900/10 pb-12"
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Perfil
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Editar suas informações e salvar.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
              disabled={isLoading}
              label="Nome"
              id="name"
              errors={errors}
              required
              register={register}
              />

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Foto
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                  width={48}
                  height={48}
                  className="rounded-full"
                  src={image || currentUser?.image || '/images/placeholder.jpg'}
                  alt="Avatar"
                  />
                  <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUplodad}
                  uploadPreset="kfv4reg7"
                  >
                    <Button
                    disabled={isLoading}
                    secondary
                    type="button"
                    >
                      Trocar
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
          className="mt-6 flex items-center justify-end gap-x-6"
          >
            <Button
            disabled={isLoading}
            secondary
            onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
            disabled={isLoading}
            type="submit"
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
