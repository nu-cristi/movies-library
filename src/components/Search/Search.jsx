import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../../App";
import { BASE_URL } from "../../pages/Home/Home";
import axios from "axios";
import { ReactComponent as BonesSvg } from "../../icons/bones.svg";
import "./Search.css";
import { toast } from "react-toastify";

//TMDB api base url for querying used for search
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";

export default function Search() {
  const { movies, setMovies } = useContext(MovieContext);
  const [searchValue, setSearchValue] = useState("");
  let searchUrl =
    SEARCH_URL + `${searchValue}&api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    async function getSearchMovies() {
      //Fetch category data when search is empty
      if (!searchValue) {
        searchUrl =
          BASE_URL + `top_rated?api_key=${process.env.REACT_APP_API_KEY}`;
      }
      try {
        const response = await axios.get(searchUrl);
        const { data } = response;
        setMovies(data.results);
      } catch (error) {
        console.log(error);
        toast.error("An error has occured", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
    getSearchMovies();
  }, [searchValue]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleSearch}
        value={searchValue}
      ></input>
      <div className="reset-search">
        {/* Clear search field */}
        <BonesSvg onClick={() => setSearchValue("")} />
      </div>
    </div>
  );
}
