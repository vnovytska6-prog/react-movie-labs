import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


const TemplateMoviePage = ({ movie, children }) => {
   const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters;
  const poster = images[0];

  return (
  <>
    <MovieHeader movie={movie} />

    <Grid
      container
      spacing={4}
      sx={{
        maxWidth: "1500px",
        margin: "0 auto",
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        {poster && (
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${poster.file_path}`}
            alt={movie.title}
            sx={{
              width: "100%",
              maxWidth: 380,
              display: "block",
              margin: "0 auto",
              borderRadius: 3,
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            }}
          />
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        {children}
      </Grid>
    </Grid>
  </>
);
}
export default TemplateMoviePage;
