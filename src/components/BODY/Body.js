import React, { useContext, useState } from "react";
import MoviesCtx from "../../stores/movies-context";
import { PageNumberCtx } from "../../stores/pagination/page-number";

import Movie from "./Movie";
import spinner from "../../assets/spinner.svg";
import styles from "./Body.module.css";

const Body = () => {
  const [loadMore, setLoadMore] = useState(false);

  const pageNumbering = useContext(PageNumberCtx);
  const { nextPage, pageNumber } = pageNumbering;

  const allMoviesCtx = useContext(MoviesCtx);
  const { movies, totalMovies, totalPages, addMovies, DEFAULT_URL } =
    allMoviesCtx;

  const endOfPage = pageNumber + 1 > totalPages;

  const moviesList = movies.map((movie) => {
    const { id, release_date, vote_average: rate, poster_path, title } = movie;
    const getYear = isNaN(release_date)
      ? new Date(release_date).getFullYear()
      : "NA";
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
    setLoadMore(true);
    const fetchURL = `${DEFAULT_URL}&page=${pageNumber + 1}`;
    try {
      const fetchInitMovies = await fetch(fetchURL, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
        },
      });

      if(!fetchInitMovies) throw new Error ('Request Error');
      const moviesResults = await fetchInitMovies.json();
      const { results } = moviesResults;
      console.log(moviesResults);
      addMovies(results);
      nextPage();
      setLoadMore(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className={`${styles["hold-movies"]} row`}>{moviesList}</div>

      {loadMore && (
        <div className={styles["extra-load"]}>
          <img src={spinner} alt="spinner" className={styles.spinner} />
        </div>
      )}

      {!loadMore && (
        <div className={styles["load-more"]}>
          {!endOfPage && (
            <p>
              <button onClick={loadMoreHandler} disabled={endOfPage}>
                LOAD MORE
              </button>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Body;
