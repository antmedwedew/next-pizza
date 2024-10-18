'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '@/shared/components/product-form';

interface ProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: FC<ProductModalProps> = ({ product, className }) => {
  const router: AppRouterInstance = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1100px] max-w-[1100px] bg-white', className)}>
        <DialogTitle title={product.name} className="hidden" />
        <DialogDescription title={product.name} className="hidden" />
        <ProductForm product={product} isModal={true} onSubmitCallback={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
