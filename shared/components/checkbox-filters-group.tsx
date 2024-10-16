'use client';

import { ChangeEvent, FC, useState } from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Input } from '@/shared/components/ui/input';
import { FilterCheckbox } from '@/shared/components/filter-checkbox';
import { cn } from '@/shared/lib/utils';

interface ItemListType {
  text: string;
  value: string;
}

interface CheckboxFiltersGroupProps {
  title: string;
  className?: string;
  items: ItemListType[];
  searchInputPlaceholder?: string;
  onClickCheckbox: (value: string) => void;
  defaultValue?: string[];
  limit?: number;
  isLoading?: boolean;
  selectedValues?: Set<string>;
  name: string;
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  className,
  items,
  defaultValue,
  limit,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  title,
  isLoading,
  selectedValues,
  name,
}) => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const list: ItemListType[] = isShowAll
    ? items.filter((item: ItemListType) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : items.slice(0, limit);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (isLoading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_: undefined, index: number) => <Skeleton className="h-6 mb-4 rounded" key={index} />)}

        <Skeleton className="w-28 h-6 rounded" />
      </div>
    );
  }

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
        {list.map((item: ItemListType, index: number) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            checked={selectedValues?.has(item.value)}
            onCheckedChange={() => onClickCheckbox(item.value)}
            name={name}
          />
        ))}
      </div>

      {limit && items.length > limit && (
        <div className={isShowAll ? 'border-t border-t-neutral-100 mt-3' : 'mt-4'}>
          <button onClick={() => setIsShowAll(!isShowAll)} className={cn('text-primary', isShowAll && 'mt-3')}>
            {isShowAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
