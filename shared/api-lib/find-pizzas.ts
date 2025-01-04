import { prisma } from '@/prisma/prisma-client';
import { CategoryWithRelations } from '@/@types/prisma';

export interface GetSearchParamsType {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE: number = 0;
const DEFAULT_MAX_PRICE: number = 5000;

export const findPizzas = async (params: GetSearchParamsType): Promise<CategoryWithRelations[]> => {
  const sizes: number[] | undefined = params.sizes?.split(',').map(Number);
  const pizzaTypes: number[] | undefined = params.pizzaTypes?.split(',').map(Number);
  const ingredientsIdArr: number[] | undefined = params.ingredients?.split(',').map(Number);
  const minPrice: number = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice: number = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories: CategoryWithRelations[] = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};
