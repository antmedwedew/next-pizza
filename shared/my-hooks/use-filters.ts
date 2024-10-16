import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import useSet from '@/shared/hooks/use-set';
import { useMemo, useState } from 'react';

export interface PriceType {
  priceFrom?: number;
  priceTo?: number;
}

interface ReturnFilters {
  maxPrice: number;
  selectedIngredients: Set<string>;
  toggleIngredients: (value: string) => void;
  selectedSizes: Set<string>;
  toggleSizes: (value: string) => void;
  selectedPizzaTypes: Set<string>;
  togglePizzaTypes: (value: string) => void;
  price: PriceType;
  updatePrice: (name: keyof PriceType, value: number) => void;
}

export type FiltersType = ReturnFilters;

export const useFilters = (): ReturnFilters => {
  const maxPrice: number = 5000;
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

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

  const updatePrice = (name: keyof PriceType, value: number) => {
    setPrice((prev: PriceType) => ({
      ...prev,
      [name]: value > maxPrice ? maxPrice : value,
    }));
  };

  return useMemo(
    () => ({
      maxPrice,
      selectedIngredients,
      toggleIngredients,
      selectedSizes,
      toggleSizes,
      selectedPizzaTypes,
      togglePizzaTypes,
      price,
      updatePrice,
    }),
    [selectedIngredients, selectedSizes, selectedPizzaTypes, price],
  );
};
