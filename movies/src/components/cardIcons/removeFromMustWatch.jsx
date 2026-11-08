import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatch = ({ movie }) => {
  const context = useContext(MoviesContext);

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={() => context.removeFromMustWatch(movie)}
    >
      <PlaylistRemoveIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatch;