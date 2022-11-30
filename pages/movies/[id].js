import Head from "next/head";
import parse from "node-html-parser";
import React, { useState } from "react";
import { Minus, Plus } from "../../components/icons";
import MovieGrid from "../../components/MovieGrid";
import { useGlobalContext } from "../../lib/cartContext";

const MovieDetail = ({ movie, related, trailer }) => {
  const { getCount, addMovie, removeMovie } = useGlobalContext();

  const [count, setCount] = useState(getCount(movie.id));

  const add = () => {
    addMovie(movie);
    setCount(count + 1);
  };

  const remove = () => {
    if (count <= 0) return;
    removeMovie(movie);
    setCount(count - 1);
  };

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}) center center / cover no-repeat`,
        }}
      >
        <div className="flex flex-col md:flex-row text-white bg-black bg-opacity-60 px-2 py-2 md:py-0">
          <img
            className="max-w-[200px] sm:max-w-[250px] md:max-w-[315px] m-2 border border-white object-contain mx-auto"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width="581"
            height="387"
            alt={movie.title}
          />
          <div className="box space-y-2">
            <h1 className="text-2xl font-bold py-4">{movie.title}</h1>
            <p>Overview: {movie.overview}</p>

            <div className="flex items-center gap-4 justify-center pt-4 pb-2">
              <button
                className="btn px-3 py-2 sm:py-1 sm:px-[6px] w-auto ring-1 ring-white"
                onClick={remove}
                disabled={count <= 0}
              >
                <Minus />
              </button>
              <span className="text-base">{count}</span>
              <button className="btn px-3 py-2 sm:py-1 sm:px-[6px] w-auto ring-1 ring-white" onClick={add}>
                <Plus />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black mt-8 py-4">
        <iframe src={trailer} frameborder="0" allowFullScreen className="mx-auto w-4/5 aspect-video"></iframe>
      </div>

      <div className="py-4">
        <MovieGrid movies={related} title="Related Movies" />
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${ctx.query.id}?api_key=0eb72e5a87c3896938cd899d9b93a334`
  ).then((res) => res.json());

  const relatedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${ctx.query.id}/similar?api_key=0eb72e5a87c3896938cd899d9b93a334`
  ).then((res) => res.json());

  const searchRes = await fetch(`https://tinyzonetv.to/search/${movie.title.split(" ").join("-")}`);
  const html = await searchRes.text();

  const root = parse(html);

  const items = root.querySelectorAll(".flw-item");

  const item = items.find((i, idx) => {
    const titleDiv = i.querySelector(".film-name");
    const title = titleDiv.innerText.trim();
    const href = titleDiv.firstChild.getAttribute("href");

    if (href.split("/")[1] === "tv") return false;

    const infos = i.querySelectorAll(".film-infor span");

    const year = infos[1].innerText.trim();
    const runtime = infos[2].innerText.slice(0, -1).trim("");

    const conditions = [
      movie.title === title,
      movie.release_date.slice(0, 4) == year,
      Math.abs(movie.runtime - runtime) < 3,
    ].every((i) => i);

    return conditions || idx > 10;
  });

  const href = item.querySelector(".film-name").firstChild.getAttribute("href");

  const movieRes = await fetch(`https://tinyzonetv.to${href}`).then((res) => res.text());
  const innerRoot = parse(movieRes);

  const trailer = innerRoot.querySelector("iframe#iframe-trailer").getAttribute("data-src");

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
      related: JSON.parse(JSON.stringify(relatedMovies.results)),
      trailer,
    },
  };
};

export default MovieDetail;
