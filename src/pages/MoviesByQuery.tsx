import { useNavigate as useNavigateImport } from "react-router-dom";
import { useMovies as useMoviesImport } from "../hooks/useMovies";
import { MovieItem } from "./TrendingMovies";

export type MoviesByQueryProps = {
  search: string;
  useMovies?: typeof useMoviesImport;
  useNavigate?: typeof useNavigateImport;
};

export const MoviesByQuery = ({
  search,
  useMovies = useMoviesImport,
  useNavigate = useNavigateImport,
}: MoviesByQueryProps) => {
  const { movies } = useMovies();
  const navigate = useNavigate();

  const matchingMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const onSelectMovie = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <p>Movies by query: {search}</p>
      {matchingMovies.map((m) => (
        <MovieItem
          key={m.id}
          movie={m}
          onSelectMovie={() => onSelectMovie(m.id)}
        />
      ))}
    </div>
  );
};
