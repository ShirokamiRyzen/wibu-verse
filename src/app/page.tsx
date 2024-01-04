'use client';
import axios from 'axios';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/episode';
import loadingGif from '@/assets/loading.gif';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function Home() {
  const [episode, setEpisode] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getNewEpisodes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/new');
      setEpisode(data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewEpisodes();

    const popupShownBefore = Cookies.get('popupShown');

    if (!popupShownBefore) {
      showPopup();
      Cookies.set('popupShown', 'true', { expires: 1 });
    }

    const cleanupOnUnload = () => {
      Cookies.remove('popupShown');
    };

    window.addEventListener('unload', cleanupOnUnload);

    return () => {
      window.removeEventListener('unload', cleanupOnUnload);
    };
  }, []);

  const showPopup = () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40';

    // Create popup
    const popup = document.createElement('div');
    popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 p-4 shadow-md rounded-md opacity-0 transition-opacity duration-300 z-50';
    popup.innerHTML = `
  <center>
    <img src="https://telegra.ph/file/42d1118423795a857e61c.png" alt="gepeng" width="128px">
    <p class="text-sm md:text-lg">Jangan ajari aku arti sabar,</p>
    <p class="text-sm md:text-lg">Gw pernah ngarep Gaji padahal peserta PKL</p>
    <button class="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md md:px-4 md:py-2 md:text-lg focus:outline-none">Tutup</button>
  <center>
`;

    // Append overlay and popup to body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Disable scrolling
    document.body.style.overflow = 'hidden';

    const closeButton = popup.querySelector('button');

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        // Enable scrolling
        document.body.style.overflow = 'visible';

        // Remove both overlay and popup
        document.body.removeChild(overlay);
        popup.classList.remove('opacity-100');
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 300);
      });
    }

    setTimeout(() => {
      // Make popup and overlay visible
      overlay.classList.add('opacity-100');
      popup.classList.add('opacity-100');
    }, 100);
  };

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
