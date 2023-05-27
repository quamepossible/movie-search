import React, { Fragment, useEffect, useContext, useCallback, useState } from "react";
import MoviesCtx from "../stores/movies-context";
import Navigation from "./NAV/Navigations";
import Body from "./BODY/Body";

const Home = () => {
  const [loadFinished, setLoadFinished] = useState(false);
  const allMoviesCtx = useContext(MoviesCtx);
  const { addMovies } = allMoviesCtx;

  // fetch function
  const fetchMovies = useCallback(async () => {
    const fetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023`;
    const fetchInitMovies = await fetch(fetchURL, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
      },
    });
    const moviesResults = await fetchInitMovies.json();

    const { results, total_pages, total_results } = moviesResults;
    addMovies(results, { total_pages, total_results });
    setLoadFinished(true);
  }, [addMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <Fragment>
      <Navigation />
      {loadFinished && <Body />}
    </Fragment>
  );
};

export default Home;
