import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

export const calcTotalPizzaPrice = (
  variants: ProductVariant[],
  ingredients: Ingredient[],
  size: PizzaSize,
  type: PizzaType,
  selectedIngredients: Set<number>,
): number => {
  const pizzaPrice: number =
    (variants.find((item: ProductVariant) => item.pizzaType === type && item.size === size) as ProductVariant)?.price ||
    0;
  const ingredientsPrice: number = ingredients
    .filter((item: Ingredient) => selectedIngredients.has(item.id))
    .reduce((acc: number, ingredient: Ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + ingredientsPrice;
};
