'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Variant {
  name: string;
  value: string;
  disabled?: boolean;
}

interface VariantsProps {
  className?: string;
  variants: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  selectedValue?: Variant['value'];
}

export const Variants: React.FC<VariantsProps> = ({ className, variants, onClick, selectedValue, ...props }) => {
  return (
    <div className={cn('flex justify-between bg-[#ECECEC] rounded-3xl p-1 select-none', className)} {...props}>
      {variants.map((variant: Variant) => (
        <button
          key={variant.name}
          onClick={() => onClick?.(variant.value)}
          className={cn(
            'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm',
            {
              'bg-white shadow': variant.value === selectedValue,
              'text-gray-500 opacity-50 pointer-events-none': variant.disabled,
            },
          )}
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
};
