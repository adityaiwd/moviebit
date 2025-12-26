import type { MovieDetail, OmdbMovieDetailResponse } from "@/pages/MovieDetailPage/model";

const normalizePoster = (url?: string) => {
  if (!url || url === "N/A") return null;
  return url.replace(/_SX\d+/g, "_SX1000");
}

const safeText = (v?: string) => {
  if (!v || v === "N/A") return "";
  return v;
}

export const mapMovieDetailResponse = (data: OmdbMovieDetailResponse): MovieDetail => {
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie detail");
  }

  return {
    id: data.imdbID,
    title: safeText(data.Title),
    year: safeText(data.Year),
    posterUrl: normalizePoster(data.Poster),
    plot: safeText(data.Plot),
    genre: safeText(data.Genre),
    runtime: safeText(data.Runtime),
    imdbRating: data.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : null,
    director: safeText(data.Director),
    actors: safeText(data.Actors),
    ratings: (data.Ratings ?? []).map((r) => ({
      source: r.Source,
      value: r.Value,
    })),
  };
}
