import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/shared/components/shared/header';

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: '',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen mb-8">
        {children}
        {modal}
      </main>
    </>
  );
}
