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

export const BASE_URL = "https://api.themoviedb.org/3/movie/";

export default function Home() {
  const screenSize = useScreenSize();
  const { movies, setMovies } = useContext(MovieContext);
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

  function handleClick(e) {
    setIsClicked(false);
    setCategory({
      category: e.target.dataset.value,
      name: e.target.innerText,
    });
  }

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          BASE_URL +
            `${category.category}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const { data } = response;
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
    return () => {};
  }, [category.category]);

  return (
    <div className="container">
      <div className="bats-header">
        <BatsSvg />
      </div>
      <div className="filter-container">
        <Search />
        <div className="favorites-button" onClick={()=>setFavoriteClicked(true)}>Favorites</div>
      </div>
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
      <MoviesList props={favoriteClicked}/>
      <div className="graveyard-footer">
        <GraveyardSvg />
      </div>
    </div>
  );
}
