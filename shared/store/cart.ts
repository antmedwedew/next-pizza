import { create } from 'zustand';
import { Api } from '@/shared/services/api-client';
import { getCartDetails } from '@/shared/lib/get-cart-details';
import { CreateCartItemValuesType } from '@/@types/types';

export interface ICartItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
}

interface CartStateType {
  isLoading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];
  getCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValuesType) => Promise<void>;
}

export const useCartStore = create<CartStateType>()((set) => ({
  isLoading: true,
  error: false,
  totalAmount: 0,
  items: [],

  getCartItems: async () => {
    try {
      set({ isLoading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ isLoading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set({ isLoading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValuesType) => {
    try {
      set({ isLoading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
