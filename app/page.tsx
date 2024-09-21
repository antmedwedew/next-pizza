import { Container } from '@/components/shared/container';
import { TopBar } from '@/components/shared/top-bar';
import { Filters } from '@/components/shared/filters';
import { Category, Prisma } from '@prisma/client';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { prisma } from '@/prisma/prisma-client';

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
