'use client';

import { Title } from '@/shared/components/title';
import { CheckoutCart } from '@/shared/components/checkout/checkout-cart';
import { useCart } from '@/shared/my-hooks/use-cart';
import { CheckoutSidebar } from '@/shared/components/checkout/checkout-sidebar';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutPersonalForm } from '@/shared/components/checkout/checkout-personal-form';
import { CheckoutAddressForm } from '@/shared/components/checkout/checkout-address-form';
import { checkoutFormSchema, CheckoutFormType } from '@/shared/form-schemas/checkout-form-schema';

export default function CheckoutPage() {
  const { items, isLoading, totalAmount, removeCartItem, updateItemCount } = useCart();

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit = (data: CheckoutFormType) => {
    console.log(data);
  };

  return (
    <div className="pt-10">
      <Title size="xl" className="font-extrabold pb-10" text="Оформление заказа" />

      <FormProvider {...form}>
        <form className="flex gap-10" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart
              items={items}
              isLoading={isLoading}
              onClickCountButton={updateItemCount}
              onClickRemoveButton={removeCartItem}
            />

            <CheckoutPersonalForm />

            <CheckoutAddressForm />
          </div>

          <CheckoutSidebar totalAmount={totalAmount} />
        </form>
      </FormProvider>
    </div>
  );
}
