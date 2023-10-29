import MovieCard from "../MovieCard/MovieCard";
import './MoviesList.css';
import { MovieContext } from "../../App";
import { useContext } from "react";


export default function MoviesList() {
  const { movies, setMovies } = useContext(MovieContext);
  console.log(movies);

  return (
    <div className="movies-container">
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies?.map((movie, index) => (
            <MovieCard key={index} props={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
