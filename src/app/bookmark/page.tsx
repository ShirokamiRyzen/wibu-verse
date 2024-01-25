'use client';
import React, { useEffect, useState } from 'react';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [animeData, setAnimeData] = useState<any>(null);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Retrieve bookmarks from local storage
      const storedBookmarks = localStorage.getItem('bookmarks');
      setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);

      // Fetch anime data from the API for each bookmark
      fetchAnimeData();
    }
  }, [bookmarks]); // Add bookmarks as a dependency to useEffect

  const fetchAnimeData = async () => {
    try {
      const updatedAnimeData = await Promise.all(
        bookmarks.map(async (slug: string) => {
          const apiUrl = `/api/anime/${slug}`;
          console.log('API URL:', apiUrl);
  
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
        })
      );
  
      setAnimeData(updatedAnimeData);
    } catch (error) {
      console.error('Error fetching anime data:', error);
    }
  };  

  return (
    <div className="container py-10">
      <h1 className="text-center my-2 text-lg">Daftar Bookmark</h1>
      {bookmarks.length === 0 ? (
        <p className="text-center">Belum ada anime yang di bookmark.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {bookmarks.map((slug: string, index: number) => {
            // Find the corresponding anime data for the current slug
            const anime = animeData?.[index];

            return (
              <li className="clickAnimation-list" key={index}>
                {/* Display bookmarked links with anime title */}
                <a href={`/${slug}`} className="bg-zinc-800 text-white text-sm p-2 overflow-hidden rounded-md">
                  <p className="truncate hover:whitespace-nowrap">{anime?.data.title || slug}</p>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookmarkPage;