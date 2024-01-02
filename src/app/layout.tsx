import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ListEpisodeProvider } from '@/context/ListEpisodeCtx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ryzendesu',
  description: 'Nonton anime subs Indonesia gratis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ListEpisodeProvider>{children}</ListEpisodeProvider>
      </body>
    </html>
  );
}
