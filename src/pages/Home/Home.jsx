import { useState, useContext, useEffect } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { ReactComponent as GraveyardSvg } from "../../icons/graveyard.svg";
import { ReactComponent as BatsSvg } from "../../icons/bats.svg";
import { MovieContext } from "../../App";
import "./Home.css";
import Search from "../../components/Search/Search";
import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3/movie/";

export default function Home() {
  const { movies, setMovies } = useContext(MovieContext);
  const [category, setCategory] = useState("top_rated");

  console.log(movies);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          BASE_URL + `${category}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const { data } = response;
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
    return () => {};
  }, [category]);


  return (
    <div>
      <div className="bats-header">
        <BatsSvg />
      </div>
      <Search/>
      <div className="categories">
        <div onClick={() => setCategory("top_rated")}>Top Rated</div>
        <div onClick={() => setCategory("popular")}>Popular</div>
        <div onClick={() => setCategory("upcoming")}>Upcoming</div>
      </div>
      <MoviesList />
      <div className="graveyard-footer">
        <GraveyardSvg />
      </div>
    </div>
  );
}
