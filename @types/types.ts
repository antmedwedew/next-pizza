export interface CreateCartItemValuesType {
  productVariantId: number;
  ingredients?: number[];
}

export interface CartItemType {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
