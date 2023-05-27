import { useReducer, useCallback } from "react";
import MoviesCtx from "./movies-context";

const initialMoviesState = {
  movies: [],
  pages: 0,
  resultsAmt: 0,
  defaultURL: null,
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD-MOVIE":
      return {
        ...state,
        movies: [...state.movies, ...action.movies],
      };
    case "PAGES":
      return {
        ...state,
        pages: action.qty.total_pages,
        resultsAmt: action.qty.total_results,
      };
    case "CUSTOM":
      return {
        ...state,
        movies: [...action.qty.newMovies],
        pages: action.qty.total_pages,
        resultsAmt: action.qty.total_results,
      };
    case "URL":
      return {
        ...state,
        defaultURL: action.url,
      };
  
    default:
      return state;
  }
};

const MoviesProvider = (props) => {
  const [moviesState, dispatchMoviesState] = useReducer(
    moviesReducer,
    initialMoviesState
  );

  const addMovies = useCallback((newMovies, pages = null, custom = null) => {
    if (custom) {
      const { total_pages, total_results } = pages;
      dispatchMoviesState({
        type: "CUSTOM",
        qty: { total_pages, total_results, newMovies },
      });
      return;
    }
    dispatchMoviesState({ type: "ADD-MOVIE", movies: newMovies });
    if (pages) {
      const { total_pages, total_results } = pages;
      dispatchMoviesState({
        type: "PAGES",
        qty: { total_pages, total_results },
      });
    }
  }, []);

  const setCurrentURL = useCallback((url) => {
    dispatchMoviesState({ type: "URL", url });
  }, []);


  const ctxValues = {
    movies: moviesState.movies,
    totalMovies: moviesState.resultsAmt,
    totalPages: moviesState.pages,
    addMovies,
    changeURL: setCurrentURL,
    DEFAULT_URL: moviesState.defaultURL,
  };
  return (
    <MoviesCtx.Provider value={ctxValues}>{props.children}</MoviesCtx.Provider>
  );
};

export default MoviesProvider;
