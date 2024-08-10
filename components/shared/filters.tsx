import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/shared/title';
import { FilterCheckbox, FilterCheckboxProps } from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group';
import { Button } from '@/components/ui/button';

interface FiltersProps {
  className?: string;
}

const items: FilterCheckboxProps[] = [
  {
    text: 'Сырный соус',
    value: '1',
  },
  {
    text: 'Моццарелла',
    value: '2',
  },
  {
    text: 'Томаты',
    value: '3',
  },
  {
    text: 'Чеснок',
    value: '4',
  },
  {
    text: 'Солённые огурчики',
    value: '5',
  },
  {
    text: 'Красный лук',
    value: '6',
  },
];
export const Filters: React.FC<FiltersProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-8 border-y border-y-neutral-100 py-6 pb-7">
        <Title text="Цена от и до:" size="xs" className="mb-3 font-bold" />

        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" placeholder="30000" min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup className="mt-8" limit={3} title="Ингредиенты:" items={items} />

      <Button size="lg" className="w-full mt-10">
        Применить
      </Button>
    </div>
  );
};
