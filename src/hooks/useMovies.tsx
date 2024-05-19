import { useContext } from "react";
import { MoviesContext } from "../providers/MoviesProvider";

export const useMovies = () => useContext(MoviesContext);
