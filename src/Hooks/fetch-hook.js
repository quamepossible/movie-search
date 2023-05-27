const useFetchHook = async (url) => {

    // const fetchURL = `https://api.themoviedb.org/3/discover/movie?include_adult=true&release_date.gte=2023&page=${toChange}`;
    const fetchInitMovies = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGY5Y2IyNDM5ODIxMzNkN2Q3NzU3YWU4MTBhMTJlOSIsInN1YiI6IjY0NmZjMzQzNTQzN2Y1MDEyNjNhM2QzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiEhFATYQoD8ZLFa_rjLqPKkcq_jmPIbCHTaPF4sX9I",
      },
    });
    
    const moviesResults = await fetchInitMovies.json();
    return moviesResults;
}

export default useFetchHook;