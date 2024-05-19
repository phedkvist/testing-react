import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import { MoviesProvider } from "./providers/MoviesProvider";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movies/:movieId",
    element: <Movie />,
  },
]);

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  </React.StrictMode>
);
