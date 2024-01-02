'use client';
import axios from 'axios';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/episode';
import loadingGif from '@/assets/loading.gif';
import Image from 'next/image';

export default function Home() {
  const [episode, setEpisode] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getNewEpisodes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/new');
      setEpisode(data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewEpisodes();
  }, []);

  return (
    <div className="container pt-4 pb-10">
      <h1 className="bg-zinc-900 w-max text-white text-base px-4 py-1 rounded-md my-4">Rilisan Terbaru</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className=" rounded-full h-32 w-32">
            <Image src={loadingGif} width={150} height={150} alt="loading" className="h-full w-full rounded-full" />
          </div>
        </div>
      ) : null}
      <div className="flex justify-center flex-wrap gap-2">
        {episode.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} episode={item.episode} />
        ))}
      </div>
    </div>
  );
}
