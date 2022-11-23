import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../components/MovieGrid";
import Spinner from "../../components/Spinner";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getMovie = async (id) => {
    if (!id) return;
    setLoading(true);
    let thisMovie = fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0eb72e5a87c3896938cd899d9b93a334`);
    let relatedMovies = fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=0eb72e5a87c3896938cd899d9b93a334`
    );
    [thisMovie, relatedMovies] = await Promise.all([thisMovie, relatedMovies]);
    [thisMovie, relatedMovies] = await Promise.all([thisMovie.json(), relatedMovies.json()]);
    console.log(thisMovie);
    setMovie(thisMovie);
    setRelated(relatedMovies.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovie(router.query.id);
  }, [router.query.id]);

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center center / cover no-repeat`,
        }}
      >
        <div className="flex flex-col md:flex-row text-white bg-black bg-opacity-60 px-2 py-2 md:py-0">
          <Image
            priority={true}
            className="max-w-[200px] sm:max-w-[250px] md:max-w-[315px] m-2 border border-white object-contain mx-auto"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            width="581"
            height="387"
            alt={movie.title}
          />
          <div className="box space-y-2">
            <h1 className="text-2xl font-bold py-4">{movie.title}</h1>
            <p>Overview: {movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Budget: {movie.budget || "Unknown"} $</p>
            <p>Revenue: {movie.revenue || "Unknown"} $</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Votes: {movie.vote_count}</p>
            <p>Status: {movie.status}</p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <MovieGrid movies={related} title="Related Movies" />
      </div>
    </>
  );
};

export default MovieDetail;
