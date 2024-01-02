'use client';
import { ListEpisodeContext } from '@/context/ListEpisodeCtx';
import Link from 'next/link';
import { useContext } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lists } = useContext(ListEpisodeContext);

  return (
    <div className="container">
      {children}
      <h3>List Episode</h3>
      <ul className="flex flex-wrap  gap-2">
        {lists.map((item, index) => (
          <li key={index} className="bg-zinc-900 w-max text-white p-2">
            <Link href={`/nonton/${item.id}`}>Episode {lists.length - index}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
