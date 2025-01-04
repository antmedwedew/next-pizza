import axios from 'axios';
import { PaymentDataType } from '@/@types/yookassa';

interface CreatePaymentProps {
  orderId: number;
  amount: number;
  description: string;
}

export async function createPayment(details: CreatePaymentProps) {
  const { data } = await axios.post<PaymentDataType>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID,
        password: process.env.YOOKASSA_API_KEY,
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    } as any,
  );

  return data;
}
