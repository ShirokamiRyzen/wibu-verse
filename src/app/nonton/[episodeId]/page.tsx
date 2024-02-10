'use client';
import Frame from '@/components/Frame';
import Frame2 from '@/components/Frame2';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ListEpisodeContext } from '@/context/ListEpisodeCtx';
import Loading from '@/components/Loading';
import { DiscussionEmbed } from 'disqus-react';

interface Episode {
  title: string;
  link: string;
}

const Page = ({ params }: { params: { episodeId: string } }) => {
  const [episode, setEpisode] = useState<Episode | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedQuality, setSelectedQuality] = useState<string>('480p');
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [showComments, setShowComments] = useState<boolean>(false);
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

  const isOvaPage = typeof window !== 'undefined' && window.location.pathname.includes('ova');

  const handlePrevEpisode = () => {
    const currentUrl = window.location.href;
    const episodeNumberMatch = currentUrl.match(/episode-(\d+)/);

    if (episodeNumberMatch) {
      const currentEpisodeNumber = parseInt(episodeNumberMatch[1]);

      if (currentEpisodeNumber > 1) {
        const prevEpisodeNumber = currentEpisodeNumber - 1;
        const newUrl = currentUrl.replace(
          episodeNumberMatch[0],
          `episode-${prevEpisodeNumber}`
        );
        window.location.href = newUrl;
      }
    }
  };

  const getLatestEpisodeNumber = () => {
    const episodeLinks = document.querySelectorAll('ul.flex li a');
    let latestEpisodeNumber = 0;

    episodeLinks.forEach((link) => {
      const anchorLink = link as HTMLAnchorElement;
      const match = anchorLink.href.match(/episode-(\d+)/);

      if (match) {
        const episodeNumber = parseInt(match[1]);
        latestEpisodeNumber = Math.max(latestEpisodeNumber, episodeNumber);
      }
    });

    return latestEpisodeNumber;
  };

  const handleNextEpisode = () => {
    const currentUrl = window.location.href;
    const episodeNumberMatch = currentUrl.match(/episode-(\d+)/);

    if (episodeNumberMatch) {
      const currentEpisodeNumber = parseInt(episodeNumberMatch[1]);
      const nextEpisodeNumber = currentEpisodeNumber + 1;

      const latestEpisodeNumber = getLatestEpisodeNumber();

      if (nextEpisodeNumber <= latestEpisodeNumber) {
        const newUrl = currentUrl.replace(episodeNumberMatch[0], `episode-${nextEpisodeNumber}`);
        window.location.href = newUrl;
      } else {
        return 0;
      }
    } else {
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="py-10">
      {loading ? (
        <Loading />
      ) : null}

      {episode && (
        <>
          <h1>{episode.title}</h1>
          <br />
          {showMessage && (
            <div className="alert alert-danger bg-green-500 text-black mx-auto max-w-full" role="alert" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="mx-auto">720p tidak selalu ada karena limitasi akses ke server sumber</span>
              <button onClick={() => setShowMessage(false)} className="close-button">
                ×
              </button>
            </div>
          )}
          <br />
          <div className="flex justify-center">
            {selectedQuality === '480p' ? (
              <Frame url={episode.link} />
            ) : (
              <Frame2 url={episode.link} />
            )}
          </div>
          <span className='flex justify-center'>Kualitas saat ini: {selectedQuality}</span>
          <div className="flex justify-center mt-3">
            {isOvaPage ? null : (
              <>
                <button
                  onClick={handlePrevEpisode}
                  className="bg-gray-300 text-black py-2 px-4 rounded mr-3 hover:bg-gray-400 transition"
                >
                  Prev Episode
                </button>
                <button
                  onClick={handleNextEpisode}
                  className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
                >
                  Next Episode
                </button>
              </>
            )}
          </div>
          {/* Add buttons for quality selection */}
          <div className="flex justify-center mt-3 rounded">
            <div className="border border-black p-2">
              <button
                onClick={() => setSelectedQuality('480p')}
                className={`mr-3 ${selectedQuality === '480p'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-black'
                  } py-2 px-4 rounded hover:bg-green-600 transition`}
              >
                SD 480p
              </button>
              <button
                onClick={() => setSelectedQuality('720p')}
                className={`${selectedQuality === '720p'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-black'
                  } py-2 px-4 rounded hover:bg-green-600 transition`}
              >
                HD 720p
              </button>
            </div>
          </div>

          {/* Toggle comments button */}
          <div className="mt-3 text-center">
            <button onClick={toggleComments} className="buka-komentar-button">
              {showComments ? 'Tutup Komentar' : 'Buka Komentar'}
            </button>
          </div>

          {/* Disqus section */}
          {showComments && (
            <div className="mt-5">
              <DiscussionEmbed
                shortname="ryzendesu" // replace this with your Disqus shortname
                config={{
                  url: window.location.href,
                  identifier: params.episodeId, // identifier could be episode id or any unique identifier for your page
                  title: episode.title, // title of the current page
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;