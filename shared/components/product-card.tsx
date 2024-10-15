import { FC } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Title } from '@/shared/components/title';
import { priceRu } from '@/shared/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({ id, name, price, imageUrl, className }) => {
  return (
    <Link href={`product/${id}`} className={className}>
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

      <p className="text-sm text-gray-400">
        Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{priceRu(price)}</b>
        </span>

        <Button variant="secondary">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </div>
    </Link>
  );
};
