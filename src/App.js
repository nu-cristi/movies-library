import Home from "./pages/Home/Home";
import { createContext, useState, useContext, useMemo } from "react";

export const MovieContext = createContext();

export default function App() {
  const [movies, setMovies] = useState({
    movies: [],
    setMovies: () => {},
  });

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const addFavoriteMovie = (movie) =>
  setFavoriteMovies((prevState) => [...prevState, movie]);

  return (
    <MovieContext.Provider value={{ movies, setMovies,favoriteMovies, addFavoriteMovie }}>
      <Home />
    </MovieContext.Provider>
  );
}
