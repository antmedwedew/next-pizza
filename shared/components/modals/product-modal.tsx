'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { ChoosePizzaForm } from '@/shared/components/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/choose-product-form';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart';
import { ProductVariant } from '@prisma/client';
import toast from 'react-hot-toast';

interface ProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: FC<ProductModalProps> = ({ product, className }) => {
  const router: AppRouterInstance = useRouter();
  const firstItem: ProductVariant = product.variants[0];
  const isPizzaForm: boolean = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId: number = productVariantId ?? firstItem.id;

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      });

      toast.success('Товар добавлена в корзину');
      router.back();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={router.back}>
      <DialogContent className={cn('p-0 w-[1100px] max-w-[1100px] bg-white', className)}>
        <DialogTitle title={product.name} className="hidden" />
        <DialogDescription title={product.name} className="hidden" />
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onClickAdd={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            price={firstItem.price}
            name={product.name}
            onClickAdd={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
