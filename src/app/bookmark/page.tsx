'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Retrieve bookmarks from local storage
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
        const parsedBookmarks = JSON.parse(storedBookmarks);
        Promise.all(parsedBookmarks.map((slug: string) => axios.get(`/api/anime/${slug}`)))
          .then((responses) => {
            const bookmarkData = responses.map((response) => response.data.data);
            setBookmarks(bookmarkData);
          });
      }
    }
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-center my-2 text-lg">Daftar Bookmark</h1>
      {bookmarks.length === 0 ? (
        <p className="text-center">Belum ada anime yang di bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map((bookmark: any, index: number) => (
            <div className="card p-0 card-side bg-gray-800 shadow-xl min-h-fit clickAnimation-list" key={index}>
              <div className="w-full p-2 card-body">
                {/* Display bookmarked links */}
                <a href={`/${bookmark.slug}`} className="bg-zinc-800 text-white text-sm p-2 overflow-hidden rounded-md block">
                  <div className="flex items-center mb-2">
                    {/* Display thumbnail with specified width and height */}
                    <img
                      src={bookmark.thumbnail}
                      alt={bookmark.title}
                      width={120}
                      height={40}
                    />
                    <div className="w-10 p-2 card-body">
                      {/* Display title in large text */}
                      <h2 className="text-xl font-bold text-white">{bookmark.title}</h2>
                      {/* Extract and display genre information */}
                      {bookmark.info && bookmark.info.find((info: string) => info.startsWith("Genre:")) && (
                        <p className="text-white text-sm mt-2">
                          Genre: {bookmark.info.find((info: string) => info.startsWith("Genre:"))?.replace("Genre: ", "")}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;