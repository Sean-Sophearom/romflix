import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/icons";
import MovieGrid from "../../components/MovieGrid";

const Index = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMore, setNomore] = useState(false);
  const [page, setPage] = useState(1);

  const getMovies = async (page, query) => {
    setLoading(true);
    let res;
    if (query) {
      res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0eb72e5a87c3896938cd899d9b93a334&query=${query}&page=${page}`
      );
    } else {
      res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0eb72e5a87c3896938cd899d9b93a334&page=${page}`
      );
    }
    const data = await res.json();
    const results = data.results;
    if (results.length === 0) {
      setLoading(false);
      return setNomore(true);
    }
    setLoading(false);
    setMovies((prev) => [...prev, ...results]);
  };

  useEffect(() => {
    getMovies(page, query);
  }, [page, query]);

  return (
    <>
      <MovieGrid movies={movies} title={query ? `Search results for: ${query}` : "Popular Movies"} />
      <div className="p-4 flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <button className="btn w-auto px-4 text-base" onClick={() => (noMore ? null : setPage(page + 1))}>
            {noMore ? "No more results" : "Load more"}
          </button>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = (ctx) => {
  return {
    props: {
      query: ctx.query.q || null,
    },
  };
};

export default Index;
