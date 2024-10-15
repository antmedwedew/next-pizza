import { axiosInstance } from '@/shared/services/axios-instance';
import { ApiRoutes } from '@/shared/services/api-variables';
import { CartWithRelations } from '@/@types/prisma';
import { CreateCartItemValuesType } from '@/@types/types';

export const getCart = async (): Promise<CartWithRelations> => {
  return (await axiosInstance.get<CartWithRelations>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartWithRelations> => {
  return (await axiosInstance.patch<CartWithRelations>(`${ApiRoutes.CART}/${itemId}`, { quantity })).data;
};

export const removeCartItem = async (itemId: number): Promise<CartWithRelations> => {
  return (await axiosInstance.delete<CartWithRelations>(`${ApiRoutes.CART}/${itemId}`)).data;
};

export const addCartItem = async (values: CreateCartItemValuesType): Promise<CartWithRelations> => {
  return (await axiosInstance.post<CartWithRelations>(`${ApiRoutes.CART}`, values)).data;
};
