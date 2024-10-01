import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Category } from '@prisma/client';
import { Container } from '@/shared/components/shared/container';
import { Categories } from '@/shared/components/shared/categories';
import { SortPopup } from '@/shared/components/shared/sort-popup';

interface TopBarProps {
  className?: string;
  categories: Category[];
}

export const TopBar: React.FC<TopBarProps> = ({ className, categories }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
