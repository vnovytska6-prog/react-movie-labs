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
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
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
          sx={{
            mb: 3,
          }}
        >
          Search the collection by title or genre.
        </Typography>

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
            mb: 2,
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
      </CardContent>
    </Card>
  );
}