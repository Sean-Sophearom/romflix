import React, { useEffect, useState } from "react";
import MovieGrid from "../../components/MovieGrid";
import Spinner from "../../components/Spinner";

const index = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getMovies = async (page) => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0eb72e5a87c3896938cd899d9b93a334&page=${page}`
    );
    const data = await res.json();
    const results = data.results;
    setLoading(false);

    setMovies((prev) => [...prev, ...results]);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  return (
    <>
      <MovieGrid movies={movies} />
      <div className="p-4 flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <button className="btn w-auto px-4 text-base" onClick={() => setPage(page + 1)}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default index;
