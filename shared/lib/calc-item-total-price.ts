import { CartItemWithRelations } from '@/@types/prisma';
import { Ingredient } from '@prisma/client';

export const calcItemTotalPrice = (item: CartItemWithRelations): number => {
  const ingredientsPrice = item.ingredients.reduce((acc: number, ingredient: Ingredient) => acc + ingredient.price, 0);

  return (item.productVariant.price + ingredientsPrice) * item.quantity;
};
