import MoviesProvider from "./stores/MoviesProvider";
import PaginationProvider from "./stores/pagination/page-number";
import Home from "./components/Home";

import Modal from "./components/MODAL/Modal";

function App() {
  // window.addEventListener('blur', () => {
  //   console.log("You've left page");
  // })
  return (
    <MoviesProvider>
      <PaginationProvider>
        <Home />
      </PaginationProvider>
    </MoviesProvider>
  );
}

export default App;
