'use client';

import { FC, PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';

interface CartDrawerProps {}

export const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          <CartDrawerItem
            id={1}
            imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp"
            details={getCartItemDetails(2, 30, [{ name: 'много сыра' }])}
            name="Сырная"
            price={1000}
            quantity={1}
            className="mb-1"
          />
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <div className="flex flex-1 text-lg">
                Итого
                <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
              </div>
              <div className="font-bold text-lg">1000 ₽</div>
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
