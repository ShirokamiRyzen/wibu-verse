import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import BottomNavbar from '@/components/BottomNavbar';
import { ListEpisodeProvider } from '@/context/ListEpisodeCtx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ryzendesu',
  description: 'Nonton anime subs Indonesia gratis',
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    { name: "ShirokamiRyzen" },
    {
      name: "ShirokamiRyzen",
      url: "https://github.com/ShirokamiRyzen",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingBottom: '4rem' }}>
        <Navbar />
        <ListEpisodeProvider>{children}</ListEpisodeProvider>
        <BottomNavbar />
      </body>
    </html>
  );
}
