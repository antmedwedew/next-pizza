import { axiosInstance } from '@/services/axios-instance';
import { Ingredient } from '@prisma/client';
import { ApiRoutes } from '@/services/api-variables';

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get(ApiRoutes.INGREDIENTS)).data;
};
