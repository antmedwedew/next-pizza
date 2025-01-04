import { FC } from 'react';
import { WhiteBlock } from '@/shared/components/white-block';
import { Controller, useFormContext } from 'react-hook-form';
import { AddressSearchInput } from '@/shared/components/address-search-input';
import { FormTextarea } from '@/shared/components/form-elements/form-textarea';

interface CheckoutAddressFormProps {}

export const CheckoutAddressForm: FC<CheckoutAddressFormProps> = ({}) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          render={({ field, fieldState }) => (
            <div>
              <AddressSearchInput onChange={field.onChange} />
              {fieldState.error && <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>}
            </div>
          )}
          control={control}
          name="address"
        />
        <FormTextarea name="comment" label="Комментарий" />
      </div>
    </WhiteBlock>
  );
};
