'use client';
import Script from 'next/script';
import axios from 'axios';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/episode';
import Loading from '@/components/Loading';
import { Analytics } from '@vercel/analytics/react';
import Swal from 'sweetalert2';

export default function Home() {
  const [episode, setEpisode] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('new');

  const getEpisodes = async (category: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/${category}`);
      setEpisode(data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    getEpisodes(selectedCategory);
  };

  useEffect(() => {
    getEpisodes(category);

    // Periksa apakah popup sudah ditampilkan sebelumnya dalam sesi ini
    const popupShownBefore = sessionStorage.getItem('popupShown');

    // Tampilkan popup jika belum pernah ditampilkan dalam sesi ini
    if (!popupShownBefore) {
      showPopup();
      // Set status popupShown ke 'true' dalam session storage
      sessionStorage.setItem('popupShown', 'true');
    }

    const cleanupOnUnload = () => {
      // Kosongkan status popupShown saat pengguna meninggalkan halaman
      if (sessionStorage.getItem('popupShown')) {
        sessionStorage.removeItem('popupShown');
      }
    };

    window.addEventListener('unload', cleanupOnUnload);

    return () => {
      window.removeEventListener('unload', cleanupOnUnload);
    };

  }, [category]);

  const showPopup = () => {
    // Quotes popup, ubah lewat .env
    const kata1 = process.env.NEXT_PUBLIC_KATA_1;
    const kata2 = process.env.NEXT_PUBLIC_KATA_2;
    const tombol = process.env.NEXT_PUBLIC_TOMBOL;
    const gambar = process.env.NEXT_PUBLIC_GAMBAR;

    // Create SweetAlert popup
    Swal.fire({
      //title: 'Halo kak!',
      //icon: 'warning',
      html: `
        <center>
          <img src="${gambar}" alt="gepeng" width="260px">
          <p class="text-sm md:text-lg text-gray-500 font-bold">${kata1}</p>
          <p class="text-sm md:text-lg text-gray-500 font-bold">${kata2}</p>
        </center>`,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: tombol,
      background: '#2D2D2D', // Warna latar belakang gelap
      customClass: {
        title: 'text-white',
        htmlContainer: 'text-white',
        popup: 'bg-gray-800', // Warna pop-up gelap
        confirmButton: 'bg-blue-500 text-white px-2 py-1 rounded-md md:px-4 md:py-2 md:text-lg focus:outline-none',
        cancelButton: 'bg-red-500 text-white px-2 py-1 rounded-md md:px-4 md:py-2 md:text-lg focus:outline-none'
      }
      //}).then((result) => {
      //  if (result.isConfirmed) {
      //    Swal.fire(
      //      'Halo kak!',
      //      'Jangan lupa bernafas :D',
      //      'success'
      //    );
      //  }
    });
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

      <div className="flex justify-between">
        <h1
          className={`bg-zinc-900 w-max text-white text-base px-4 py-1 rounded-md my-4 cursor-pointer clickAnimation ${category === 'new' ? 'opacity-100' : 'opacity-70'}`}
          onClick={() => handleCategoryChange('new')}
        >
          Anime ongoing
        </h1>
        <h1
          className={`bg-zinc-900 w-max text-white text-base px-4 py-1 rounded-md my-4 cursor-pointer clickAnimation ${category === 'new-finish' ? 'opacity-100' : 'opacity-70'}`}
          onClick={() => handleCategoryChange('new-finish')}
        >
          Selesai tayang
        </h1>
      </div>

      {loading ? <Loading /> : null}

      <div className="flex justify-center flex-wrap gap-2">
        {episode.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} episode={item.episode} />
        ))}
      </div>
    </div>
  );
};  