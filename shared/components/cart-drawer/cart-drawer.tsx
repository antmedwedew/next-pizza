'use client';

import { FC, PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { cn, decOfNumber } from '@/shared/lib/utils';
import { DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { useCart } from '@/shared/my-hooks/use-cart';
import { CartDrawerEmpty } from '@/shared/components/cart-drawer/cart-drawer-empty';
import { CartDrawerFooter } from '@/shared/components/cart-drawer/cart-drawer-footer';
import { CartDrawerItems } from '@/shared/components/cart-drawer/cart-drawer-items';

interface CartDrawerProps {}

export const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = ({ children }) => {
  const { totalAmount, items, removeCartItem, updateItemCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className={cn('flex flex-col pb-0 bg-page', !totalAmount ? 'justify-center' : 'justify-between')}>
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

            <CartDrawerItems items={items} onClickCountButton={updateItemCount} onClickRemoveButton={removeCartItem} />
            <CartDrawerFooter totalAmount={totalAmount} />
          </>
        ) : (
          <CartDrawerEmpty />
        )}
      </SheetContent>
    </Sheet>
  );
};
