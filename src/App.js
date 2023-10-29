import Home from "./pages/Home/Home";
import { createContext, useState, useContext, useMemo } from "react";

export const MovieContext = createContext();

export default function App() {
  const [movies, setMovies] = useState({
    movies: [],
    setMovies: () => {},
  });

  return (
    <MovieContext.Provider value={{movies, setMovies}}>
      <Home />
    </MovieContext.Provider>
  );
}
