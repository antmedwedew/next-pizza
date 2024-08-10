import React from 'react';
import { cn } from '@/lib/utils';

interface CategoriesProps {
  className?: string;
}

const cats: string[] = ['Пиццы', 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Десерты'];
const activeIndex: number = 0;

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
      {cats.map((cat: string, index: number) => (
        <a
          key={index}
          href=""
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  );
};
