'use client';

import { ChangeEvent, FC } from 'react';
import { Ingredient } from '@prisma/client';
import { Title } from '@/shared/components/title';
import { CheckboxFiltersGroup } from '@/shared/components/checkbox-filters-group';
import { Input } from '@/shared/components/ui/input';
import { RangeSlider } from '@/shared/components/range-slider';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useFilterIngredients } from '@/shared/my-hooks/use-filter-ingredients';
import { useFilters } from '@/shared/my-hooks/use-filters';
import { useQueryFilters } from '@/shared/my-hooks/use-query-filters';

interface FiltersProps {
  className?: string;
}

export const Filters: FC<FiltersProps> = ({ className }) => {
  const { ingredients, isLoadingIngredients } = useFilterIngredients();
  const filters = useFilters();
  const maxPrice: number = filters.maxPrice;
  useQueryFilters(filters);

  const updatePrices = (values: number[]) => {
    filters.updatePrice('priceFrom', values[0]);
    filters.updatePrice('priceTo', values[1] === 0 ? maxPrice : values[1]);
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
        onClickCheckbox={filters.togglePizzaTypes}
        name="type"
        selectedValues={filters.selectedPizzaTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
        onClickCheckbox={filters.toggleSizes}
        name="sizes"
        className="mt-5"
        selectedValues={filters.selectedSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <Title text="Цена от и до:" size="xs" className="mb-3 font-bold" />

        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={maxPrice}
            value={filters.price.priceFrom ? String(filters.price.priceFrom) : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => filters.updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="5000"
            min={0}
            max={maxPrice}
            value={filters.price.priceTo ? String(filters.price.priceTo) : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => filters.updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={maxPrice}
          step={10}
          value={[filters.price.priceFrom || 0, filters.price.priceTo || maxPrice]}
          onValueChange={updatePrices}
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
        onClickCheckbox={filters.toggleIngredients}
        selectedValues={filters.selectedIngredients}
        name="ingredients"
      />

      <Button size="lg" className="w-full mt-10">
        Применить
      </Button>
    </div>
  );
};
