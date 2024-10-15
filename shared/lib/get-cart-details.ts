import { ICartItem } from '@/shared/store/cart';
import { CartItemWithRelations, CartWithRelations } from '@/@types/prisma';
import { calcItemTotalPrice } from '@/shared/lib/calc-item-total-price';

interface ReturnGetCartDetailsType {
  items: ICartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartWithRelations): ReturnGetCartDetailsType => {
  const items: ICartItem[] = data.items.map((item: CartItemWithRelations) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcItemTotalPrice(item),
    disabled: item.quantity === 0,
    pizzaSize: item.productVariant.size,
    pizzaType: item.productVariant.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
