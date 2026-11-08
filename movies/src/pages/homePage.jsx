import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", { page }],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        subtitle="Explore something new tonight"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={page}
          onChange={(event, value) => {
            setPage(value);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          color="primary"
          size="large"
        />
      </Box>
    </>
  );
};

export default HomePage;