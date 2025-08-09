'use client';

import { FC, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/shared/components/container';
import { SearchInput } from '@/shared/components/search-input';
import { cn } from '@/shared/lib/utils';
import { CartButton } from '@/shared/components/cart-button';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from '@/shared/components/profile-button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface HeaderProps {
  className?: string;
  isSearch?: boolean;
  isCart?: boolean;
}

export const Header: FC<HeaderProps> = ({ className, isSearch = true, isCart = true }) => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    let message: string = '';

    if (searchParams.has('paid')) {
      message = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      message = 'Ваша почта успешно подтверждена.';
    }

    if (message) {
      setTimeout(() => {
        router.replace('/');
        toast.success(message, {
          duration: 5000,
        });
      }, 500);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <div>
            <div className="text-2xl uppercase font-black">Next Pizza</div>
            <div className="text-sm text-gray-400 leading-3">вкусней уже некуда</div>
          </div>
        </Link>

        {isSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <ProfileButton />
          {isCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
