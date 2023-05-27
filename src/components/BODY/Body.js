import React, { useContext, useState } from "react";
import MoviesCtx from "../../stores/movies-context";

import Movie from "./Movie";
import spinner from "../../assets/spinner.svg";
import styles from "./Body.module.css";

const Body = () => {
  const [loadMore, setLoadMore] = useState();
  const [] = useState();

  const allMoviesCtx = useContext(MoviesCtx);
  const { movies, totalMovies, totalPages, currentPage, addMovies } =
    allMoviesCtx;
  const moviesList = movies.map((movie) => {
    const { id, release_date, vote_average: rate, poster_path, title } = movie;
    const getYear = isNaN(release_date) ? new Date(release_date).getFullYear() : 'NA';
    return (
      <Movie
        key={id}
        title={title}
        imgSrc={poster_path}
        rating={rate}
        year={getYear}
      />
    );
  });

  const loadMoreHandler = async () => {
    console.log(currentPage);
    setLoadMore(true);
    // pageNumber > totalPages && setLoadFinished(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
      },
    };
    const fetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023&page=${currentPage+1}`;
    const fetchInitMovies = await fetch(fetchURL, options);
    const moviesResults = await fetchInitMovies.json();
    const { results } = moviesResults;
    console.log(results);
    addMovies(results);
  };

  return (
    <>
      <div className={styles["hold-spinner"]}>
        <img src={spinner} alt="spinner" className={styles.spinner} />
        <p className={styles["loading-text"]}>Loading Movies... please wait.</p>
      </div>

      <div className={`${styles["hold-movies"]} row`}>{moviesList}</div>
      <div className={styles["extra-load"]}>
        <img src={spinner} alt="spinner" className={styles.spinner} />
      </div>

      <div className={styles["load-more"]}>
        <p>
          <button onClick={loadMoreHandler}>LOAD MORE</button>
        </p>
      </div>
    </>
  );
};

export default Body;
