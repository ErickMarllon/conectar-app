import { cn } from '@/lib/utils';
import type { IUser } from '@/shared/interfaces/IUser';
import React, { useEffect } from 'react';
import { formatToDatetimeLocal } from '@/shared/utils/formatToDatetimeLocal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { FormField } from './FormField';
import { schema } from './schema';
import { useUserPath } from '@/queries/useUserPath/useUserPath';
import { useDashboardUserModal } from '@/views/Dashboard/context/use-dashboard.context';

interface ProfileFormProps extends React.ComponentProps<'form'> {
  userData?: IUser;
}
export type IUserForm = z.infer<typeof schema>;
export function ProfileForm({ userData, className }: ProfileFormProps) {
  const { closeModal, callRegisteredFunction } = useDashboardUserModal();

  
  const { mutate, isSuccess, isError, isPending } = useUserPath();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserForm>({
    resolver: zodResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  });

  useEffect(() => {
    if (userData && userData.id) {
      reset({
        ...userData,
        updated_at: formatToDatetimeLocal(userData.updated_at),
        created_at: formatToDatetimeLocal(userData.created_at),
        last_login_at: formatToDatetimeLocal(userData.last_login_at),
        deleted_at: formatToDatetimeLocal(userData.deleted_at),
      });
    }
  }, [reset, userData]);

  function onSubmit(data: IUserForm) {
    mutate(data);
  }
  useEffect(() => {
    if ((isSuccess || isError) && !isPending) {
      closeModal();
      callRegisteredFunction();
    }
  }, [callRegisteredFunction, closeModal, isError, isPending, isSuccess]);
  return (
    <form className={cn('grid items-start gap-6', className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormField<IUserForm>
          label="Id"
          name="id"
          type="text"
          placeholder="Digite o nome"
          register={register}
          error={errors.first_name?.message}
          readOnly
        />

        <FormField<IUserForm>
          label="Função"
          name="role"
          options={[
            { label: 'Administrador', value: 'ADMIN' },
            { label: 'Usuário', value: 'USER' },
          ]}
          defaultValue={userData?.role}
          placeholder="Digite o nome"
          register={register}
          error={errors.first_name?.message}
        />
        <FormField<IUserForm>
          label="Senha"
          name="password"
          type="password"
          defaultValue={userData?.role}
          placeholder="Digite o nome"
          register={register}
          error={errors.first_name?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField<IUserForm>
          label="Nome"
          name="first_name"
          type="text"
          placeholder="Digite o nome"
          register={register}
          error={errors.first_name?.message}
        />
        <FormField<IUserForm>
          label="Sobrenome"
          name="last_name"
          type="text"
          placeholder="Digite o nome"
          register={register}
          error={errors.first_name?.message}
        />
      </div>
      <FormField<IUserForm>
        label="Email"
        name="email"
        type="text"
        placeholder="Digite o E-mail"
        register={register}
        error={errors.first_name?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField<IUserForm>
          label="Data de Criação"
          name="created_at"
          type="datetime-local"
          register={register}
          readOnly
          error={errors.first_name?.message}
        />
        <FormField<IUserForm>
          label="Data da Última Atualização"
          name="updated_at"
          type="text"
          register={register}
          readOnly
          error={errors.first_name?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField<IUserForm>
          label="Último Login"
          name="last_login_at"
          type="datetime-local"
          placeholder="yyyy-MM-dd"
          register={register}
          readOnly
          error={errors.first_name?.message}
        />
        <FormField<IUserForm>
          label="Data de Exclusão"
          name="deleted_at"
          type="text"
          placeholder="AAAA//MM/DD"
          register={register}
          readOnly
          error={errors.first_name?.message}
        />
      </div>
      <Button type="submit" className="w-full">
        {userData?.id ? 'Atualizar' : 'Cadastrar'}
      </Button>
    </form>
  );
}
