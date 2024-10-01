import { Category, Prisma } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { TopBar } from '@/shared/components/shared/top-bar';
import { Container } from '@/shared/components/shared/container';
import { Filters } from '@/shared/components/shared/filters';
import { ProductsGroupList } from '@/shared/components/shared/products-group-list';

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
      <TopBar categories={categories.filter((category: Category) => category.products.length > 0)} />
      <Container className="mt-10">
        <div className="flex gap-[80px]">
          {/*Фильтр*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Товары*/}
          <div className="flex-1">
            {categories.map(
              (category: Category) =>
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
