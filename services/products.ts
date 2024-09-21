import { axiosInstance } from '@/services/axios-instance';
import { Product } from '@prisma/client';
import { ApiRoutes } from '@/services/api-variables';

export const search = async (query: string): Promise<Product[]> => {
  return (await axiosInstance.get(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data;
};
