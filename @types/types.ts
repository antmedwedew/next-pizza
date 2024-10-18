export interface CreateCartItemValuesType {
  productVariantId: number;
  ingredients?: number[];
}

export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
