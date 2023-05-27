import MoviesProvider from "./stores/MoviesProvider";
import PaginationProvider from "./stores/pagination/page-number";
import Home from "./components/Home";

import Modal from "./components/MODAL/Modal";

function App() {
  return (
    <MoviesProvider>
      <PaginationProvider>
        <Home />
      </PaginationProvider>
    </MoviesProvider>
  );
}

export default App;
