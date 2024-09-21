import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
  const query: string = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany();

  const filteredProducts = query
    ? products.filter((product) => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())).slice(0, 5)
    : products.slice(0, 5);

  return NextResponse.json(filteredProducts);
}
