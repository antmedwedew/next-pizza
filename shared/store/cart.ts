import { create } from 'zustand';
import { Api } from '@/shared/services/api-client';
import { CreateCartItemValuesType } from '@/@types/types';
import { CartWithRelations } from '@/@types/prisma';
import { getCartDetails } from '@/shared/lib/get-cart-details';

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
  isError: boolean;
  totalAmount: number;
  items: ICartItem[];
  getCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValuesType) => Promise<void>;
}

export const useCartStore = create<CartStateType>()((set) => ({
  isLoading: true,
  isError: false,
  totalAmount: 0,
  items: [],

  getCartItems: async () => {
    try {
      set({ isLoading: true, isError: false });
      const data: CartWithRelations = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (err) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ isLoading: true, isError: false });
      const data: CartWithRelations = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        isLoading: true,
        isError: false,
        items: state.items.map((item: ICartItem) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data: CartWithRelations = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      set({ isError: true });
    } finally {
      set((state) => ({
        isLoading: false,
        items: state.items.map((item: ICartItem) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValuesType) => {
    try {
      set({ isLoading: true, isError: false });
      const data: CartWithRelations = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
