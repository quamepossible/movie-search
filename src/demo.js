const redux = require("redux");

const storeReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = redux.createStore(storeReducer);

store.dispatch({type: 'increment'})
store.dispatch({type: 'increment'})
console.log(store.getState());