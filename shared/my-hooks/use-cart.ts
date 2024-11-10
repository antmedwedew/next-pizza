import { CartStateType, useCartStore } from '@/shared/store/cart';
import { useEffect } from 'react';

interface returnCart extends CartStateType {
  updateItemCount: (id: number, quantity: number, type: 'plus' | 'minus') => void;
}

export const useCart = (): returnCart => {
  const cartState = useCartStore((state) => state);

  const updateItemCount = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity: number = type === 'plus' ? quantity + 1 : quantity - 1;

    cartState.updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    cartState.getCartItems();
  }, []);

  return { ...cartState, updateItemCount };
};
