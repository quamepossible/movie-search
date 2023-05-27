import { useState, useReducer, useCallback } from "react";
import MoviesCtx from "./movies-context";

const initialMoviesState = {
  movies: [],
  pages: 0,
  currentPage: 0,
  resultsAmt: 0,
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD-MOVIE":
      return {
        ...state,
        movies: [...state.movies, ...action.movies],
        currentPage: state.currentPage + 1,
      };
    case "PAGES":
      return {
        ...state,
        pages: action.qty.total_pages,
        resultsAmt: action.qty.total_results,
      };
    case "CUSTOM":
      return {
        movies: [...action.qty.newMovies],
        pages: action.qty.total_pages,
        currentPage: 0,
        resultsAmt: action.qty.total_results,
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
      console.log(pages);
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

  const ctxValues = {
    movies: moviesState.movies,
    totalMovies: moviesState.resultsAmt,
    totalPages: moviesState.pages,
    currentPage: moviesState.currentPage,
    addMovies,
  };
  return (
    <MoviesCtx.Provider value={ctxValues}>{props.children}</MoviesCtx.Provider>
  );
};

export default MoviesProvider;
