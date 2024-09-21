import { axiosInstance } from '@/services/axios-instance';
import { Prisma } from '@prisma/client';
import { ApiRoutes } from '@/services/api-variables';
import IngredientUncheckedCreateInput = Prisma.IngredientUncheckedCreateInput;

export const getAll = async (): Promise<IngredientUncheckedCreateInput[]> => {
  return (await axiosInstance.get(ApiRoutes.INGREDIENTS)).data;
};
