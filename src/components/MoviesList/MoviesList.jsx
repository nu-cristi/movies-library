import MovieCard from "../MovieCard/MovieCard";
import "./MoviesList.css";
import { MovieContext } from "../../App";
import { useContext } from "react";

export default function MoviesList({ props: favoriteClicked }) {
  const { movies, favoriteMovies } = useContext(MovieContext);

  return (
    <div className="movies-container">
      {/* Display categories or favorites tab */}
      {favoriteClicked ? (
        <>
          {favoriteMovies?.length > 0 ? (
            <div className="movies-grid">
              {favoriteMovies?.map((movie, index) => (
                <MovieCard key={index} props={{movie, favoriteClicked}} />
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
                <MovieCard key={index} props={{movie, favoriteClicked}} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
