import { FunctionComponent, useState } from "react";
import { InputField } from "../components/Input";
import {
  MoviesByQuery as MoviesByQueryImport,
  MoviesByQueryProps,
} from "./MoviesByQuery";
import {
  TrendingMovies as TrendingMoviesImport,
  TrendingMoviesProps,
} from "./TrendingMovies";

interface MoviesProps {
  MoviesByQuery?: React.ComponentType<MoviesByQueryProps>;
  TrendingMovies?: React.ComponentType<TrendingMoviesProps>;
}

const Movies: FunctionComponent<MoviesProps> = ({
  MoviesByQuery = MoviesByQueryImport,
  TrendingMovies = TrendingMoviesImport,
}: MoviesProps) => {
  const [search, setSearch] = useState("");
  const isSearching = search.length > 0;

  return (
    <div className="App">
      <h1>Find movies</h1>
      <div className="search">
        <InputField
          name="Search movie"
          type={"search"}
          placeholder="Star wars"
          value={search}
          setValue={setSearch}
        />
      </div>
      {isSearching ? <MoviesByQuery search={search} /> : <TrendingMovies />}
    </div>
  );
};

export default Movies;
