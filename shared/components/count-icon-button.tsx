import { Minus, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { FC } from 'react';

interface IconButtonProps {
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
}

export const CountIconButton: FC<IconButtonProps> = ({ disabled, type, onClick }) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]',
      )}
    >
      {type === 'plus' ? <Plus className="h-4" /> : <Minus className="h-4" />}
    </Button>
  );
};
