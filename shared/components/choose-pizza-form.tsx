'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '@/shared/components/product-image';
import { Title } from '@/shared/components/title';
import { Button } from '@/shared/components/ui/button';
import { Variants } from '@/shared/components/variants';
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductVariant } from '@prisma/client';
import { IngredientItem } from '@/shared/components/ingredient-item';
import { calcTotalPizzaPrice } from '@/shared/lib/calc-total-pizza-price';
import { usePizzaOptions } from '@/shared/my-hooks/use-pizza-options';

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
  const { size, type, setSize, setType, selectedIngredients, toggleIngredient, availablePizzaSizes } =
    usePizzaOptions(variants);

  // Общая стоимость пиццы
  const totalPrice: number = calcTotalPizzaPrice(variants, ingredients, size, type, selectedIngredients);

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
          variants={availablePizzaSizes || []}
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
