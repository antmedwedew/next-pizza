import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Product } from '@prisma/client';
import { Container } from '@/shared/components/shared/container';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Variants } from '@/shared/components/shared/variants';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product: Product | any = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage url={product.imageUrl} alt={product.name} size={30} />

        <div className="ml-12">
          <Title text={product.name} size="md" className="font-extrabold mb-2" />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, debitis!
          </p>

          <Variants
            selectedValue="1"
            variants={[
              { name: 'Маленькая', value: '1' },
              { name: 'Средняя', value: '2' },
              { name: 'Большая', value: '3' },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
