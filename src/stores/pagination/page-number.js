import { createContext, useReducer, useCallback } from "react";

const PageNumberCtx = createContext({
  pageNumber: 0,
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
  };

  return (
    <PageNumberCtx.Provider value={pagination}>
      {props.children}
    </PageNumberCtx.Provider>
  );
};

export default PaginationProvider;
export { PageNumberCtx };
