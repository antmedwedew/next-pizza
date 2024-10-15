import { prisma } from '@/prisma/prisma-client';
import { Cart } from '@prisma/client';

export const findOrCreateCart = async (token: string): Promise<Cart> => {
  let userCart: Cart | null = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};
