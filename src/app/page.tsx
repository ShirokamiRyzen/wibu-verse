'use client';
import Script from 'next/script';
import axios from 'axios';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/episode';
import Loading from '@/components/Loading';
import Cookies from 'js-cookie';
import { Analytics } from '@vercel/analytics/react';

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

    const userAgent = window.navigator.userAgent;

    if (userAgent.includes("Desktop")) {
      alert("Lorem Ipsum");
    }

    const cleanupOnUnload = () => {
      if (Cookies.get('popupShown')) {
        // Hapus cookies hanya jika masih ada
        Cookies.remove('popupShown');
      }
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

    //Quotes popup, ubah lewat .env
    const kata1 = process.env.NEXT_PUBLIC_KATA_1;
    const kata2 = process.env.NEXT_PUBLIC_KATA_2;
    const tombol = process.env.NEXT_PUBLIC_TOMBOL;
    const gambar = process.env.NEXT_PUBLIC_GAMBAR;

    // Create popup
    const popup = document.createElement('div');
    popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 shadow-md rounded-md opacity-0 transition-opacity duration-300 z-50';
    popup.innerHTML = `
  <center>
    <img src="${gambar}" alt="gepeng" width="240px">

    <p class="text-sm md:text-lg text-gray-500 font-bold">${kata1}</p>
    <p class="text-sm md:text-lg text-gray-500 font-bold">${kata2}</p>

    <button class="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md md:px-4 md:py-2 md:text-lg focus:outline-none">${tombol}</button>
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
      <Analytics />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-TT2D2MBVGW`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TT2D2MBVGW');
        `}
      </Script>

      <h1 className="bg-zinc-900 w-max text-white text-base px-4 py-1 rounded-md my-4">Rilisan Terbaru</h1>
      {loading ? (
        <Loading />
      ) : null}
      <div className="flex justify-center flex-wrap gap-2">
        {episode.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} episode={item.episode} />
        ))}
      </div>
    </div>
  );
}
