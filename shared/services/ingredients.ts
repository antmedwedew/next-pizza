import { Ingredient } from '@prisma/client';
import { ApiRoutes } from '@/shared/services/api-variables';
import { axiosInstance } from '@/shared/services/axios-instance';

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get(ApiRoutes.INGREDIENTS)).data;
};
