'use client';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchRef.current?.value) {
      router.push(`/anime/?search=${searchRef.current.value}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchRef.current?.value) {
      const form = e.currentTarget.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  return (
    <div className="navbar bg-base-100 container">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Ryzendesu.com
        </Link>
      </div>
      <div className="flex-none gap-2">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              ref={searchRef}
              className="input input-bordered w-32 md:w-auto"
              onKeyPress={handleKeyPress}
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