import { FiltersType } from '@/shared/my-hooks/use-filters';
import { useEffect, useRef } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import qs from 'qs';

export const useQueryFilters = (filters: FiltersType) => {
  const router: AppRouterInstance = useRouter();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
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
    }
    isMounted.current = true;
  }, [filters]);
};
