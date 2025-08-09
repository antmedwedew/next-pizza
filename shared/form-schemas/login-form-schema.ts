import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: z.string().min(6, { message: 'Пароль должен содержать не менее 8 символов' }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
