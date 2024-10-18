import { FC } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Title } from '@/shared/components/title';
import { cn, priceRu } from '@/shared/lib/utils';
import { getProductItemDetails } from '@/shared/lib/get-product-item-details';
import { ICartItem } from '@/shared/store/cart';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: ICartItem['ingredients'];
}

export const ProductCard: FC<ProductCardProps> = ({ id, name, price, imageUrl, className, ingredients }) => {
  const info: string = getProductItemDetails(ingredients);

  return (
    <Link href={`product/${id}`} className={cn('flex flex-col', className)}>
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

      <p className="text-sm text-gray-400 flex-1">{info}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          {ingredients.length > 0 ? 'от' : ''} <b>{priceRu(price)}</b>
        </span>

        <Button variant="secondary">
          <Plus size={20} className="mr-1" />
          {ingredients.length > 0 ? 'Собрать' : 'Добавить'}
        </Button>
      </div>
    </Link>
  );
};
