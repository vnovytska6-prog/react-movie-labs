import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatch = () => {
    context.addToMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="add to must watch"
      onClick={handleAddToMustWatch}
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;