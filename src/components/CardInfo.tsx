import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardInfoProps {
  id: string;
  title: string;
  thumbnail: string;
  genres: string[];
}

const CardInfo = ({ id, title, thumbnail, genres }: CardInfoProps) => {
  return (
    <div className="card p-0 card-side bg-base-100 shadow-xl min-h-fit">
      <figure className="w-36">
        <Image src={thumbnail} width={160} height={680} alt={title} />
      </figure>
      <div className="w-10 p-2  card-body ">
        <h2 className="card-title text-base ">{title}</h2>
        <p className="text-xs">Genre: {genres.join(', ')}</p>
        <div className="card-actions justify-end ">
          <Link href={`/${id}`} className=" bg-zinc-800 text-base p-2 rounded-lg text-white">
            Tonton
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
