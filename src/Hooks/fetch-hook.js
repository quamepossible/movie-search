import { useState, useCallback, useEffect } from "react";

const useFetchHook = (url) => {
  const [movies, setMovies] = useState();
  const whatElse = useCallback(
    async function () {
      try {
        const fetchData = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: process.env.REACT_APP_MOVIE_BEARER,
          },
        });
        if (!fetchData.ok) throw new Error("Couldn't fetch Movies");
        const fetchMov = await fetchData.json();
        return fetchMov;
      } catch (err) {
        console.log(err.message);
        return null;
      }
    },
    [url]
  );
  useEffect(() => {
    console.log('first hook');
    whatElse().then((movies) => {
      setMovies(movies);
    });
  }, [whatElse]);

  return movies;
};

export default useFetchHook;
