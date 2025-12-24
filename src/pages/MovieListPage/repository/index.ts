import { fetchSearchMovies } from "./fetcher";
import { mapSearchResponse } from "./mapper";

export async function searchMovies(params: { query: string; page: number }) {
  const res = await fetchSearchMovies(params);
  const mapped = mapSearchResponse(res.data);
  return {
    items: mapped.items,
    totalResults: mapped.totalResults,
    page: params.page,
    query: params.query,
  };
}
