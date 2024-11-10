'use client';

import { Title } from '@/shared/components/title';
import { WhiteBlock } from '@/shared/components/white-block';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { CheckoutCart } from '@/shared/components/checkout/checkout-cart';
import { useCart } from '@/shared/my-hooks/use-cart';
import { CheckoutSidebar } from '@/shared/components/checkout/checkout-sidebar';

export default function CheckoutPage() {
  const { items, isLoading, totalAmount, removeCartItem, updateItemCount } = useCart();

  return (
    <div className="pt-10">
      <Title size="xl" className="font-extrabold pb-10" text="Оформление заказа" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={items}
            isLoading={isLoading}
            onClickCountButton={updateItemCount}
            onClickRemoveButton={removeCartItem}
          />

          <WhiteBlock title="2. Персональная информация">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Адрес" />
              <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
            </div>
          </WhiteBlock>
        </div>

        <CheckoutSidebar totalAmount={totalAmount} />
      </div>
    </div>
  );
}
