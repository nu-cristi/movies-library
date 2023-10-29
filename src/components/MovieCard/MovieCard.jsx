import "./MovieCard.css";
import { ReactComponent as WandSvg } from "../../icons/wand.svg";

export default function MovieCard({ props }) {
  // console.log(props);
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
        <div className="add-to-favorites">
          <span>Add to favorites</span>
          <WandSvg />
        </div>
      </div>
    </div>
  );
}
