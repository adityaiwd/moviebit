import { createBrowserRouter } from "react-router-dom";
import MovieListPage from "@/pages/MovieListPage";
import MovieDetailPage from "@/pages/MovieDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
  },
  {
    path: "/movie/:movieID",
    element: <MovieDetailPage />,
  },
]);
