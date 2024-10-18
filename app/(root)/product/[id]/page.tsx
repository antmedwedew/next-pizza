import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/components/container';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '@/shared/components/product-form';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product: ProductWithRelations | null = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variants: true,
      // TODO: нужно получать отдельным запросом категогорию товаров
      // category: {
      //   include: {
      //     products: {
      //       include: {
      //         variants: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductForm product={product} isModal={false} />
      </div>
    </Container>
  );
}
