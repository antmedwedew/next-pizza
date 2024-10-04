import { prisma } from '@/prisma/prisma-client';
import { Product } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ProductModal } from '@/shared/components/modals/product-modal';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product: Product | any = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ProductModal product={product} />;
}
