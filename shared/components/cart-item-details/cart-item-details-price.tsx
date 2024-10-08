import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface CartItemDetailsPriceProps {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: FC<CartItemDetailsPriceProps> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
