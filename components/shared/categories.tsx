'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';

interface CategoriesProps {
  className?: string;
}

interface catItem {
  id: number;
  title: string;
}

const cats: catItem[] = [
  { id: 0, title: 'Пиццы' },
  { id: 1, title: 'Комбо' },
  { id: 2, title: 'Закуски' },
  { id: 3, title: 'Коктейли' },
  { id: 4, title: 'Кофе' },
  { id: 5, title: 'Напитки' },
  { id: 6, title: 'Десерты' },
  { id: 7, title: 'Десерты' },
];

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
  const categoryActiveId: number = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {cats.map((cat: catItem) => (
        <a
          key={cat.id}
          href={`/#${cat.title}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
        >
          <button>{cat.title}</button>
        </a>
      ))}
    </div>
  );
};
