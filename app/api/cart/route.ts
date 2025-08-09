import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/api-lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/api-lib/update-cart-total-amount';
import { CreateCartItemValuesType } from '@/@types/types';
import { Cart, Ingredient } from '@prisma/client';
import { CartItemWithIngredientsRelations } from '@/@types/prisma';

export async function GET(req: NextRequest) {
  try {
    const token: string | undefined = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token: string | undefined = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart: Cart = await findOrCreateCart(token);
    const data: CreateCartItemValuesType = await req.json();
    let findCartItem: CartItemWithIngredientsRelations | undefined = undefined;

    const findCartItems: CartItemWithIngredientsRelations[] = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
      },
      include: {
        ingredients: true,
      },
    });

    if (findCartItems.length > 0) {
      const filteredIngredientsItem = (ingredients: Ingredient[]) => {
        return [...ingredients].sort((a: Ingredient, b: Ingredient) => a.id - b.id);
      };

      const filteredIngredients = (ingredients: number[]) => {
        return [...ingredients].sort((a: number, b: number) => a - b);
      };

      if (data.ingredients) {
        findCartItem = findCartItems.find(
          (item: CartItemWithIngredientsRelations) =>
            data.ingredients?.length === item.ingredients.length &&
            filteredIngredientsItem(item.ingredients).every(
              (val: Ingredient, index: number) =>
                data.ingredients && val.id === filteredIngredients(data.ingredients)[index],
            ),
        );
      } else {
        findCartItem = findCartItems.find(
          (item: CartItemWithIngredientsRelations) => item.productVariantId === data.productVariantId,
        );
      }

      console.log(findCartItem);
    }

    // Если товар в корзине был найден, делаем + 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Если товар не был найден
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          ingredients: { connect: data.ingredients?.map((id: number) => ({ id })) },
          quantity: 1,
        },
      });
    }

    const updatedUserCart: Cart | 0 = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set('cartToken', token);
    return resp;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
