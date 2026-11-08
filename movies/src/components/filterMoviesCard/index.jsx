import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TuneIcon from "@mui/icons-material/Tune";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;

  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
  handleChange(e, "rating", e.target.value);
  };

  const handleYearChange = (e) => {
  handleChange(e, "year", e.target.value);
  };

  const handleSortChange = (e) => {
  handleChange(e, "sort", e.target.value);
};

  return (
  <Card
    elevation={0}
    sx={{
      backgroundColor: "background.paper",
      borderRadius: 3,
      border: "1px solid",
      borderColor: "rgba(157, 78, 221, 0.25)",
      overflow: "hidden",
    }}
  >
    <CardContent
      sx={{
        p: 2.5,
        display: "grid",
        gridTemplateColumns: {
        xs: "1fr",
        md: "1.1fr 2fr 1fr 1fr 1fr 1fr",
       },
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 0.5,
          }}
        >
          <TuneIcon color="primary" />

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
            }}
          >
            Find a Movie
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Search, filter and sort movies
        </Typography>
      </Box>

      <TextField
        fullWidth
        id="movie-search"
        label="Search movies"
        type="search"
        value={props.titleFilter}
        onChange={handleTextChange}
        InputProps={{
          startAdornment: (
            <SearchIcon
              sx={{
                mr: 1,
                color: "text.secondary",
              }}
            />
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.03)",
          },
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="genre-label">Genre</InputLabel>

        <Select
          labelId="genre-label"
          id="genre-select"
          value={props.genreFilter}
          label="Genre"
          onChange={handleGenreChange}
          sx={{
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
      <InputLabel id="rating-label">Minimum Rating</InputLabel>
       <Select
       labelId="rating-label"
       id="rating-select"
       value={props.ratingFilter}
       label="Minimum Rating"
       onChange={handleRatingChange}
       sx={{ backgroundColor: "rgba(255,255,255,0.03)",}}>
      <MenuItem value="0">All ratings</MenuItem>
      <MenuItem value="6">6+</MenuItem>
      <MenuItem value="7">7+</MenuItem>
      <MenuItem value="8">8+</MenuItem>
      <MenuItem value="9">9+</MenuItem>
      </Select>
     </FormControl>

     <FormControl fullWidth>
  <InputLabel id="year-label">Year</InputLabel>
    <Select
    labelId="year-label"
    id="year-select"
    value={props.yearFilter}
    label="Year"
    onChange={handleYearChange}
    sx={{
      backgroundColor: "rgba(255,255,255,0.03)",
    }}
  >
    <MenuItem value="0">All years</MenuItem>
    <MenuItem value="2026">2026</MenuItem>
    <MenuItem value="2025">2025</MenuItem>
    <MenuItem value="2024">2024</MenuItem>
  </Select>
  </FormControl>

  <FormControl fullWidth>
  <InputLabel id="sort-label">Sort By</InputLabel>
  <Select
    labelId="sort-label"
    id="sort-select"
    value={props.sortOption}
    label="Sort By"
    onChange={handleSortChange}
    sx={{
      backgroundColor: "rgba(255,255,255,0.03)",
    }}
  >
    <MenuItem value="default">Default</MenuItem>
    <MenuItem value="rating">Highest Rated</MenuItem>
    <MenuItem value="newest">Newest</MenuItem>
    <MenuItem value="oldest">Oldest</MenuItem>
    <MenuItem value="az">A-Z</MenuItem>
  </Select>
</FormControl>

    </CardContent>
  </Card>
);
}