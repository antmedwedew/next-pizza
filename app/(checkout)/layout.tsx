import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Header } from '@/shared/components/header';
import { Container } from '@/shared/components/container';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: '',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header isSearch={false} isCart={false} className="bg-page" />
      <main className="min-h-screen bg-page">
        <Container>{children}</Container>
      </main>
    </>
  );
}
