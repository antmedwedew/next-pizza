'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemType } from '@/@types/types';
import { CartItemDetailsImage } from '@/shared/components/cart-item-details/cart-item-details-image';
import { CartItemDetailsInfo } from '@/shared/components/cart-item-details/cart-item-details-info';
import { CountButton } from '@/shared/components/count-button';
import { CartItemDetailsPrice } from '@/shared/components/cart-item-details/cart-item-details-price';

interface CheckoutItemProps extends CartItemType {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CheckoutItem: FC<CheckoutItemProps> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemoveButton,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemDetailsInfo name={name} details={details} className="w-1/2" />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemoveButton}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
