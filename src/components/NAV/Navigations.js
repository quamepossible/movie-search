import React, { useEffect, useState, useContext } from "react";
import MoviesCtx from "../../stores/movies-context";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const allMoviesCtx = useContext(MoviesCtx);
  const { addMovies } = allMoviesCtx;
  const [query, setQuery] = useState("");
  const searchMovieHandler = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const typeTimer = setTimeout(() => {
      if (query.length === 0) return;
      (async function () {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
          },
        };
        const fetchURL = `https://api.themoviedb.org/3/search/movie?query=${query}`;
        const fetchInitMovies = await fetch(fetchURL, options);
        const moviesResults = await fetchInitMovies.json();
        const { results, total_pages, total_results } = moviesResults;
        console.log(results);
        addMovies(results, { total_pages, total_results }, true);
      })();
    }, 500);
    return () => clearTimeout(typeTimer);
  }, [query, addMovies]);

  return (
    <div className={`${styles["nav-form"]} row`}>
      <form className={styles.form}>
        <div className={`${styles["hold-search"]} center`}>
          <input
            onChange={searchMovieHandler}
            type="txt"
            className={`${styles["search-input"]}`}
            placeholder="Type to search for movies...."
          />
          <button className={styles.reload}>REFRESH</button>
        </div>
      </form>
      <div className={styles["filter"]}>
        <div className={`${styles["hold-filter"]} row`}>
          <div className={styles["hold-filter-lists"]}>
            <div className={styles["filter-list"]}>
              <div className={styles["filter-text"]}>
                <p>Year:</p>
              </div>
              <div className={styles["filter-selection"]}>
                <select type="text" className={styles["filter-input"]}>
                  <option value="">All</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles["hold-filter-lists"]}>
            <div className={styles["filter-list"]}>
              <div className={styles["filter-text"]}>
                <p>Rating:</p>
              </div>
              <div className={styles["filter-selection"]}>
                <select type="text" className={styles["filter-input"]}>
                  <option value="">All</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles["hold-filter-lists"]}>
            <div className={styles["filter-list"]}>
              <div className={styles["filter-text"]}>
                <p>Order By:</p>
              </div>
              <div className={styles["filter-selection"]}>
                <select type="text" className={styles["filter-input"]}>
                  <option value="">All</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
