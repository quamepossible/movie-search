import React, { Fragment, useEffect, useContext } from "react";
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
  const { nextPage, handleFetching, setHandleFetching } = pageNumber;
  const { loadingDone, errorLoading } = handleFetching;

  const URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023";
  const fetchMovies = useFetchHook(URL);

  useEffect(() => {
    if (!fetchMovies) {
      setHandleFetching((prev) => ({ ...prev, errorLoading: true }));
      return;
    }
    const { results, total_pages, total_results } = fetchMovies;
    addMovies(results, { total_pages, total_results });
    console.log(fetchMovies);

    if (!results) {
      setHandleFetching((prev) => ({ ...prev, errorLoading: true }));
      return;
    }
    changeURL(URL);
    setHandleFetching({ loadingDone: true, errorLoading: false });
  }, [addMovies, fetchMovies, changeURL, nextPage, setHandleFetching]);

  console.log("HOME PAGE");
  return (
    <Fragment>
      <Navigation />
      {errorLoading && loadingDone && (
        <p className={styles["no-conn"]}>
          There was an error with your request. <br /> Check your internet
          connection and try refreshing the page.
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
    </Fragment>
  );
};

export default Home;
