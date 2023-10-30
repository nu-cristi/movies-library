import Home from "./pages/Home/Home";
import { createContext, useState, useContext, useMemo } from "react";
import { ToastContainer } from "react-toastify";

//App context
export const MovieContext = createContext();

export default function App() {
  //Context states
  const [movies, setMovies] = useState({
    movies: [],
    setMovies: () => {},
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState({
    isLoading: true,
    setIsLoading: () => {},
  });

  const addFavoriteMovie = (movie) =>
    setFavoriteMovies((prevState) => [...prevState, movie]);

  const removeFavoriteMovie = (index) => {
    setFavoriteMovies((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  return (
    //Provide context and values
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        favoriteMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
        isLoading,
        setIsLoading,
      }}
    >
      <Home />
      <ToastContainer />
    </MovieContext.Provider>
  );
}
