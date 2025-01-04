import { NextRequest, NextResponse } from 'next/server';
import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { sendEmail } from '@/shared/lib/send-email';
import { SuccessOrderTemplate } from '@/shared/email-templates/success-order';
import { CartItemWithRelations } from '@/@types/prisma';

export async function POST(req: NextRequest) {
  try {
    const body: PaymentCallbackData = await req.json();

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Заказ не найден' });
    }

    const isSuccess: boolean = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSuccess ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items: CartItemWithRelations[] = JSON.parse(order?.items as string);

    if (isSuccess) {
      await sendEmail(
        order.email,
        'NextPizza / Заказ №' + order.id + 'успешно оформлен',
        SuccessOrderTemplate({ orderId: order.id, items }),
      );
    }
  } catch (err) {
    console.log('Checkout callback error: ' + err);
    return NextResponse.json({ error: 'Checkout callback error' });
  }
}
