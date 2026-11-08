import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MovieListPageTemplate({ movies, title, subtitle, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("0");
  const [sortOption, setSortOption] = useState("default");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
  .filter((m) => {
    return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  })
  .filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  })
  .filter((m) => {
    return ratingFilter === "0"
      ? true
      : m.vote_average >= Number(ratingFilter);
  })
  .filter((m) => {
  if (yearFilter === "0") return true;
  const movieYear = m.release_date
    ? new Date(m.release_date).getFullYear()
    : null;
  return movieYear === Number(yearFilter);
});

  if (sortOption === "rating") {
  displayedMovies = [...displayedMovies].sort(
    (a, b) => b.vote_average - a.vote_average
  );}

  if (sortOption === "newest") {
  displayedMovies = [...displayedMovies].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  ); }

  if (sortOption === "oldest") {
  displayedMovies = [...displayedMovies].sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  ); }

  if (sortOption === "az") {
  displayedMovies = [...displayedMovies].sort((a, b) =>
    a.title.localeCompare(b.title)
  ); }

  const handleChange = (type, value) => {
   if (type === "name") { setNameFilter(value);} 
  else if (type === "genre") { setGenreFilter(value);} 
  else if (type === "rating") { setRatingFilter(value);}
  else if (type === "year") {setYearFilter(value);}
  else if (type === "sort") { setSortOption(value); }
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
      sx={{ textAlign: "center", mb: 2, }}
    >
      {subtitle}
    </Typography>
  </Grid>
)}

    <Grid
      size={12}
      sx={{ mb: 2, px: 2, }}
    >
      <FilterCard
        onUserInput={handleChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
        ratingFilter={ratingFilter}
        yearFilter={yearFilter}
        sortOption={sortOption}
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
