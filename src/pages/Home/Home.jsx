import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState();
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`
  );
  console.log(data);
  return <div></div>;
}
