'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Product } from '@prisma/client';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { ChoosePizzaForm } from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';
import { cn } from '@/shared/lib/utils';

interface ProductModalProps {
  product: Product;
  className?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, className }) => {
  const router: AppRouterInstance = useRouter();
  const isPizzaForm: boolean = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={router.back}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] bg-white', className)}>
        <DialogTitle title={product.name} className="hidden" />
        <DialogDescription title={product.name} className="hidden" />
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
