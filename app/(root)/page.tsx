import { TopBar } from '@/shared/components/top-bar';
import { Container } from '@/shared/components/container';
import { Filters } from '@/shared/components/filters';
import { ProductsGroupList } from '@/shared/components/products-group-list';
import { Suspense } from 'react';
import { findPizzas, GetSearchParamsType } from '@/shared/lib/find-pizzas';
import { Title } from '@/shared/components/title';
import { CategoryWithRelations } from '@/@types/prisma';

export default async function Home({ searchParams }: { searchParams: GetSearchParamsType }) {
  const categories: CategoryWithRelations[] = await findPizzas(searchParams);

  const renderProducts = () => {
    const isFindProducts: boolean = Boolean(
      categories.find((category: CategoryWithRelations) => category.products.length > 0),
    );

    if (isFindProducts) {
      return categories.map(
        (category: CategoryWithRelations) =>
          category.products.length > 0 && (
            <ProductsGroupList
              title={category.name}
              products={category.products}
              categoryId={category.id}
              key={category.id}
            />
          ),
      );
    } else {
      return (
        <div className="flex justify-center items-center h-full">
          <Title size="2xl" className="text-primary" text="Ничего не найдено (" />
        </div>
      );
    }
  };

  return (
    <>
      <TopBar categories={categories.filter((category: CategoryWithRelations) => category.products.length > 0)} />
      <Container className="mt-10">
        <div className="flex gap-[80px]">
          {/*Фильтр*/}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/*Товары*/}
          <div className="flex-1">{renderProducts()}</div>
        </div>
      </Container>
    </>
  );
}
