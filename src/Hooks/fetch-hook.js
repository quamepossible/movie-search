import { useState, useCallback, useEffect } from "react";

const useFetchHook = (url) => {
  const [movies, setMovies] = useState();
  const whatElse = useCallback(
    function () {
      return fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
        },
      });
    },
    [url]
  );
  useEffect(() => {
    const fetchFunc = async () => {
      const fetchMov = await whatElse();
      const moviesResults = await fetchMov.json();
      setMovies(moviesResults);
    };
    fetchFunc();
  }, [whatElse]);

  return movies;
};

export default useFetchHook;
