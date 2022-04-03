import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) {
          throw new Error("Oops!");
        }
        const data = await response.json();
        const transformedMovies = await data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            release: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
  }, []);

  // using useEffect so that when this method is called - it does create an infinite loop with state changes.
  // Now, because 'fetchMoviesHandler' is marked as dependecy - we need to make sure it is the same
  // 'fetchMoviesHandler' that is passed to useEffect otherwise we end up running 'fetchMoviesHandler' 
  // in useEffect over and over again - because function is an object and it is re-created for every Component re-rendering. 
  // This is where useCallback will help us make sure we are passing the same 'fetchMoviesHandler' to useEffect.
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>
  if (movies.length > 0){
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
