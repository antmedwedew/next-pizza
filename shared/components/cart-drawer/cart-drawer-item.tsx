'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CartItemDetailsImage } from '@/shared/components/cart-item-details/cart-item-details-image';
import { CartItemDetailsInfo } from '@/shared/components/cart-item-details/cart-item-details-info';
import { CountButton } from '@/shared/components/count-button';
import { CartItemDetailsPrice } from '@/shared/components/cart-item-details/cart-item-details-price';
import { Trash2Icon } from 'lucide-react';
import { CartItemType } from '@/@types/types';

interface CartDrawerItemProps extends CartItemType {
  className?: string;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemoveButton?: () => void;
}

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  onClickRemoveButton,
  disabled,
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', { 'opacity-50 pointer-event-none': disabled }, className)}>
      <CartItemDetailsImage src={imageUrl} />

      <div className="flex-1">
        <div className="flex justify-between">
          <CartItemDetailsInfo name={name} details={details} className="flex-1" />
          <Trash2Icon
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-all"
            size={16}
            onClick={onClickRemoveButton}
          />
        </div>
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
          </div>
        </div>
      </div>
    </div>
  );
};
