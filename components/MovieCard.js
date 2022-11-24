import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../lib/context";
import { Minus, Plus } from "./icons";

const MovieCard = ({ m }) => {
  const [count, setCount] = useState(0);
  const { getCount, addMovie, removeMovie } = useGlobalContext();

  const add = () => {
    addMovie(m);
    setCount(count + 1);
  };

  const remove = () => {
    if (count <= 0) return;
    removeMovie(m);
    setCount(count - 1);
  };

  useEffect(() => {
    setCount(getCount(m.id));
  }, [setCount, getCount]);

  const price = (m.id % 1000) / 100;
  const total = (price * count).toFixed(2);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden flex flex-col shadow-sm">
      <Link href={`/movies/${m.id}`} className="overflow-hidden cursor-pointer">
        <img
          className="hover:scale-110 transition-all"
          src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
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
      <div className="flex pt-1 pb-4 text-sm flex-col px-2">
        <div className="flex justify-between items-center">
          <span className="py-1 px-2 bg-black text-white rounded font-medium ">{price}$</span>
          <div className="flex items-center gap-3">
            <button className="btn px-3 py-2 sm:py-1 sm:px-[6px]" onClick={remove} disabled={count <= 0}>
              <Minus />
            </button>
            <span className="text-base">{count}</span>
            <button className="btn px-3 py-2 sm:py-1 sm:px-[6px]" onClick={add}>
              <Plus />
            </button>
          </div>
        </div>

        <p className="text-xs text-end text-slate-500">total: {total > 0 ? total : 0}$</p>

        <Link href={`/movies/${m.id}`} className="btn mt-2">
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
