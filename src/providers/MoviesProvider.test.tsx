import { render, waitFor } from "@testing-library/react";
import { moviesStub } from "../stubs";
import { MoviesProvider } from "./MoviesProvider";

describe("MoviesProvider", () => {
  it("should fetch movies from apiService", () => {
    const getTrendingMovies = jest.fn().mockResolvedValue(moviesStub);
    const apiServiceFnMock = {
      getTrendingMovies,
    };

    render(
      <MoviesProvider apiService={apiServiceFnMock}>
        <>children</>
      </MoviesProvider>
    );

    waitFor(() => {
      expect(getTrendingMovies).toHaveBeenCalledTimes(1);
    });
  });
});
