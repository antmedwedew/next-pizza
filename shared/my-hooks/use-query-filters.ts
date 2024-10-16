import { FiltersType } from '@/shared/my-hooks/use-filters';
import { useEffect } from 'react';
import qs from 'qs';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: FiltersType) => {
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    const params = {
      ...filters.price,
      ingredients: Array.from(filters.selectedIngredients),
      sizes: Array.from(filters.selectedSizes),
      pizzaTypes: Array.from(filters.selectedPizzaTypes),
    };

    const query: string = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [filters]);
};
