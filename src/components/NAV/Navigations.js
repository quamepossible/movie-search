import React, { useEffect, useState, useContext } from "react";
import MoviesCtx from "../../stores/movies-context";
import { PageNumberCtx } from "../../stores/pagination/page-number";
import useFetchHook from "../../Hooks/fetch-hook";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const allMoviesCtx = useContext(MoviesCtx);
  const pageNumbering = useContext(PageNumberCtx);

  const { resetPage, pageNumber, handleFetching, setHandleFetching } =
    pageNumbering;
  const { loadingDone, errorLoading } = handleFetching;

  const { addMovies, changeURL } = allMoviesCtx;
  const [query, setQuery] = useState("");

  const searchMovieHandler = (e) => {
    setQuery(e.target.value);
  };

  const yearChangeHandler = (e) => {
    const year = e.target.value;
    // show loading spinner
    setHandleFetching((prev) => ({ ...prev, loadingDone: false }));
    // 1. fetch movie using this year value
    const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&primary_release_year=${year}`;
    filterSearch(URL).then((moviesData) => {
      const { results, total_pages, total_results } = moviesData;
      console.log(moviesData);
      // 2. update movies array
      addMovies(results, { total_pages, total_results }, true);
      // 3. change current URL
      changeURL(URL);
      // 4. reset page number
      resetPage();
      // hide loading spinner
      setHandleFetching((prev) => ({ ...prev, loadingDone: true }));
    });
  };
  const ratingsChangeHandler = function(e, popular = false){
    const rating = e.target.value;
    console.log(popular);
    let fullQuery;
    const urlParam = rating === "low" ? "asc" : "desc";
    if (!popular) {
      fullQuery = `sort_by=vote_average.${urlParam}`;
    }
    else{
      fullQuery = `sort_by=popularity.${urlParam}`;
    }
    // show loading spinner
    setHandleFetching((prev) => ({ ...prev, loadingDone: false }));
    // 1. fetch movie using this year value
    const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&${fullQuery}`;
    filterSearch(URL).then((moviesData) => {
      const { results, total_pages, total_results } = moviesData;
      console.log(moviesData);
      // 2. update movies array
      addMovies(results, { total_pages, total_results }, true);
      // 3. change current URL
      changeURL(URL);
      // 4. reset page number
      resetPage();
      // hide loading spinner
      setHandleFetching((prev) => ({ ...prev, loadingDone: true }));
    });
  };

  // FILTER SEARCHES
  const filterSearch = async (url) => {
    const fetchMovies = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
      },
    });
    const moviesFound = await fetchMovies.json();
    return moviesFound;
  };

  // FETCH MOVIES;
  const URL = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const fetchMovies = useFetchHook(URL);

  useEffect(() => {
    let typeTimer;
    if (query.length > 0) {
      setHandleFetching((prev) => ({ ...prev, loadingDone: false }));
      typeTimer = setTimeout(() => {
        console.log("reset page number");
        resetPage();
        if (!fetchMovies) return;
        if (query.length === 0) {
          console.log("empty field");
          return;
        }
        console.log(fetchMovies);
        const { results, total_pages, total_results } = fetchMovies;
        addMovies(results, { total_pages, total_results }, true);
        changeURL(URL);
        setHandleFetching((prev) => ({ ...prev, loadingDone: true }));
      }, 500);
    } else {
      console.log("empty search");
    }
    return () => {
      setHandleFetching({ errorLoading: false, loadingDone: true });
      clearTimeout(typeTimer);
    };
  }, [
    addMovies,
    fetchMovies,
    query,
    changeURL,
    URL,
    resetPage,
    setHandleFetching,
  ]);

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
                <select
                  type="text"
                  className={styles["filter-input"]}
                  onChange={yearChangeHandler}
                >
                  <option value="">All</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
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
                <select
                  type="text"
                  className={styles["filter-input"]}
                  onChange={ratingsChangeHandler}
                >
                  <option value="">All</option>
                  <option value="high">High to Low</option>
                  <option value="low">Low to High</option>
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
                <select type="text" className={styles["filter-input"]} onChange={(e) => ratingsChangeHandler(e, true)}>
                  <option value="">All</option>
                  <option value="high">High Popularity</option>
                  <option value="low">Low Popularity</option>
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
