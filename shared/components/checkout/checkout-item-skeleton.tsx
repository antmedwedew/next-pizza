import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface CheckoutItemSkeletonProps {
  className?: string;
}

export const CheckoutItemSkeleton: FC<CheckoutItemSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5 w-[450px]">
        <Skeleton className="w-[60px] h-[60px] rounded-full" />
        <div className="">
          <Skeleton className="w-40 h-4 mb-2" />
          <Skeleton className="w-32 h-2" />
        </div>
      </div>
      <div className="flex items-center">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-8 w-[100px] ml-20" />
      </div>
      <Skeleton className="h-[20px] w-[20px]" />
    </div>
  );
};
