import { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/components/title';

interface WhiteBlockProps {
  title?: string;
  className?: string;
  contentClassName?: string;
  endAdornment?: ReactNode;
}

export const WhiteBlock: FC<PropsWithChildren<WhiteBlockProps>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between p-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('p-7', contentClassName)}>{children}</div>
    </div>
  );
};
