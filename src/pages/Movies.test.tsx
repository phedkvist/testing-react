import { act, fireEvent, render } from "@testing-library/react";
import createReactMock from "react-mock-component";
import Movies from "./Movies";
import { MoviesByQueryProps } from "./MoviesByQuery";
import { TrendingMoviesProps } from "./TrendingMovies";

describe("Movies", () => {
  it("should render movie content", () => {
    const MoviesByQueryMock = createReactMock<MoviesByQueryProps>();
    const TrendingMoviesMock = createReactMock<TrendingMoviesProps>();
    const screen = render(
      <Movies
        MoviesByQuery={MoviesByQueryMock}
        TrendingMovies={TrendingMoviesMock}
      />
    );
    expect(screen.getByRole("heading", { name: "Find movies" })).toBeDefined();
    expect(TrendingMoviesMock.rendered).toBeTruthy();
    expect(MoviesByQueryMock.rendered).toBeFalsy();
  });

  it("should set review for a movie", async () => {
    const MoviesByQueryMock = createReactMock<MoviesByQueryProps>();
    const TrendingMoviesMock = createReactMock<TrendingMoviesProps>();
    const screen = render(
      <Movies
        MoviesByQuery={MoviesByQueryMock}
        TrendingMovies={TrendingMoviesMock}
      />
    );

    act(() =>
      fireEvent.change(screen.getByLabelText("Search movie"), {
        target: { value: "Dune" },
      })
    );
    expect(MoviesByQueryMock.rendered).toBeTruthy();
    expect(MoviesByQueryMock.renderedWith({ search: "Dune" })).toBeTruthy();
  });
});
