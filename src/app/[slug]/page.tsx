'use client';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Link from 'next/link';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DetailAnime } from '@/types/detailAnime';
import { ListEpisodeContext } from '@/context/ListEpisodeCtx';

const Page = ({ params }: { params: { slug: string } }) => {
  const [detailAnime, setDetailAnime] = useState<DetailAnime>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLists } = useContext(ListEpisodeContext);

  const getDetailAnime = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/anime/${params.slug}`);
      setDetailAnime(data.data);
      setLists(data.data.links);
      localStorage.setItem('lists', JSON.stringify(data.data.links));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailAnime();
  }, []);

  return (
    <div className="container py-10">
      {loading ? (
        <Loading />
      ) : null}
      <div className="flex justify-center">{detailAnime ? <Image className="rounded-md" src={detailAnime?.thumbnail!} width={200} height={250} alt={detailAnime?.title!} /> : null}</div>
      <h1 className="text-center my-2 text-lg">{detailAnime?.title}</h1>
      <ul>
        {detailAnime?.info.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {detailAnime ? <h3 className=" text-base mt-4">List Episode: </h3> : null}
      <ul className="flex flex-col gap-2">
        {detailAnime?.links.map((item, index) => (
          <li  className="clickAnimation-list" key={index}>
            <Link href={`/nonton/${item.id}`}>
              <div className="bg-zinc-800 text-white text-sm p-2 overflow-hidden rounded-md">
                <p className="truncate hover:whitespace-nowrap">{item.title}</p>
                <p className="text-end text-xs mt-2">{item.release}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
