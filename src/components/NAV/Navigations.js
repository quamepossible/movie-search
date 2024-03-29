import React, { useEffect, useState, useContext } from "react";
import MoviesCtx from "../../stores/movies-context";
import { PageNumberCtx } from "../../stores/pagination/page-number";
import useFetchHook from "../../Hooks/fetch-hook";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const allMoviesCtx = useContext(MoviesCtx);
  const pageNumbering = useContext(PageNumberCtx);

  const {
    resetPage,
    pageNumber,
    setHandleFetching,
    emptyResults,
    setEmptyResults,
  } = pageNumbering;

  const { addMovies, changeURL } = allMoviesCtx;
  const [query, setQuery] = useState("");

  const searchMovieHandler = (e) => {
    setQuery(e.target.value);
  };

  const filterChangeHandler = function (e, action = null) {
    // remove empty results notice
    setEmptyResults(false);
    const query = e.target.value;
    let fullQuery;
    const urlParam = query === "low" ? "asc" : "desc";
    if (action === "rating") {
      fullQuery = `sort_by=vote_average.${urlParam}`;
    }
    if (action === "popular") {
      fullQuery = `sort_by=popularity.${urlParam}`;
    }
    if (action === "year") {
      fullQuery = `primary_release_year=${query}`;
    }
    // show loading spinner
    setHandleFetching({ errorLoading: false, loadingDone: false });
    // 1. fetch movie using this year value
    const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&${fullQuery}`;
    filterSearch(URL).then((moviesData) => {
      console.log(moviesData);
      if (!moviesData) {
        setHandleFetching({ loadingDone: true, errorLoading: true });
        return;
      }
      const { results, total_pages, total_results } = moviesData;
      // 2. update movies array
      addMovies(results, { total_pages, total_results }, true);
      // 3. change current URL
      changeURL(URL);
      // 4. reset page number
      resetPage();
      // hide loading spinner
      setHandleFetching({ errorLoading: false, loadingDone: true });
      if (results.length === 0) {
        setEmptyResults(true);
      } else setEmptyResults(false);
    });
  };

  // FILTER SEARCHES
  const filterSearch = async (url) => {
    try {
      const fetchMovies = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
        },
      });
      if (!fetchMovies) throw Error("Couldn't run filter search");
      const moviesFound = await fetchMovies.json();
      return moviesFound;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };

  // FETCH MOVIES;
  const URL = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const fetchMovies = useFetchHook(URL);

  useEffect(() => {
    setEmptyResults(false);
    let typeTimer;
    if (query.length > 0) {
      setHandleFetching((prev) => ({ ...prev, loadingDone: false }));
      typeTimer = setTimeout(() => {
        console.log("reset page number");
        resetPage();
        if (!fetchMovies) {
          setHandleFetching({ loadingDone: true, errorLoading: true });
          return;
        }
        if (query.length === 0) {
          console.log("empty field");
          return;
        }
        console.log(fetchMovies);
        const { results, total_pages, total_results } = fetchMovies;
        addMovies(results, { total_pages, total_results }, true);
        changeURL(URL);
        setHandleFetching({ errorLoading: false, loadingDone: true });
        if (results.length === 0) setEmptyResults(true);
      }, 500);
    } else {
      console.log("empty search");
    }
    return () => {
      setHandleFetching({ errorLoading: false, loadingDone: true });
      clearTimeout(typeTimer);
      setEmptyResults(false);
    };
  }, [
    addMovies,
    fetchMovies,
    query,
    changeURL,
    URL,
    resetPage,
    setHandleFetching,
    setEmptyResults,
  ]);

  return (
    <div className={`${styles["nav-form"]} row`}>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={`${styles["hold-search"]} center row`}>
          <input
            onChange={searchMovieHandler}
            type="text"
            className={`${styles["search-input"]}`}
            placeholder="Type to search for movies...."
          />
          <button className={`${styles.reload}`} type="button">
              <ion-icon name="refresh-outline" className='center'></ion-icon>
          </button>
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
                  onChange={(e) => filterChangeHandler(e, "year")}
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
                  onChange={(e) => filterChangeHandler(e, "rating")}
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
                <select
                  type="text"
                  className={styles["filter-input"]}
                  onChange={(e) => filterChangeHandler(e, "popular")}
                >
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
