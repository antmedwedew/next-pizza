import { ProductVariant } from '@prisma/client';
import { Variant } from '@/shared/components/variants';
import { pizzaSizes, PizzaType } from '@/shared/constants/pizza';

export const getAvailablePizzaSizes = (variants: ProductVariant[], type: PizzaType): Variant[] | undefined => {
  const filteredPizzasByType: ProductVariant[] = variants.filter((item: ProductVariant) => item.pizzaType === type);
  
  return pizzaSizes.map((item: Variant) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza: ProductVariant) => Number(pizza.size) === Number(item.value)),
  }));
};
