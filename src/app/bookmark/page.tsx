'use client';
import React, { useEffect, useState } from 'react';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Retrieve bookmarks from local storage
      const storedBookmarks = localStorage.getItem('bookmarks');
      setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
    }
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-center my-2 text-lg">Daftar Bookmark</h1>
      {bookmarks.length === 0 ? (
        <p className="text-center">Belum ada anime yang di bookmark.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map((slug: string, index: number) => (
            <div className="card p-0 card-side bg-gray-800 shadow-xl min-h-fit clickAnimation-list" key={index}>
              <div className="w-full p-2 card-body">
                {/* Display bookmarked links */}
                <a href={`/${slug}`} className="bg-zinc-800 text-white text-sm p-2 overflow-hidden rounded-md block">
                  <p className="truncate hover:whitespace-nowrap">{slug}</p>
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