import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({mode, toggleColorMode}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "My List", path: "/movies/must-watch" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
      position="fixed"
      sx={{
      backgroundColor:
      mode === "dark"
        ? "rgba(9, 9, 13, 0.94)"
        : "rgba(255, 255, 255, 0.94)",

      color: mode === "dark" ? "#F8F8FA" : "#18181B",
      backdropFilter: "blur(12px)",
      boxShadow:
      mode === "dark"
        ? "0 4px 20px rgba(0, 0, 0, 0.35)"
        : "0 4px 20px rgba(0, 0, 0, 0.12)",
       }} >

        <Toolbar
          sx={{
            minHeight: 72,
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            CINEMOD
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    mx: 0.5,
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "rgba(157, 78, 221, 0.10)",
                    },
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}

          <IconButton
          onClick={toggleColorMode}
          color="inherit"
          aria-label="toggle theme"
          sx={{ ml: 1, border: "1px solid",
           borderColor: "rgba(157, 78, 221, 0.35)",
            "&:hover": {
           backgroundColor: "rgba(157, 78, 221, 0.12)",},
          }} >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;