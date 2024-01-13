'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import CardInfo from '@/components/CardInfo';
import Image from 'next/image';
import loadingGif from '@/assets/loading.gif';

interface Anime {
  id: string;
  title: string;
  thumbnail: string;
  genres: string[];
}

const Page = () => {
  const [lists, setLists] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? 'none';

  const getAnimeLists = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/anime/?search=${search}`);
      setLists(data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimeLists();
  }, [search]);

  return (
    <div className="container py-6 flex flex-col gap-4">
      {loading ? (
        <div className="flex justify-center">
          <div className=" rounded-full h-32 w-32">
            <Image src={loadingGif} alt="loading" width={150} height={150} className="h-full w-full rounded-full" loading='lazy'/>
          </div>
        </div>
      ) : (
        <h1 className="">Hasil pencarian: {search}</h1>
      )}

      {lists.map((item) => (
        <CardInfo key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} genres={item.genres} />
      ))}
    </div>
  );
};

export default Page;
