import "./MovieCard.css";
import { useState, useContext } from "react";
import { ReactComponent as WandSvg } from "../../icons/wand.svg";
import { MovieContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieCard({ props }) {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useContext(MovieContext);
  const { movie, favoriteClicked } = props;

  function addToFavorites(e) {
    //Get movie data from parent
    const movieToAdd = {
      title: e.currentTarget.parentNode.querySelector("h1").innerText,
      release_date: e.currentTarget.parentNode.querySelector("h3").innerText,
      poster_path: e.currentTarget.parentNode.parentNode.querySelector("img").src,
    };

    for (const favoriteMovie of favoriteMovies) {
      if (favoriteMovie.title === movieToAdd.title) {
        toast.warn(`You have already added ${movieToAdd.title} to your list!`, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
        return;
      }
    }

    addFavoriteMovie(movieToAdd);
  }

  function removeFromFavorites(e) {
    // Find movie title in state and remove
    const title = e.currentTarget.parentNode.querySelector("h1").innerText;
    removeFavoriteMovie(
      favoriteMovies.findIndex((movie) => movie.title === title)
    );
  }

  return (
    <div className="card">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          className="movie-poster"
          alt="Picture not found"
        />
      </div>
      <div className="text">
        <h1>{movie.title}</h1>
        <h3>{movie.release_date}</h3>
        {/* Conditional add/remove button render based on favorites tab */}
        {favoriteClicked ? (
          <>
            <div className="add-to-favorites" onClick={removeFromFavorites}>
              <span>Remove</span>
              <WandSvg />
            </div>
          </>
        ) : (
          <>
            <div className="add-to-favorites" onClick={addToFavorites}>
              <span>Add to favorites</span>
              <WandSvg />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
