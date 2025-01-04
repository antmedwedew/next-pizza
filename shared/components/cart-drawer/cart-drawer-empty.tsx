import Image from 'next/image';
import { Title } from '@/shared/components/title';
import { SheetClose } from '@/shared/components/ui/sheet';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { JSX } from 'react';

export const CartDrawerEmpty: JSX = () => (
  <div className="flex flex-col items-center justify-center w-72 mx-auto">
    <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
    <Title text="Корзина пустая" size="sm" className="text-center my-2" />
    <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>

    <SheetClose>
      <Button className="w-56 h-12 text-base" size="lg">
        <ArrowLeft className="w-5 mr-2" />
        Вернуться назад
      </Button>
    </SheetClose>
  </div>
);
