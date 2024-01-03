'use client';
import Frame from '@/components/Frame';
import Frame2 from '@/components/Frame2';
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
  const [episode, setEpisode] = useState<Episode | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedQuality, setSelectedQuality] = useState<string>('720p');
  const { setLists } = useContext(ListEpisodeContext);

  const getEpisode = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/episode/${params.episodeId}`);
      setEpisode(data.data);
    } catch (error: any) {
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

          <div className="rounded-full h-32 w-32">
            <Image src={loadingGif} alt="loading" width={150} height={150} className="h-full w-full rounded-full" />
          </div>
        </div>
      ) : null}

      {episode && (
        <>
          <h1>{episode.title}</h1>
          <br />
          <div className="alert alert-danger bg-green-500 text-black mx-auto max-w-md" role="alert">
            <span className="mx-auto">Jika reso 720p burik atau error, berarti link gada</span>
          </div>
          <br />
          <div className="flex justify-center">
            {selectedQuality === '720p' ? (
              <Frame url={episode.link} />
            ) : (
              <Frame2 url={episode.link} />
            )}
          </div>
          <span className='flex justify-center'>Kualitas saat ini: {selectedQuality}</span>
          <br />

          {/* Add buttons for quality selection */}
          <div className="flex justify-center mt-3 rounded">
            <div className="border border-black p-2">
              <button
                onClick={() => setSelectedQuality('720p')}
                className={`mr-3 ${selectedQuality === '720p' ? 'bg-green-500 text-white' : 'bg-blue-500 text-black'} py-2 px-4 rounded`}
              >
                720p
              </button>
              <button
                onClick={() => setSelectedQuality('480p')}
                className={`${selectedQuality === '480p' ? 'bg-green-500 text-white' : 'bg-blue-500 text-black'} py-2 px-4 rounded`}
              >
                480p
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;