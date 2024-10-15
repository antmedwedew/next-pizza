import { prisma } from './prisma-client';
import { categories, generateProductVariant, ingredients, products, users } from './variables';

async function up() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1: any = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 2,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2: any = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 2,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3: any = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 2,
      ingredients: {
        connect: ingredients.slice(10, 18),
      },
    },
  });

  await prisma.productVariant.createMany({
    data: [
      // Обычные товары
      generateProductVariant(1),
      generateProductVariant(2),
      generateProductVariant(3),
      generateProductVariant(4),

      // Пепперони фреш
      generateProductVariant(pizza1.id, 1, 20),
      generateProductVariant(pizza1.id, 1, 30),
      generateProductVariant(pizza1.id, 1, 40),
      generateProductVariant(pizza1.id, 2, 20),
      generateProductVariant(pizza1.id, 2, 30),
      generateProductVariant(pizza1.id, 2, 40),

      // Сырная
      generateProductVariant(pizza2.id, 1, 20),
      generateProductVariant(pizza2.id, 1, 30),
      generateProductVariant(pizza2.id, 1, 40),
      generateProductVariant(pizza2.id, 2, 20),
      generateProductVariant(pizza2.id, 2, 30),
      generateProductVariant(pizza2.id, 2, 40),

      //Чоризо фреш
      generateProductVariant(pizza3.id, 1, 20),
      generateProductVariant(pizza3.id, 1, 30),
      generateProductVariant(pizza3.id, 2, 40),
    ],
  });

  await prisma.cart.createMany({
    data: [{ userId: 1, totalAmount: 1000, token: '111111' }],
  });

  await prisma.cartItem.create({
    data: {
      productVariantId: 5,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
