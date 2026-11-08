import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MovieListPageTemplate({ movies, title, subtitle, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
  <Grid
    container
    sx={{
      maxWidth: "1800px",
      margin: "0 auto",
      px: { xs: 2, md: 3 },
      pb: 4,
    }}
  >
    <Grid size={12}>
      <Header title={title} />
    </Grid>

    {subtitle && (
  <Grid size={12}>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        textAlign: "center",
        mb: 2,
      }}
    >
      {subtitle}
    </Typography>
  </Grid>
)}

    <Grid
      size={12}
      sx={{
        mb: 2,
        px: 2,
      }}
    >
      <FilterCard
        onUserInput={handleChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
      />
    </Grid>

    <Grid container size={12}>
      <MovieList
        action={action}
        movies={displayedMovies}
      />
    </Grid>
  </Grid>
);
}
export default MovieListPageTemplate;
