'use client';

import { FC } from 'react';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from '@/shared/components/container';
import { Title } from '@/shared/components/title';
import { FormInput } from '@/shared/components/form-elements/form-input';
import { Button } from '@/shared/components/ui/button';
import { updateUserInfo } from '@/app/actions';
import { profileFormSchema, ProfileFormType } from '@/shared/form-schemas/profile-form-schema';

interface ProfileFormProps {
  data: User;
}

export const ProfileForm: FC<ProfileFormProps> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ProfileFormType) => {
    try {
      await updateUserInfo({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      toast.success('Данные обновлены');
    } catch (err) {
      return toast.error('Ошибка при обновлении данных');
    }
  };

  const onClickSingOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="py-10">
      <Title text="Личные данные" size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="fullName" label="Полное имя" required />
          <FormInput name="email" required label="E-mail" />

          <FormInput name="password" type="password" label="Новый пароль" required />
          <FormInput name="confirmPassword" type="password" label="Повторите пароль" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-5">
            Сохранить
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base"
            onClick={onClickSingOut}
            variant="secondary"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
