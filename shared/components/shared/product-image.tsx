import { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface ProductImageProps {
  className?: string;
  url: string;
  alt: string;
  size?: 20 | 30 | 40;
  isBcg?: boolean;
  isDashed?: boolean;
}

export const ProductImage: FC<ProductImageProps> = ({ className, url, alt, size, isBcg = true, isDashed = true }) => {
  return (
    <div
      className={cn('rounded-lg relative flex items-center justify-center w-[570px] h-[570px]', className, {
        'bg-secondary': isBcg,
      })}
    >
      <img
        src={url}
        alt={alt}
        className={cn('relative left-2 top-2 transition-all z-10 duration-200', {
          'w-[300px] h-[300px]': size === 20,
          'w-[400px] h-[400px]': size === 30,
          'w-[500px] h-[500px]': size === 40 || !isDashed,
        })}
      />

      {isDashed && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed rounded-full border-gray-300 w-[450px] h-[450px]"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted rounded-full border-gray-200 w-[375px] h-[375px]"></div>
        </>
      )}
    </div>
  );
};
