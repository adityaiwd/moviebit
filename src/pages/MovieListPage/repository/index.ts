import { fetchSearchMovies } from "./fetcher";
import { mapSearchResponse } from "./mapper";
import type { MovieListItem } from "../model";

export const suggestMovies = async (query: string, limit = 6): Promise<MovieListItem[]> => {
  const res = await fetchSearchMovies({ query, page: 1 });
  const mapped = mapSearchResponse(res.data);

  return mapped.items.slice(0, limit);
}

export const searchMovies = async (params: { query: string; page: number }) => {
  const res = await fetchSearchMovies(params);
  const mapped = mapSearchResponse(res.data);
  return {
    items: mapped.items,
    totalResults: mapped.totalResults,
    page: params.page,
    query: params.query,
  };
}
