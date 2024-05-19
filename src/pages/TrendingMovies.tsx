import { useNavigate as useNavigateImport } from "react-router-dom";
import { useMovies as useMoviesImport } from "../hooks/useMovies";
import { Movie } from "../types";

export type MovieProps = {
  movie: Movie;
  onSelectMovie: () => void;
};

export const MovieItem = ({ movie, onSelectMovie }: MovieProps) => (
  <div className="movie-item">
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={`Poster from movie: ${movie.title}`}
    />
    <div className="movie-info">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <button className="readMore" onClick={onSelectMovie}>
        Read more
      </button>
    </div>
  </div>
);

export type TrendingMoviesProps = {
  useMovies?: typeof useMoviesImport;
  useNavigate?: typeof useNavigateImport;
};

export const TrendingMovies = ({
  useMovies = useMoviesImport,
  useNavigate = useNavigateImport,
}: TrendingMoviesProps) => {
  const { movies } = useMovies();
  const navigate = useNavigate();

  const onSelectMovie = (id: number) => {
    navigate(`/movies/${id}`);
  };

  if (movies.length === 0) {
    return (
      <div className="App">
        <p>No movies available</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Trending Movies</h2>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onSelectMovie={() => onSelectMovie(movie.id)}
        />
      ))}
    </div>
  );
};
