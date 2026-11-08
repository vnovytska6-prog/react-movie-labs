import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";

const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  const recommendations = data.results.slice(0, 6);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        You May Also Like
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(6, 1fr)",
          },
          gap: 2,
        }}
      >
        {recommendations.map((item) => (
          <Card
            key={item.id}
            elevation={0}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Link
              to={`/movies/${item.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <CardMedia
                component="img"
                image={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "/"
                }
                alt={item.title}
                sx={{
                  aspectRatio: "2 / 3",
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ p: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MovieRecommendations;