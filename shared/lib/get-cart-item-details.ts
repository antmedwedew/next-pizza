import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingredient } from '@prisma/client';

export const getCartItemDetails = (pizzaType: PizzaType, pizzaSize: PizzaSize, ingredients: Ingredient[]): string => {
  const details: string[] = [];

  if (pizzaSize && pizzaType) {
    const typeName: string = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient: Ingredient) => ingredient.name));
  }

  return details.join(', ');
};
