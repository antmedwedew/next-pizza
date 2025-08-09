import { z } from 'zod';

export const profileFormSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
      .optional()
      .or(z.literal('')),
    confirmPassword: z
      .string()
      .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => (!data.password && !data.confirmPassword) || data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type ProfileFormType = z.infer<typeof profileFormSchema>;
