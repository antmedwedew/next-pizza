import { cn } from '@/shared/lib/utils';
import React from 'react';

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
