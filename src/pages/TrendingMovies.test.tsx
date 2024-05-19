import { fireEvent, render } from "@testing-library/react";
import { moviesStub } from "../stubs";
import { TrendingMovies } from "./TrendingMovies";

const movies = [
  {
    id: 1,
    title: "Movie 1",
    overview: "Overview 1",
    poster_path: "/poster1.jpg",
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "Overview 2",
    poster_path: "/poster2.jpg",
  },
];

describe("TrendingMovies component", () => {
  it("renders a list of movies", () => {
    const useNavigateMock = () => jest.fn();
    const useMoviesMock = jest.fn().mockReturnValue({ movies: moviesStub });

    const screen = render(
      <TrendingMovies useNavigate={useNavigateMock} useMovies={useMoviesMock} />
    );

    moviesStub.forEach(({ title }) => {
      expect(screen.getByRole("heading", { name: title })).toBeDefined();
      expect(
        screen.getByRole("img", { name: `Poster from movie: ${title}` })
      ).toBeDefined();
    });
  });

  it("renders an empty state", () => {
    const useNavigateMock = () => jest.fn();
    const useMoviesMock = jest.fn().mockReturnValue({ movies: [] });

    const screen = render(
      <TrendingMovies useNavigate={useNavigateMock} useMovies={useMoviesMock} />
    );

    expect(screen.getByText("No movies available")).toBeDefined();
  });

  it("should navigate when selecting a movie", () => {
    const navigateMock = jest.fn();
    const useNavigateMock = () => navigateMock;
    const useMoviesMock = jest.fn().mockReturnValue({ movies });
    const screen = render(
      <TrendingMovies useNavigate={useNavigateMock} useMovies={useMoviesMock} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Read more" })[0]);
    expect(navigateMock).toHaveBeenCalledWith("/movies/1");
  });
});
