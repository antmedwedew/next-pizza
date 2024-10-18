import { Cart, CartItem, Category, Ingredient, Product, ProductVariant } from '@prisma/client';

export interface ProductWithRelations extends Product {
  variants: ProductVariant[];
  ingredients: Ingredient[];
}

export interface CartItemWithRelations extends CartItem {
  productVariant: ProductVariant & {
    product: Product;
  };
  ingredients: Ingredient[];
}

export interface CartWithRelations extends Cart {
  items: CartItemWithRelations[];
}

export interface CategoryWithRelations extends Category {
  products: ProductWithRelations[];
}

export interface CartItemWithIngredientsRelations extends CartItem {
  ingredients: Ingredient[];
}
