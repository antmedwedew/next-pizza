import { FC } from 'react';
import { priceRu } from '@/shared/lib/utils';

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  url: string;
}

export const PayOrderTemplate: FC<PayOrderTemplateProps> = ({ orderId, totalAmount, url }) => (
  <div>
    <h1>Заказ №{orderId}</h1>
    <p>
      Оплатите заказ на сумму <b>{priceRu(totalAmount)}</b>. Перейдите по <a href={url}>ссылке</a>, для оплаты заказа
    </p>
  </div>
);
