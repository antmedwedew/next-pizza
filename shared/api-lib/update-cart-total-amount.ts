import { prisma } from '@/prisma/prisma-client';
import { calcItemTotalPrice } from '@/shared/lib/calc-item-total-price';
import { CartItemWithRelations } from '@/@types/prisma';
import { Cart } from '@prisma/client';

export const updateCartTotalAmount = async (token: string): Promise<Cart | 0> => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!userCart) {
    return 0;
  }

  const totalAmount = userCart.items.reduce((acc: number, item: CartItemWithRelations) => {
    return acc + calcItemTotalPrice(item);
  }, 0);

  return prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
