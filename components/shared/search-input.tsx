'use client';

import React, { ChangeEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import useDebounce from '@/hooks/use-debounce';

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  useDebounce(
    async () => {
      await Api.products.search(searchQuery).then((result: Product[]) => {
        setProducts(result);
      });
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" onClick={() => setFocused(false)}></div>
      )}
      <div className={cn('flex rounded-2xl flex-1 justify-between relative z-40', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 text-gray-400" />
        <Input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Найти товар..."
          onFocus={() => setFocused(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl invisible opacity-0 top-14 py-2 shadow-md transition-all duration-200 z-40',
              focused && 'visible opacity-100 top-11',
            )}
          >
            {products.map((product: Product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="w-full flex items-center px-3 py-2 duration-200 hover:bg-primary/10 cursor-pointer"
                onClick={onClickItem}
              >
                <img src={product.imageUrl} alt={product.name} className="rounded-sm w-8 h-8" />
                <span className="ml-2">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
