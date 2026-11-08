import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person, error, isPending, isError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        px: { xs: 2, md: 4 },
        py: 5,
      }}
    >

     <IconButton
      onClick={() => navigate(-1)}
       sx={{
       mb: 3,
       backgroundColor: "background.paper",  "&:hover": {
       backgroundColor: "primary.main",
       color: "white",
      },
      }}>
      <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "320px 1fr",
          },
          gap: 5,
        }}
      >

        <Box>
          {person.profile_path && (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 20px 50px rgba(0,0,0,.4)",
              }}
            />
          )}
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            {person.name}
          </Typography>

          {person.known_for_department && (
            <Chip
              label={person.known_for_department}
              color="primary"
              sx={{ mb: 3 }}
            />
          )}

          {person.birthday && (
            <Typography sx={{ mb: 1 }}>
              <strong>Birthday:</strong> {person.birthday}
            </Typography>
          )}

          {person.place_of_birth && (
            <Typography sx={{ mb: 3 }}>
              <strong>Place of Birth:</strong> {person.place_of_birth}
            </Typography>
          )}

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Biography
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            {person.biography || "No biography available."}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default PersonDetailsPage;