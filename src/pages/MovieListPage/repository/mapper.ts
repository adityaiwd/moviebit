import type {
  MovieListItem,
  OmdbSearchResponse,
} from "@/pages/MovieListPage/model";

const toYearNumber = (year: string): number | null => {
  const n = Number(year);
  return Number.isFinite(n) ? n : null;
};

const toPosterUrl = (poster: string): string | null => {
  if (!poster || poster === "N/A") return null;
  return poster;
};

export const mapSearchResponse = (
  data: OmdbSearchResponse
): {
  items: MovieListItem[];
  totalResults: number;
} => {
  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  const rawItems: MovieListItem[] = (data.Search ?? []).map((x) => ({
    id: x.imdbID,
    title: x.Title,
    year: toYearNumber(x.Year),
    posterUrl: toPosterUrl(x.Poster),
    type: x.Type,
  }));

  const seen = new Set<string>();
  const items = rawItems.filter((x) => {
    if (seen.has(x.id)) return false;
    seen.add(x.id);
    return true;
  });

  return {
    items,
    totalResults: Number(data.totalResults ?? "0"),
  };
};
