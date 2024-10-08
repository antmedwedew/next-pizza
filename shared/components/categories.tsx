'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/shared/store/category';

interface CategoriesProps {
  className?: string;
  categories: Category[];
}

export const Categories: FC<CategoriesProps> = ({ className, categories }) => {
  const categoryActiveId: number = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {categories.map((item: Category) => (
        <a
          key={item.id}
          href={`/#${item.name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === item.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
        >
          <button>{item.name}</button>
        </a>
      ))}
    </div>
  );
};
