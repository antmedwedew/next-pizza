import { FC } from 'react';
import { CartItemWithRelations } from '@/@types/prisma';
import { priceRu } from '@/shared/lib/utils';

interface SuccessOrderTemplateProps {
  orderId: number;
  items: CartItemWithRelations[];
}

export const SuccessOrderTemplate: FC<SuccessOrderTemplateProps> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку</h1>
    <p>Ваш заказ №{orderId} оплачен. Список товаров:</p>
    <hr />
    <ul>
      {items.map((item: CartItemWithRelations) => (
        <li key={item.id}>
          {item.productVariant.product.name} | {priceRu(item.productVariant.price)} | {item.quantity} шт.
        </li>
      ))}
    </ul>
  </div>
);
