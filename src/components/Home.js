import React, {useEffect, useContext } from "react";

import MoviesCtx from "../stores/movies-context";
import { PageNumberCtx } from "../stores/pagination/page-number";
import useFetchHook from "../Hooks/fetch-hook";
import Navigation from "./NAV/Navigations";
import Body from "./BODY/Body";
import styles from "./Home.module.css";
import spinner from "../assets/spinner.svg";

const Home = () => {
  const allMoviesCtx = useContext(MoviesCtx);
  const { addMovies, changeURL } = allMoviesCtx;

  const pageNumber = useContext(PageNumberCtx);
  const {
    nextPage,
    handleFetching,
    setHandleFetching,
    emptyResults,
    setEmptyResults,
  } = pageNumber;
  const { loadingDone, errorLoading } = handleFetching;

  const URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&release_date.gte=2023";
  const fetchMovies = useFetchHook(URL);

  useEffect(() => {
    setEmptyResults(false);
    console.log(fetchMovies);
    if (!fetchMovies) {
      console.log('unable to fetch');
      setHandleFetching({ loadingDone: true, errorLoading: true });
      return;
    }
    const { results, total_pages, total_results } = fetchMovies;
    if (!results) {
      setHandleFetching({ loadingDone: true, errorLoading: true });
      return;
    }
    if (results.length === 0) setEmptyResults(true);
    addMovies(results, { total_pages, total_results });
    console.log(fetchMovies);

    changeURL(URL);
    setHandleFetching({ loadingDone: true, errorLoading: false });
    return () => {
      setHandleFetching({ loadingDone: true, errorLoading: true });
    };
  }, [
    addMovies,
    fetchMovies,
    changeURL,
    nextPage,
    setHandleFetching,
    setEmptyResults,
  ]);

  return (
    <div className={styles["container"]}>
      <Navigation />
      {errorLoading && loadingDone && (
        <p className={styles["no-conn"]}>
          There was an error with your request. <br /> Check your internet
          connection and try refreshing the page.
        </p>
      )}

      {emptyResults && (
        <p style={{ color: "white", textAlign: "center", fontSize: "23px" }}>
          🚫 No Movies found
        </p>
      )}

      {!loadingDone && !errorLoading && (
        <div className={styles["hold-spinner"]}>
          <img src={spinner} alt="spinner" className={styles.spinner} />
          <p className={styles["loading-text"]}>
            Loading Movies... please wait.
          </p>
        </div>
      )}
      {loadingDone && !errorLoading && <Body />}
    </div>
  );
};

export default Home;
