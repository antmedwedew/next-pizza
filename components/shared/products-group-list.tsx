'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/shared/title';
import { ProductCard } from '@/components/shared/product-card';
import useIntersection from '@/hooks/use-intersection';
import { useCategoryStore } from '@/store/category';

interface ProductsGroupListProps {
  title: string;
  products: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  products,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={cn('mb-20', className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-8 leading-none" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
