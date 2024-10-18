'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/cart-drawer-item';
import { getProductItemDetails } from '@/shared/lib/get-product-item-details';
import { ICartItem, useCartStore } from '@/shared/store/cart';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn, decOfNumber, priceRu } from '@/shared/lib/utils';
import { DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { Title } from '@/shared/components/title';

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

      <SheetContent
        className={cn('flex flex-col pb-0 bg-[#F4F1EE]', !totalAmount ? 'justify-center' : 'justify-between')}
      >
        <DialogTitle title="" className="hidden" />
        <DialogDescription title="" className="hidden" />
        {totalAmount > 0 ? (
          <>
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
                      ? getProductItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )
                      : ''
                  }
                  disabled={item.disabled}
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-72 mx-auto">
            <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
            <Title text="Корзина пустая" size="sm" className="text-center my-2" />
            <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>

            <SheetClose>
              <Button className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
