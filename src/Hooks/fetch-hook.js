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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
          },
        });
        if (!fetchData) throw new Error("Couldn't fetch Movies");
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
    whatElse().then((movies) => {
      setMovies(movies);
    });
  }, [whatElse]);

  return movies;
};

export default useFetchHook;
