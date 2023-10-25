import { useState } from "react";
import MovieCategories from "../../components/MovieCategories/MovieCategories";

const requests = {
  topRatedMoviesRequest: "https://api.themoviedb.org/3/movie/top_rated",
  popularMoviesRequest: "https://api.themoviedb.org/3/movie/popular",
  upcomingMoviesRequest: "https://api.themoviedb.org/3/movie/upcoming",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const movieProps = [
    {
      categoryTitle: "Top Rated",
      url: requests.topRatedMoviesRequest,
    },
    {
      categoryTitle: "Popular",
      url: requests.popularMoviesRequest,
    },
    {
      categoryTitle: "Upcoming",
      url: requests.upcomingMoviesRequest,
    },
  ];

  return (
    <div>
      {movieProps.map((props, index) => (
        <MovieCategories key={index} props={props} />
      ))}
    </div>
  );
}
