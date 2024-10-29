import { ICartItem, useCartStore } from '@/shared/store/cart';
import { useEffect } from 'react';
import { CreateCartItemValuesType } from '@/@types/types';

interface returnCart {
  isLoading: boolean;
  totalAmount: number;
  items: ICartItem[];
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValuesType) => Promise<void>;
}

export const useCart = (): returnCart => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.getCartItems();
  }, []);

  return cartState;
};
