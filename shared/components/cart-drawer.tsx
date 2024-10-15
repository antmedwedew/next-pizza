'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { ICartItem, useCartStore } from '@/shared/store/cart';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { decOfNumber, priceRu } from '@/shared/lib/utils';
import { DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';

interface CartDrawerProps {}

export const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = ({ children }) => {
  const [totalAmount, items, getCartItems, updateItemQuantity, removeCartItem] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.getCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
  ]);

  useEffect(() => {
    getCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity: number = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <DialogTitle title="" className="hidden" />
        <DialogDescription title="" className="hidden" />
        <SheetHeader>
          <SheetTitle>
            В корзине{' '}
            <span className="font-bold">
              {items.length} {decOfNumber(items.length, ['товар', 'товара', 'товаров'])}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          {items.map((item: ICartItem) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={
                item.pizzaType && item.pizzaSize
                  ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                  : ''
              }
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type: 'plus' | 'minus') => onClickCountButton(item.id, item.quantity, type)}
              className="mb-1"
              onClickRemoveButton={() => removeCartItem(item.id)}
            />
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <div className="flex flex-1 text-lg">
                Итого
                <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
              </div>
              <div className="font-bold text-lg">{priceRu(totalAmount)}</div>
            </div>

            <Link href="/cart">
              <Button className="w-full h-12 text-base" type="submit">
                Оформить заказ
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
