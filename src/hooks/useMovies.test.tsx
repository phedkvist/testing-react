import { renderHook } from "@testing-library/react";
import { MoviesContext } from "../providers/MoviesProvider";
import { moviesStub } from "../stubs";
import { useMovies } from "./useMovies";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MoviesContext.Provider
    value={{
      movies: moviesStub,
    }}
  >
    {children}
  </MoviesContext.Provider>
);

describe("useMovies", () => {
  it("should return a list of movies", () => {
    const hook = renderHook(() => useMovies(), { wrapper });
    expect(hook.result.current.movies).toEqual(moviesStub);
  });
});
