import { priceRu } from '@/shared/lib/utils';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SheetFooter } from '@/shared/components/ui/sheet';
import { FC } from 'react';

interface CardDrawerFooterProps {
  totalAmount: number;
}

export const CartDrawerFooter: FC<CardDrawerFooterProps> = ({ totalAmount }) => (
  <SheetFooter className="-mx-6 bg-white p-8">
    <div className="w-full">
      <div className="flex mb-4">
        <div className="flex flex-1 text-lg">
          Итого
          <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
        </div>
        <div className="font-bold text-lg">{priceRu(totalAmount)}</div>
      </div>

      <Link href="/checkout">
        <Button className="w-full h-12 text-base" type="submit">
          Оформить заказ
          <ArrowRight size={20} className="ml-2" />
        </Button>
      </Link>
    </div>
  </SheetFooter>
);
