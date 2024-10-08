import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';

interface IngredientProps {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem: FC<IngredientProps> = ({ className, imageUrl, name, price, active, onClick }) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col flex-1 p-0.5 rounded-md text-center relative cursor-pointer shadow-md bg-white border border-transparent',
        { 'border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img className="w-[110px] h-[110px]" src={imageUrl} alt={name} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
