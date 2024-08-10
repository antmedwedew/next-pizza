'use client';

import React, { ChangeEvent, useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CheckboxFiltersGroupProps {
  title: string;
  className?: string;
  items: FilterCheckboxProps[];
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  limit?: number;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
  className,
  items,
  defaultValue,
  limit,
  searchInputPlaceholder = 'Поиск...',
  onChange,
  title,
}) => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const list: FilterCheckboxProps[] = isShowAll
    ? items.filter((item: FilterCheckboxProps) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : items.slice(0, limit);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {isShowAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item: FilterCheckboxProps, index: number) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={(checked: boolean) => console.log(checked)}
          />
        ))}

        {items.length > limit && (
          <div className={isShowAll ? 'border-t border-t-neutral-100 mt-3' : ''}>
            <button onClick={() => setIsShowAll(!isShowAll)} className={cn('text-primary', isShowAll && 'mt-3')}>
              {isShowAll ? 'Скрыть' : '+ Показать все'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
