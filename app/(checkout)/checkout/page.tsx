'use client';

import { Title } from '@/shared/components/title';
import { WhiteBlock } from '@/shared/components/white-block';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { priceRu } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CheckoutCart } from '@/shared/components/checkout/checkout-cart';
import { useCart } from '@/shared/my-hooks/use-cart';

export default function CheckoutPage() {
  const { updateItemQuantity, items, isLoading, totalAmount, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity: number = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className="pt-10">
      <Title size="xl" className="font-extrabold pb-10" text="Оформление заказа" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={items}
            isLoading={isLoading}
            onClickCountButton={onClickCountButton}
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

        <div className="w-[450px]">
          <WhiteBlock className="sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">{priceRu(totalAmount)}</span>
            </div>

            <Button className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Перейти к оплате <ArrowRight size={20} className="ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </div>
  );
}
