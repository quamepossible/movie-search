import React, {
  Fragment,
  useEffect,
  useContext,
  useState,
} from "react";
import MoviesCtx from "../stores/movies-context";
import { PageNumberCtx } from "../stores/pagination/page-number";

import useFetchHook from "../Hooks/fetch-hook";
import Navigation from "./NAV/Navigations";
import Body from "./BODY/Body";
import styles from './Home.module.css'
import spinner from "../assets/spinner.svg";


const Home = () => {
  const [loadFinished, setLoadFinished] = useState(false);
  const allMoviesCtx = useContext(MoviesCtx);
  const { addMovies, changeURL } = allMoviesCtx;

  const pageNumber = useContext(PageNumberCtx);
  const { nextPage } = pageNumber;

  const URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023";
  const fetchMovies = useFetchHook(URL);
  useEffect(() => {
    if (!fetchMovies) return;
    const { results, total_pages, total_results } = fetchMovies;
    addMovies(results, { total_pages, total_results });
    changeURL(URL);
    setLoadFinished(true);
    nextPage();
  }, [addMovies, fetchMovies, changeURL, nextPage]);

  return (
    <Fragment>
      <Navigation />
      {!loadFinished && <div className={styles["hold-spinner"]}>
        <img src={spinner} alt="spinner" className={styles.spinner} />
        <p className={styles["loading-text"]}>Loading Movies... please wait.</p>
      </div>}
      {loadFinished && <Body />}
    </Fragment>
  );
};

export default Home;
