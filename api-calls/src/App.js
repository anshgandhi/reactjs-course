import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch("https://react-http-5b52d-default-rtdb.firebaseio.com/movies.json");
        if (!response.ok) {
          throw new Error("Oops!");
        }
        const data = await response.json();

        const loadedMovies = [];
        for (const key in data){
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            release: data[key].releaseDate,
          });
        }
        setMovies(loadedMovies);
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

  async function addMovieHandler(movie) {
    const response = await fetch("https://react-http-5b52d-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
