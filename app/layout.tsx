import { Nunito } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning={true} className={nunito.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
