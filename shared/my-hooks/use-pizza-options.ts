import { useEffect, useState } from 'react';
import { Variant } from '@/shared/components/variants';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import useSet from '@/shared/hooks/use-set';
import { getAvailablePizzaSizes } from '@/shared/lib/get-available-pizza-sizes';
import { ProductVariant } from '@prisma/client';

interface ReturnPizzaOptionType {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  toggleIngredient: (ingredientId: number) => void;
  availablePizzaSizes: Variant[] | undefined;
  currentVariantId: number | undefined;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnPizzaOptionType => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  // Фильтруем доступные размеры и типы для скрытия ненужных параметров
  const availablePizzaSizes: Variant[] | undefined = getAvailablePizzaSizes(variants, type);

  // Поиск конкретного id вариации
  const currentVariantId: number | undefined = variants.find(
    (variant: ProductVariant) => variant.pizzaType === type && variant.size === size,
  )?.id;

  useEffect(() => {
    const isAvailableSize: Variant | undefined = availablePizzaSizes?.find(
      (item: Variant) => Number(item.value) === size && !item.disabled,
    );
    const availableSize: Variant | undefined = availablePizzaSizes?.find((item: Variant) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    toggleIngredient,
    availablePizzaSizes,
    currentVariantId,
  };
};
