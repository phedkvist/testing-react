import { render } from "@testing-library/react";
import { moviesStub } from "../stubs";
import { MoviesByQuery } from "./MoviesByQuery";

describe("MoviesByQuery", () => {
  it("should render movies by query", () => {
    const useNavigateMock = () => jest.fn();
    const useMoviesMock = jest.fn().mockReturnValue({ movies: moviesStub });
    const screen = render(
      <MoviesByQuery
        search={"Dune"}
        useMovies={useMoviesMock}
        useNavigate={useNavigateMock}
      />
    );

    expect(screen.getByText("Movies by query: Dune")).toBeDefined();
  });
});
