import { axiosInstance } from '@/services/axios-instance';
import { Prisma } from '@prisma/client';
import { ApiRoutes } from '@/services/api-variables';
import ProductUncheckedCreateInput = Prisma.ProductUncheckedCreateInput;

export const search = async (query: string): Promise<ProductUncheckedCreateInput[]> => {
  return (await axiosInstance.get(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data;
};
