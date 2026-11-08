import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Link } from "react-router";

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  const cast = data.cast.slice(0, 6);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Cast
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          pb: 2,
        }}
      >
        {cast.map((actor) => (
          <Box
           key={actor.id}
           component={Link}
           to={`/people/${actor.id}`}
           sx={{
           minWidth: 110,
           textAlign: "center",
           textDecoration: "none",
           color: "inherit",
           transition: "0.2s", "&:hover": {
           transform: "translateY(-4px)",
          },
           }}
>
            <Avatar
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : undefined
              }
              alt={actor.name}
              sx={{
                width: 90,
                height: 90,
                margin: "0 auto",
                mb: 1,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              {actor.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {actor.character}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MovieCast;