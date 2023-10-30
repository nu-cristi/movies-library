import "./MovieCard.css";
import { useState, useContext } from "react";
import { ReactComponent as WandSvg } from "../../icons/wand.svg";
import { MovieContext } from "../../App";

export default function MovieCard({ props }) {
  const { favoriteMovies, addFavoriteMovie } = useContext(MovieContext);
  console.log(favoriteMovies);

  function addToFavorites(e) {
    const title = e.currentTarget.parentNode.querySelector("h1").innerText;
    const date = e.currentTarget.parentNode.querySelector("h3").innerText;
    const img = e.currentTarget.parentNode.parentNode.querySelector("img").src;
    addFavoriteMovie({ title: title, date: date, img: img });
  }

  return (
    <div className="card">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w185/${props.poster_path}`}
          className="movie-poster"
        />
      </div>
      <div className="text">
        <h1>{props.title}</h1>
        <h3>{props.release_date}</h3>
        <div className="add-to-favorites" onClick={addToFavorites}>
          <span>Add to favorites</span>
          <WandSvg />
        </div>
      </div>
    </div>
  );
}
