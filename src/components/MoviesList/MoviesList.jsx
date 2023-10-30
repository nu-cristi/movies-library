import MovieCard from "../MovieCard/MovieCard";
import "./MoviesList.css";
import { MovieContext } from "../../App";
import { useContext } from "react";

export default function MoviesList({ props: favoriteClicked }) {
  const { movies, favoriteMovies, setMovies } = useContext(MovieContext);
  console.log(favoriteMovies);

  return (
    <div className="movies-container">
      {favoriteClicked ? (
        <>
          {favoriteMovies?.length > 0 ? (
            <div className="movies-grid">
              {movies?.map((movie, index) => (
                <MovieCard key={index} props={movie} />
              ))}
            </div>
          ) : (
            <>You do not have any favorite movies yet</>
          )}
        </>
      ) : (
        <>
          {movies.length > 0 && (
            <div className="movies-grid">
              {movies?.map((movie, index) => (
                <MovieCard key={index} props={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
