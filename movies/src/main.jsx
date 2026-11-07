import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage.jsx";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#9D4EDD",
    },

    secondary: {
      main: "#F4A261",
    },

    background: {
      default: "#09090D",
      paper: "#17171F",
    },

    text: {
      primary: "#F8F8FA",
      secondary: "#9B9BA7",
    },
  },

  shape: {
    borderRadius: 14,
  },
});

const App = () => {
  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
           <MoviesContextProvider>
            <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />

           </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));

rootElement.render(<App />);