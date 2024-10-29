import { FC } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/shared/components/container';
import { SearchInput } from '@/shared/components/search-input';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { CartButton } from '@/shared/components/cart-button';

interface HeaderProps {
  className?: string;
  isSearch?: boolean;
  isCart?: boolean;
}

export const Header: FC<HeaderProps> = ({ className, isSearch = true, isCart = true }) => {
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
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          {isCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
