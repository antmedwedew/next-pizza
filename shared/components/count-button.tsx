import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface CountButtonProps {
  value?: number;
  onClick?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CountButton: FC<CountButtonProps> = ({ className, onClick, value = 1 }) => {
  const classButton: string =
    'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]';

  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <Button
        variant="outline"
        disabled={value === 1}
        onClick={() => onClick?.('minus')}
        type="button"
        className={classButton}
      >
        <Minus className="h-4" />
      </Button>

      <b className="text-sm">{value}</b>

      <Button variant="outline" onClick={() => onClick?.('plus')} type="button" className={classButton}>
        <Plus className="h-4" />
      </Button>
    </div>
  );
};
