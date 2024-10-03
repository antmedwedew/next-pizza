import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface ContainerProps {
  className?: string;
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
