import { hashSync } from 'bcrypt';
import { Prisma } from '@prisma/client';

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateProductVariant = (productId: number, pizzaType?: 1 | 2 | 3, size?: 20 | 30 | 40) => {
  return {
    productId,
    size,
    pizzaType,
    price: randomNumber(500, 1500),
  } as Prisma.ProductVariantUncheckedCreateInput;
};

export const users: any = [
  {
    fullName: 'User Name',
    email: 'user@prisma.com',
    password: hashSync('111111', 10),
    role: 'USER',
    verified: new Date(),
  },
  {
    fullName: 'Admin name',
    email: 'admin@prisma.com',
    password: hashSync('222222', 10),
    role: 'ADMIN',
    verified: new Date(),
  },
];

export const categories = [
  { name: 'Завтрак' },
  { name: 'Пиццы' },
  { name: 'Закуски' },
  { name: 'Коктейли' },
  { name: 'Напитки' },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Ветчина',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: randomNumber(50, 300),
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj: any, index: number) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с беконом',
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7970326512C89366583FF997CA9E.avif',
    categoryId: 1,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE796FF0059B799A17F57A9E64C725.avif',
    categoryId: 3,
  },
  {
    name: 'Молочный коктейль Ежевика-малина',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EF4CE5FC600B3F988C3672BE140FE4.avif',
    categoryId: 4,
  },
  {
    name: 'Добрый Кола',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61823BE0D3A35B4ABF658FD06B.avif',
    categoryId: 5,
  },
];
