import { useState } from "react";
import { Link, useParams as useParamsImport } from "react-router-dom";
import { useMovies as useMoviesImport } from "../hooks/useMovies";

export const getRatingMessage = (rating: number) => {
  switch (rating) {
    case 1:
      return "bad";
    case 2:
      return "mediocre";
    case 3:
      return "ok";
    case 4:
      return "good";
    case 5:
      return "amazing";
    default:
      return "";
  }
};

export type MovieProps = {
  useMovies?: typeof useMoviesImport;
  useParams?: typeof useParamsImport;
};

function Movie({
  useMovies = useMoviesImport,
  useParams = useParamsImport,
}: MovieProps) {
  const { movies } = useMovies();
  let { movieId } = useParams();
  const movie = movies.find((m) => movieId && m.id === Number(movieId));

  const stars = Array.from(Array(5).keys());

  const [hoverRating, setHoverRating] = useState(-1);
  const [rating, setRating] = useState<number>();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const onChangeReviewText: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setReviewText(e.currentTarget.value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
  };

  return (
    <div className="App">
      <Link to={"/"}>Back</Link>
      <div>
        <h1>{movie?.title}</h1>
        <div className="movieDetails">
          <img
            className="moviePoster"
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          />
          <div className="movieContent">
            <p>{movie?.overview}</p>

            <form onSubmit={onSubmit}>
              <div className="movieRating">
                {stars.map((s, i) => (
                  <button
                    onClick={() => setRating(i + 1)}
                    key={"rating-" + i}
                    onMouseOver={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(-1)}
                    className={i < (rating || hoverRating) ? "active" : ""}
                    type="button"
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <p>{getRatingMessage(rating || hoverRating)}</p>
              <textarea
                className="textArea"
                onChange={onChangeReviewText}
                placeholder="Write a review of the movie..."
                value={reviewText}
              ></textarea>
              <br />
              <button className={"submitReview"} type="submit">
                Submit review
              </button>
              <p>{hasSubmitted && "Thanks for your review 🎉"}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
