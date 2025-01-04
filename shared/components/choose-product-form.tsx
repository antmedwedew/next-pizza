import { FC } from 'react';
import { cn, priceRu } from '@/shared/lib/utils';
import { ProductImage } from '@/shared/components/product-image';
import { Title } from '@/shared/components/title';
import { Button } from '@/shared/components/ui/button';

interface ChooseProductFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  onClickAdd: VoidFunction;
  isLoading: boolean;
  isModal: boolean;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  price,
  onClickAdd,
  isLoading,
  isModal,
}) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage url={imageUrl} alt={name} size={30} className="flex-1 h-full" isBcg={!isModal} isDashed={false} />

      <div className={cn('flex-1 rounded-r-2xl', { 'bg-page p-8': isModal, 'pl-8': !isModal })}>
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={isLoading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6"
          onClick={() => onClickAdd()}
        >
          Добавить в корзину за {priceRu(price)}
        </Button>
      </div>
    </div>
  );
};
