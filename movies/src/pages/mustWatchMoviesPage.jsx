import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = mustWatchQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
  <PageTemplate
    title="My List"
    movies={movies}
    action={(movie) => {
      return <RemoveFromMustWatch movie={movie} />;
    }}
  />
);
};

export default MustWatchMoviesPage;