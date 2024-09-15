import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  const query: string = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
  } as Prisma.ProductFindManyArgs);

  return NextResponse.json(products);
}
