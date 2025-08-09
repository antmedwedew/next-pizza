'use server';

import { CheckoutFormType } from '@/shared/form-schemas/checkout-form-schema';
import { prisma } from '@/prisma/prisma-client';
import { cookies } from 'next/headers';
import { $Enums, Cart, Order, Prisma, User } from '@prisma/client';
import { sendEmail } from '@/shared/lib/send-email';
import { PayOrderTemplate } from '@/shared/email-templates/pay-order';
import { createPayment } from '@/shared/lib/create-payment';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/email-templates/verification-user';
import OrderStatus = $Enums.OrderStatus;

export async function createOrder(data: CheckoutFormType) {
  try {
    const token: string | undefined = cookies().get('cartToken')?.value;

    if (!token) {
      throw new Error('Токен не найден');
    }

    // Находим корзину по токену
    const userCart: Cart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
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
      where: {
        token,
      },
    });

    if (!userCart) {
      throw new Error('Корзина не найдена');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Корзина пустая');
    }

    // Создаем заказ
    const order: Order = await prisma.order.create({
      data: {
        token,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        items: JSON.stringify(userCart.items),
        status: OrderStatus.PENDING,
      },
    });

    if (!order) {
      throw new Error('Ошибка создания заказа');
    }

    // Обнуляем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Удаляем все связанные с ней товары и ингредиенты
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Создаем платеж
    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: 'Оплата заказа №' + order.id,
    });

    if (!paymentData) {
      throw new Error('Ошибка создания платежа');
    }

    // обновляем оплаченный заказ
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl: string = paymentData.confirmation.confirmation_url;

    // Отправляем письмо с оплатой заказа
    await sendEmail(
      data.email,
      'NextPizza / Оплатите заказ №' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: userCart.totalAmount,
        url: paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserInfo(data: Prisma.UserUpdateInput) {
  try {
    const currentUser: User = await getUserSession();

    if (!currentUser) {
      throw Error();
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? hashSync(data.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashSync(data.password, 10),
      },
    });

    const code: string = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      },
    });

    await sendEmail(createUser.email, 'Next Pizza / Подтверждение регистрации', VerificationUserTemplate({ code }));
  } catch (err) {
    console.error(err);
  }
}
