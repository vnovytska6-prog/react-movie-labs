
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Header = (props) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 1.5,
        marginBottom: 2,
      }}
    >
      <Typography variant="h4" component="h2">
        {props.title}
      </Typography>
    </Paper>
  );
};

export default Header;
