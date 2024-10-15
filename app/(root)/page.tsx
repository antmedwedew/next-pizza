import { Prisma } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { TopBar } from '@/shared/components/top-bar';
import { Container } from '@/shared/components/container';
import { Filters } from '@/shared/components/filters';
import { ProductsGroupList } from '@/shared/components/products-group-list';
import { Suspense } from 'react';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          ingredients: true,
        },
      },
    },
  } as Prisma.CategoryFindManyArgs);

  return (
    <>
      <TopBar categories={categories.filter((category: any) => category.products.length > 0)} />
      <Container className="mt-10">
        <div className="flex gap-[80px]">
          {/*Фильтр*/}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/*Товары*/}
          <div className="flex-1">
            {categories.map(
              (category: any) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    title={category.name}
                    products={category.products}
                    categoryId={category.id}
                    key={category.id}
                  />
                ),
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
