import { fireEvent } from "@testing-library/react";
import { moviesStub } from "../stubs";
import { renderWrapper } from "../testUtils";
import Movie, { getRatingMessage } from "./Movie";

describe("getRatingMessage", () => {
  const testCases: [number, string][] = [
    [1, "bad"],
    [2, "mediocre"],
    [3, "ok"],
    [4, "good"],
    [5, "amazing"],
    [6, ""],
    [0, ""],
  ];

  testCases.map(([value, expectedText]) => {
    it(`should render ${expectedText} when given ${value}`, () => {
      const response = getRatingMessage(value);
      expect(response).toEqual(expectedText);
    });
  });
});

describe("Movie", () => {
  it("should render the movie and its content", () => {
    const movie = moviesStub[0];
    const useMoviesMock = jest.fn().mockReturnValue({ movies: moviesStub });
    const useParamsMock = jest.fn().mockReturnValue({ movieId: movie.id });

    const screen = renderWrapper(
      <Movie useMovies={useMoviesMock} useParams={useParamsMock} />
    );
    expect(screen.getByRole("heading", { name: movie.title }));
    expect(screen.getByText(movie.overview)).toBeDefined();
    expect(screen.getByRole("img").getAttribute("src")).toEqual(
      `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    );
  });

  it("should fill in a complete review", () => {
    const movie = moviesStub[0];
    const useMoviesMock = jest.fn().mockReturnValue({ movies: moviesStub });
    const useParamsMock = jest.fn().mockReturnValue({ movieId: movie.id });

    const screen = renderWrapper(
      <Movie useMovies={useMoviesMock} useParams={useParamsMock} />
    );
    fireEvent.click(screen.getAllByRole("button", { name: "⭐" })[4]);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "My review" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit review" }));
    expect(screen.getByText("Thanks for your review 🎉")).toBeDefined();
  });
});
