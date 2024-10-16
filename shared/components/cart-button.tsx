'use client';

import { FC } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn, priceRu } from '@/shared/lib/utils';
import { CartDrawer } from '@/shared/components/cart-drawer';
import { useCartStore } from '@/shared/store/cart';

interface CartButtonProps {
  className?: string;
}

export const CartButton: FC<CartButtonProps> = ({ className }) => {
  const [totalAmount, isLoading, items] = useCartStore((state) => [state.totalAmount, state.isLoading, state.items]);

  return (
    <CartDrawer>
      <Button loading={isLoading} className={cn('group relative', { 'w-[135px]': isLoading }, className)}>
        <b>{priceRu(totalAmount)}</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
