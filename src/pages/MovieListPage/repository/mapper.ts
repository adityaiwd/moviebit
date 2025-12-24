import type { MovieListItem, OmdbSearchResponse } from "@/pages/MovieListPage/model";

function toYearNumber(year: string): number | null {
  const n = Number(year);
  return Number.isFinite(n) ? n : null;
}

function toPosterUrl(poster: string): string | null {
  if (!poster || poster === "N/A") return null;
  return poster;
}

export function mapSearchResponse(data: OmdbSearchResponse): {
  items: MovieListItem[];
  totalResults: number;
} {
  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  const items: MovieListItem[] = (data.Search ?? []).map((x) => ({
    id: x.imdbID,
    title: x.Title,
    year: toYearNumber(x.Year),
    posterUrl: toPosterUrl(x.Poster),
    type: x.Type,
  }));

  return {
    items,
    totalResults: Number(data.totalResults ?? "0"),
  };
}
