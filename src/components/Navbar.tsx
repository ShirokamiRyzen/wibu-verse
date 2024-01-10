'use client';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  // Create a ref for the search input
  const searchRef = useRef<HTMLInputElement>(null);
  // Get the router object
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the search input has a value
    if (searchRef.current?.value) {
      // Redirect to the search page with the search query
      router.push(`/anime/?search=${searchRef.current.value}`);
    }
  };

  // Handle click events on the search div
  const handleClick = () => {
    // Set focus to the search input when the div is clicked
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Render the Navbar component
  return (
    <div className="navbar bg-base-100 container sticky top-0 z-50 bg-opacity-50 backdrop-blur-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Ryzendesu.vip
        </Link>
      </div>
      <div className="flex-none gap-2">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <div className="form-control" onClick={handleClick}>
            <input
              type="text"
              placeholder="Search"
              ref={searchRef}
              className="input input-bordered w-32 md:w-auto"
            />
          </div>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
