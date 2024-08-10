import { Container } from '@/components/shared/container';
import { Title } from '@/components/shared/title';
import { TopBar } from '@/components/shared/top-bar';
import { Filters } from '@/components/shared/filters';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="Все Пиццы" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10">
        <div className="flex gap-[80px]">
          {/*Фильтр*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Товары*/}
          <div className="flex-1">
            <ProductsGroupList
              title="Пиццы"
              products={[
                {
                  id: 1,
                  name: 'Двойной цыпленок',
                  price: 100,
                  imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                  items: [{ price: 100 }],
                },
              ]}
              categoryId={0}
            />

            <ProductsGroupList
              title="Закуски"
              products={[
                {
                  id: 1,
                  name: 'Супермясной Додстер',
                  price: 50,
                  imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE797022F9AD72AC34E1B01DC6AEBA.avif',
                  items: [{ price: 50 }],
                },
              ]}
              categoryId={1}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
