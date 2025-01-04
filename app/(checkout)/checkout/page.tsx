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
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, isLoading, totalAmount, removeCartItem, updateItemCount } = useCart();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();

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

  const onSubmit = async (data: CheckoutFormType) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success('Заказ успешно оформлен! Переход на оплату');

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ');
    }
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

          <CheckoutSidebar isLoading={isLoading || submitting} totalAmount={totalAmount} />
        </form>
      </FormProvider>
    </div>
  );
}
