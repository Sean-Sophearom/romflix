import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, title }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold my-2">{title}</h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-2">
        {movies.map((m) => (
          <MovieCard m={m} key={m.id} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
