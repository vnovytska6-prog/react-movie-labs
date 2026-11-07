import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Header = (props) => {
  const title = props.title;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        py: 2,
        mb: 2,
        backgroundColor: "transparent",
        maxWidth: "1600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.8rem", md: "2.4rem" },
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      <IconButton
        aria-label="go forward"
        onClick={() => navigate(+1)}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;