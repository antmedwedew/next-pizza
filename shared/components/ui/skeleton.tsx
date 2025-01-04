import { cn } from '@/shared/lib/utils';
import * as React from 'react';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded bg-muted bg-gray-200', className)} {...props} />;
}

export { Skeleton };
