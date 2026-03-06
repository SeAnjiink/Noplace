import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NoPlace - Tidak Ada Tempat. Hanya Kamu.',
  description: 'Posting tanpa tekanan. Hilang dari kesempurnaan. Ruang sosial digital untuk Gen Z yang mengutamakan kesehatan mental.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-noplace-dark">{children}</body>
    </html>
  );
}
