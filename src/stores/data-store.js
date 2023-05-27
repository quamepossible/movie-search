import { createStore } from "redux";

const storeReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "increase":
      return {
        counter: state.counter + 1,
      };
    case "decrease":
      return {
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

const store = createStore(storeReducer);
export default store;
