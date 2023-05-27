import React, { useEffect, useState, useContext } from "react";
import MoviesCtx from "../../stores/movies-context";
import { PageNumberCtx } from "../../stores/pagination/page-number";
import useFetchHook from "../../Hooks/fetch-hook";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const allMoviesCtx = useContext(MoviesCtx);
  const pageNumbering = useContext(PageNumberCtx);

  const { resetPage, pageNumber } = pageNumbering;

  const { addMovies, changeURL } = allMoviesCtx;
  const [query, setQuery] = useState("");
  const searchMovieHandler = (e) => {
    setQuery(e.target.value);
  };

  const URL = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const fetchMovies = useFetchHook(URL);
  useEffect(() => {
    const typeTimer = setTimeout(() => {
      console.log("reset page number");
      resetPage();
      if (!fetchMovies) return;
      if (query.length === 0) {
        return;
      }
      console.log(fetchMovies);
      const { results, total_pages, total_results } = fetchMovies;
      addMovies(results, { total_pages, total_results }, true);
      changeURL(URL);
    }, 500);
    return () => clearTimeout(typeTimer);
  }, [addMovies, fetchMovies, query, changeURL, URL, resetPage]);

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
