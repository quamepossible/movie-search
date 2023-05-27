import { useContext } from "react";
import MoviesProvider from "./stores/MoviesProvider";
import Home from "./components/Home";
import MoviesCtx from "./stores/movies-context";


function App() {
  return (
    <MoviesProvider>
      <Home/>
    </MoviesProvider>
  );
}

export default App;
