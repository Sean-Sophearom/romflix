import Image from "next/image";
import Link from "next/link";

const MovieGrid = ({ movies, title }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold my-2">{title}</h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-2">
        {movies.map((m) => (
          <div key={m.id} className="border border-gray-400 rounded-md overflow-hidden flex flex-col shadow-sm">
            <Link href={`/movies/${m.id}`} className="overflow-hidden cursor-pointer">
              <Image
                className="hover:scale-110 transition-all"
                src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                width="581"
                height="387"
                alt={m.title}
                quality={25}
              />
            </Link>
            <p className="flex justify-between px-2 py-1 text-xs text-gray-400">
              <span>Rating: {m.vote_average}</span>
              <span>Votes: {m.vote_count}</span>
            </p>
            <p className="text-center font-medium px-2 py-1 my-auto">{m.title}</p>
            <div className="flex pt-1 pb-4 text-sm">
              <Link href={`/movies/${m.id}`} className="btn">
                View Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
