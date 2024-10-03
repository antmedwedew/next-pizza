import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui/button';

interface ChooseProductFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  variants,
  ingredients,
  onClickAdd,
}) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage url={imageUrl} alt={name} size={30} className="flex-1 h-full" isBcg={false} isDashed={false} />

      <div className="bg-[#F4F1EE] flex-1 p-10 rounded-r-2xl">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, debitis!</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6">Добавить в корзину за 799₽</Button>
      </div>
    </div>
  );
};
