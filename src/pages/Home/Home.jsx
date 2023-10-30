import { useState, useContext, useEffect } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { ReactComponent as GraveyardSvg } from "../../icons/graveyard.svg";
import { ReactComponent as ArrowDownSvg } from "../../icons/arrow-down.svg";
import { ReactComponent as BatsSvg } from "../../icons/bats.svg";
import { MovieContext } from "../../App";
import "./Home.css";
import Search from "../../components/Search/Search";
import axios from "axios";
import useScreenSize from "../../hooks/useScreenSize";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";

//TMDB Api base url used for fetching data
export const BASE_URL = "https://api.themoviedb.org/3/movie/";

export default function Home() {
  // Hook used to calculate the size of the screen
  const screenSize = useScreenSize();
  const { setMovies, isLoading, setIsLoading } = useContext(MovieContext);
  const [category, setCategory] = useState({
    category: "top_rated",
    name: "Top Rated",
  });
  const [isClicked, setIsClicked] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const allCategories = [
    { category: "top_rated", name: "Top Rated" },
    { category: "popular", name: "Popular" },
    { category: "upcoming", name: "Upcoming" },
  ];

  //Handle for category change
  function handleClick(e) {
    setFavoriteClicked(false);
    setIsClicked(false);
    setCategory({
      category: e.target.dataset.value,
      name: e.target.innerText,
    });
  }

  //Fetch movies
  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          BASE_URL +
            `${category.category}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const { data } = response;
        setMovies(data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        toast.error("An error has occured", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          theme: "dark",
        });
        console.log(error);
      }
    }
    getMovies();
  }, [category.category]);

  return (
    <div className="container">
      <div className="bats-header">
        <BatsSvg />
      </div>
      <div className="filter-container">
        <Search />
        <div
          className="favorites-button"
          onClick={() => setFavoriteClicked(true)}
        >
          Favorites
        </div>
      </div>
      {/* Conditional render based on screen size */}
      <div className="categories">
        {screenSize.width < 798 ? (
          <div>
            <div
              data-value={category.category}
              onClick={() => setIsClicked(!isClicked)}
            >
              {category.name}
              <ArrowDownSvg className="arrow-down" />
            </div>
            {isClicked && (
              <div className="categories-submenu">
                {allCategories.map((item, index) => (
                  <div
                    data-value={item.category}
                    key={index}
                    onClick={handleClick}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {allCategories.map((item, index) => (
              <div data-value={item.category} key={index} onClick={handleClick}>
                {item.name}
              </div>
            ))}
          </>
        )}
      </div>
      {!isLoading ? (
        <MoviesList props={favoriteClicked} />
      ) : (
        <div className="position-center">
          <Spinner />
        </div>
      )}
      <div className="graveyard-footer">
        <GraveyardSvg />
      </div>
    </div>
  );
}
