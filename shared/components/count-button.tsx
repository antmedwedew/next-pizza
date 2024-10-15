import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { CountIconButton } from '@/shared/components/count-icon-button';

interface CountButtonProps {
  value?: number;
  onClick?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CountButton: FC<CountButtonProps> = ({ className, onClick, value = 1 }) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton onClick={() => onClick?.('minus')} disabled={value === 1} type="minus" />

      <b className="text-sm">{value}</b>

      <CountIconButton onClick={() => onClick?.('plus')} type="plus" />
    </div>
  );
};
