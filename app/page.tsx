import { Container } from '@/components/shared/container';
import { Title } from '@/components/shared/title';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="Все Пиццы" className="font-extrabold" />
      </Container>
    </>
  );
}
