'use client';

import { FC, useEffect, useRef } from 'react';
import { useCategoryStore } from '@/shared/store/category';
import useIntersection from '@/shared/hooks/use-intersection';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/components/title';
import { ProductCard } from '@/shared/components/product-card';
import { ProductWithRelations } from '@/@types/prisma';

interface ProductsGroupListProps {
  title: string;
  products: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: FC<ProductsGroupListProps> = ({
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
        {products.map((product: ProductWithRelations) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.variants[0].price}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
