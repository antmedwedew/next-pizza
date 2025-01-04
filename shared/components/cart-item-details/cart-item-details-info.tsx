import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface CartItemInfoProps {
  name: string;
  details: string;
  className?: string;
}

export const CartItemDetailsInfo: FC<CartItemInfoProps> = ({ name, details, className }) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-xs text-gray-400 pt-1">{details}</p>}
    </div>
  );
};
