import React, { createContext } from "react";
import { ApiService, createApiService } from "../services/ApiService";
import { Movie } from "../types";

export interface MoviesContext {
  movies: Movie[];
}
const defaultValue: MoviesContext = {
  movies: [],
};

const API_TOKEN = process.env.REACT_APP_API_TOKEN as string;

export const MoviesContext = createContext<MoviesContext>(defaultValue);

export const MoviesProvider = ({
  children,
  apiService = createApiService(API_TOKEN),
}: {
  children: React.ReactNode;
  apiService?: ApiService;
}) => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    apiService.getTrendingMovies().then((res) => setMovies(res.results));
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
