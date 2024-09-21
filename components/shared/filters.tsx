'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/shared/title';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group';
import { Button } from '@/components/ui/button';
import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import useSet from '@/hooks/use-set';
import qs from 'qs';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface FiltersProps {
  className?: string;
}

interface PriceType {
  priceFrom?: number;
  priceTo?: number;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const maxPrice: number = 5000;

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState<boolean>(true);
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>((searchParams.get('ingredients') as string)?.split(',') || []),
  );
  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>((searchParams.get('sizes') as string)?.split(',') || []),
  );
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>((searchParams.get('pizzaTypes') as string)?.split(',') || []),
  );
  const [price, setPrice] = useState<PriceType>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  useEffect(() => {
    Api.ingredients.getAll().then((result: Ingredient[]) => {
      setIngredients(result);
      setIsLoadingIngredients(false);
    });
  }, []);

  useEffect(() => {
    const filters = {
      ...price,
      ingredients: Array.from(selectedIngredients),
      sizes: Array.from(selectedSizes),
      pizzaTypes: Array.from(selectedPizzaTypes),
    };

    const query: string = qs.stringify(filters, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [price, selectedIngredients, selectedSizes, selectedPizzaTypes, router]);

  const updatePrice = (name: keyof PriceType, value: number) => {
    setPrice({
      ...price,
      [name]: value > maxPrice ? maxPrice : value,
    });
  };

  return (
    <div className={cn('', className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
        onClickCheckbox={togglePizzaTypes}
        name="type"
        selectedValues={selectedPizzaTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
        onClickCheckbox={toggleSizes}
        name="sizes"
        className="mt-5"
        selectedValues={selectedSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <Title text="Цена от и до:" size="xs" className="mb-3 font-bold" />

        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={maxPrice}
            value={price.priceFrom ? String(price.priceFrom) : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="5000"
            min={0}
            max={maxPrice}
            value={price.priceTo ? String(price.priceTo) : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || maxPrice]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        limit={5}
        title="Ингредиенты:"
        items={ingredients.map((ingredient: Ingredient) => ({
          text: ingredient.name,
          value: String(ingredient.id),
        }))}
        isLoading={isLoadingIngredients}
        onClickCheckbox={toggleIngredients}
        selectedValues={selectedIngredients}
        name="ingredients"
      />

      <Button size="lg" className="w-full mt-10">
        Применить
      </Button>
    </div>
  );
};
