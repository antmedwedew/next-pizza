import { FC } from 'react';
import { WhiteBlock } from '@/shared/components/white-block';
import { FormInput } from '@/shared/form-components/form-input';
import { FormTextarea } from '@/shared/form-components/form-textarea';

interface CheckoutAddressFormProps {}

export const CheckoutAddressForm: FC<CheckoutAddressFormProps> = ({}) => (
  <WhiteBlock title="3. Адрес доставки">
    <div className="flex flex-col gap-5">
      <FormInput name="address" label="Адресс доставки" required />
      <FormTextarea name="comment" label="Комментарий" />
    </div>
  </WhiteBlock>
);
