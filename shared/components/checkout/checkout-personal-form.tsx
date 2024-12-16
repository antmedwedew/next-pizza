import { FC } from 'react';
import { FormInput } from '@/shared/form-components/form-input';
import { WhiteBlock } from '@/shared/components/white-block';

interface CheckoutPersonalFormProps {}

export const CheckoutPersonalForm: FC<CheckoutPersonalFormProps> = ({}) => (
  <WhiteBlock title="2. Персональная информация">
    <div className="grid grid-cols-2 gap-5">
      <FormInput name="firstName" label="Имя" required />
      <FormInput name="lastName" label="Фамилия" required />
      <FormInput name="email" label="E-mail" required />
      <FormInput name="phone" label="Телефон" required />
    </div>
  </WhiteBlock>
);
