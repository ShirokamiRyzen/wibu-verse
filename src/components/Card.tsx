import { Episode } from '@/types/episode';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ id, title, thumbnail, episode }: Episode) => {
  return (
    <div className="relative w-40 rounded-md overflow-hidden shadow-zinc-600 shadow-md">
      <Link href={`/${id}`}>
        <Image src={thumbnail} alt={title} width={160} height={180} loading="lazy" />
        <div className="absolute top-0 flex flex-col justify-between h-full w-full">
          <p className="bg-zinc-800 bg-opacity-70 w-max px-2 text-white text-base">{episode}</p>
          <h2 className="bg-zinc-800 text-base text-center truncate w-full bg-opacity-70 text-white hover:whitespace-normal">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Card;
