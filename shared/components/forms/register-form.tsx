import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormType } from '@/shared/form-schemas/login-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/shared/components/form-elements/form-input';
import { Title } from '@/shared/components/title';
import { Button } from '@/shared/components/ui/button';
import toast from 'react-hot-toast';
import { registerFormSchema, RegisterFormType } from '@/shared/form-schemas/register-form-schema';
import { registerUser } from '@/app/actions';

interface RegisterFormProps {
  onClose: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onClose }) => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      toast.success('Вы успешно зарегестрировались. Подтвердите свою почту');
      onClose();
    } catch (err) {
      console.error('Ошибка регистрации', err);
      toast.error('Не удалось создать аккаунт');
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Создать аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Заполните все данные для создания аккаунта</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="email" required label="E-mail" />

        <FormInput name="password" type="password" label="Новый пароль" required />
        <FormInput name="confirmPassword" type="password" label="Повторите пароль" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
