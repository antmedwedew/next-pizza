import { z } from 'zod';

export const registerFormSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: z.string().min(6, { message: 'Пароль должен содержать не менее 8 символов' }),
    confirmPassword: z.string().min(6, { message: 'Пароль должен содержать не менее 8 символов' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;
