import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { ICartItem } from '@/shared/store/cart';

export const getProductItemDetails = (
  ingredients?: ICartItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
): string => {
  const details: string[] = [];

  if (pizzaSize && pizzaType) {
    const typeName: string = mapPizzaType[pizzaType];
    details.push(`${typeName}, ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient: { name: string; price: number }) => ingredient.name));
  }

  return details.join(', ');
};
