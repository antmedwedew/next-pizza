import { FC } from 'react';
import { WhiteBlock } from '@/shared/components/white-block';
import { priceRu } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CheckoutSidebarProps {
  totalAmount: number;
}

export const CheckoutSidebar: FC<CheckoutSidebarProps> = ({ totalAmount }) => (
  <div className="w-[450px]">
    <WhiteBlock className="sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{priceRu(totalAmount)}</span>
      </div>

      <Button className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате <ArrowRight size={20} className="ml-2" />
      </Button>
    </WhiteBlock>
  </div>
);
