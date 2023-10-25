import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieCategories({ props: { categoryTitle, url } }) {
  const [allMovies, setAllMovies] = useState();

  useEffect(() => {
    console.log(url);
    if (!url) return;
    async function getMovies() {
      try {
        const response = await axios.get(
          url + `?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const { data } = response;
        setAllMovies(data);
      } catch (error) {
        console.log(error)
      }
    }
    getMovies();
    return () => {};
  }, [url]);

  return (
    <div>
      <div>{categoryTitle}</div>
      {allMovies && (
        <div>
          {allMovies.results?.map((movie, index) => (
            <MovieCard key={index} props={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
