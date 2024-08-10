import { Container } from '@/components/shared/container';
import { Title } from '@/components/shared/title';
import { TopBar } from '@/components/shared/top-bar';
import { Filters } from '@/components/shared/filters';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="Все Пиццы" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10">
        <div className="flex gap-[60px]">
          {/*Фильтр*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Товары*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Список товаров</div>
          </div>
        </div>
      </Container>
    </>
  );
}
