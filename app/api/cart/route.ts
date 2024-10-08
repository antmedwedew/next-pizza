import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
  try {
    const userId = 1;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
          {
            userId,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json({ items: [] });
  } catch (err) {
    console.log(err);
  }
}
