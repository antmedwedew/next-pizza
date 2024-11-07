import { FC } from 'react';
import { CheckoutItem } from '@/shared/components/checkout/checkout-item';
import { WhiteBlock } from '@/shared/components/white-block';
import { CheckoutItemSkeleton } from '@/shared/components/checkout/checkout-item-skeleton';
import { ICartItem } from '@/shared/store/cart';
import { getProductItemDetails } from '@/shared/lib/get-product-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface CheckoutCartProps {
  items: ICartItem[];
  isLoading: boolean;
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemoveButton: (id: number) => void;
}

export const CheckoutCart: FC<CheckoutCartProps> = ({ items, isLoading, onClickCountButton, onClickRemoveButton }) => {
  return (
    <WhiteBlock title="1. Корзина" endAdornment={<div>Очистить корзину</div>}>
      <div className="flex flex-col">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <CheckoutItemSkeleton
                key={index}
                className="py-5 first:pt-0 last:pb-0 border-b last:mb-0 last:border-b-0"
              />
            ))
          : items.map((item: ICartItem) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getProductItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type: 'plus' | 'minus') => onClickCountButton(item.id, item.quantity, type)}
                onClickRemoveButton={() => onClickRemoveButton(item.id)}
                className="py-5 first:pt-0 last:pb-0 border-b last:mb-0 last:border-b-0"
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
