import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage.jsx";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PersonDetailsPage from "./pages/personDetailsPage";

import Box from "@mui/material/Box";
import AnimatedBackground from "./components/animatedBackground";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode((previousMode) =>
      previousMode === "dark" ? "light" : "dark"
    );
  };

  const theme = createTheme({
    palette: {
      mode: mode,

      primary: {
        main: "#9D4EDD",
      },

      secondary: {
        main: "#F4A261",
      },

      background: {
        default: mode === "dark" ? "#09090D" : "#F5F5F7",
        paper: mode === "dark" ? "#17171F" : "#FFFFFF",
      },

      text: {
        primary: mode === "dark" ? "#F8F8FA" : "#18181B",
        secondary: mode === "dark" ? "#9B9BA7" : "#66666F",
      },
    },

    shape: {
      borderRadius: 14,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <AnimatedBackground mode={mode} />

       <Box sx={{ position: "relative", zIndex: 1, minHeight: "100vh", }} >

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader
            mode={mode}
            toggleColorMode={toggleColorMode}
          />

          <MoviesContextProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/movies/favorites"
                element={<FavoriteMoviesPage />}
              />

              <Route
                path="/movies/must-watch"
                element={<MustWatchMoviesPage />}
              />

              <Route
                path="/movies/upcoming"
                element={<UpcomingMoviesPage />}
              />

              <Route
                path="/movies/popular"
                element={<PopularMoviesPage />}
              />

              <Route
                path="/movies/top-rated"
                element={<TopRatedMoviesPage />}
              />

              <Route
                path="/movies/now-playing"
                element={<NowPlayingMoviesPage />}
              />

              <Route
                path="/movies/:id"
                element={<MoviePage />}
              />

              <Route
                path="/people/:id"
                element={<PersonDetailsPage />}
              />

              <Route
                path="/reviews/:id"
                element={<MovieReviewPage />}
              />

              <Route
                path="/reviews/form"
                element={<AddMovieReviewPage />}
              />

              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));

rootElement.render(<App />);