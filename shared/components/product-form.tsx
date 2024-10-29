'use client';

import { FC } from 'react';
import { ChoosePizzaForm } from '@/shared/components/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/choose-product-form';
import { ProductVariant } from '@prisma/client';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { useCart } from '@/shared/my-hooks/use-cart';

interface ProductFormProps {
  product: ProductWithRelations;
  isModal: boolean;
  onSubmitCallback?: VoidFunction;
}

export const ProductForm: FC<ProductFormProps> = ({ product, isModal, onSubmitCallback }) => {
  const { addCartItem, isLoading } = useCart();

  const firstItem: ProductVariant = product.variants[0];
  const isPizzaForm: boolean = Boolean(firstItem.pizzaType);

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId: number = productVariantId ?? firstItem.id;

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      });

      toast.success('Товар добавлена в корзину');
      onSubmitCallback?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  return (
    <>
      {isPizzaForm ? (
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          variants={product.variants}
          onClickAdd={onSubmit}
          isLoading={isLoading}
          isModal={isModal}
        />
      ) : (
        <ChooseProductForm
          imageUrl={product.imageUrl}
          price={firstItem.price}
          name={product.name}
          onClickAdd={onSubmit}
          isLoading={isLoading}
          isModal={isModal}
        />
      )}
    </>
  );
};
