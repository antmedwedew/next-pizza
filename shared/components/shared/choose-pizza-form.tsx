'use client';

import { FC, useEffect, useState } from 'react';
import useSet from '@/shared/hooks/use-set';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui/button';
import { Variant, Variants } from '@/shared/components/shared/variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductVariant } from '@prisma/client';
import { IngredientItem } from '@/shared/components/shared/ingredient-item';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: FC<ChoosePizzaFormProps> = ({
  className,
  imageUrl,
  name,
  variants,
  ingredients,
  onClickAddCart,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const pizzaPrice: number =
    (variants.find((item: ProductVariant) => item.pizzaType === type && item.size === size) as ProductVariant)?.price ||
    0;
  const ingredientsPrice: number = ingredients
    .filter((item: Ingredient) => selectedIngredients.has(item.id))
    .reduce((acc: number, ingredient: Ingredient) => acc + ingredient.price, 0);
  const totalPrice: number = pizzaPrice + ingredientsPrice;

  // Фильтруем для скрытия ненужных параметров
  const availablePizzas: ProductVariant[] = variants.filter((item: ProductVariant) => item.pizzaType === type);
  const availablePizzaSizes: Variant[] | undefined = pizzaSizes.map((item: Variant) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some((pizza: ProductVariant) => Number(pizza.size) === Number(item.value)),
  }));

  useEffect(() => {
    const isAvailableSize: Variant | undefined = availablePizzaSizes?.find(
      (item: Variant) => Number(item.value) === size && !item.disabled,
    );
    const availableSize: Variant | undefined = availablePizzaSizes?.find((item: Variant) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const handleAddCart = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      selectedIngredients,
    });
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage url={imageUrl} alt={name} size={size} className="flex-1 h-full" isBcg={false} isDashed={true} />

      <div className="bg-[#F4F1EE] flex-1 p-8 rounded-r-2xl">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">
          {size} см, {mapPizzaType[type]} тесто
        </p>

        <Variants
          variants={availablePizzaSizes}
          className="mt-4"
          selectedValue={String(size)}
          onClick={(value: string) => setSize(Number(value) as PizzaSize)}
        />

        <Variants
          variants={pizzaTypes}
          className="mt-2"
          selectedValue={String(type)}
          onClick={(value: string) => setType(Number(value) as PizzaType)}
        />

        <Title text="Добавить по вкусу" size="sm" className="mb-4 mt-5 font-bold" />
        <div className="h-[400px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3 pb-1 pr-2">
            {ingredients.map((item: Ingredient) => (
              <IngredientItem
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClick={() => toggleIngredient(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6" onClick={handleAddCart}>
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
