import { FC } from 'react';
import { ICartItem } from '@/shared/store/cart';
import { CartDrawerItem } from '@/shared/components/cart-drawer/cart-drawer-item';
import { getProductItemDetails } from '@/shared/lib/get-product-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface CartDrawerItems {
  items: ICartItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemoveButton: (id: number) => void;
}

export const CartDrawerItems: FC<CartDrawerItems> = ({ items, onClickCountButton, onClickRemoveButton }) => (
  <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
    {items.map((item: ICartItem) => (
      <CartDrawerItem
        key={item.id}
        id={item.id}
        imageUrl={item.imageUrl}
        details={getProductItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
        disabled={item.disabled}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        className="mb-1"
        onClickCountButton={(type: 'plus' | 'minus') => onClickCountButton(item.id, item.quantity, type)}
        onClickRemoveButton={() => onClickRemoveButton(item.id)}
      />
    ))}
  </div>
);
