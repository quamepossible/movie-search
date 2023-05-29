import { createContext, useReducer, useCallback, useState } from "react";

const PageNumberCtx = createContext({
  pageNumber: null,
  nextPage: () => {},
  resetPage: () => {},
});

const PageNumberState = {
  page: 1,
};

const pageReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return {
        page: state.page + 1,
      };
    case "DEFAULT":
      return PageNumberState;
    default:
      return state;
  }
};

const PaginationProvider = (props) => {
  const [page, dispatchNumbering] = useReducer(pageReducer, PageNumberState);
  const [handleFetching, setHandleFetching] = useState({loadingDone: false, errorLoading: false});
  const [emptyResults, setEmptyResults] = useState(false);
  const [clickedMovie, setClickedMovie] = useState({});

  const nextPage = useCallback(() => {
    dispatchNumbering({ type: "INCREASE" });
  }, []);

  const resetPage = useCallback(() => {
    dispatchNumbering({ type: "DEFAULT" });
  }, []);

  const pagination = {
    pageNumber: page.page,
    nextPage,
    resetPage,
    handleFetching,
    setHandleFetching,
    emptyResults,
    setEmptyResults,
    clickedMovie,
    setClickedMovie,
  };

  return (
    <PageNumberCtx.Provider value={pagination}>
      {props.children}
    </PageNumberCtx.Provider>
  );
};

export default PaginationProvider;
export { PageNumberCtx };
