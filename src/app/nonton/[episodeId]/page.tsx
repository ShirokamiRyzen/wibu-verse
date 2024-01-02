'use client';
import Frame from '@/components/Frame';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ListEpisodeContext } from '@/context/ListEpisodeCtx';
import Image from 'next/image';
import loadingGif from '@/assets/loading.gif';

interface Episode {
  title: string;
  link: string;
}
const Page = ({ params }: { params: { episodeId: string } }) => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLists } = useContext(ListEpisodeContext);

  const getEpisode = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/episode/${params.episodeId}`);
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
    getEpisode();
    const lists = localStorage.getItem('lists');
    if (lists) setLists(JSON.parse(lists));
  }, []);

  return (
    <div className="py-10">
      {loading ? (
        <div className="flex justify-center">
          <div className=" rounded-full h-32 w-32">
            <Image src={loadingGif} alt="loading" width={150} height={150} className="h-full w-full rounded-full" />
          </div>
        </div>
      ) : null}
      <h1>{episode?.title}</h1>
      <div className="flex justify-center">
        <Frame url={episode?.link!} />
      </div>
    </div>
  );
};

export default Page;
