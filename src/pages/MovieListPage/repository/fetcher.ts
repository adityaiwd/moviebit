import { omdbHttp } from "@/shared/repository/http";
import type { OmdbSearchResponse } from "@/pages/MovieListPage/model";

export async function fetchSearchMovies(params: { query: string; page: number }) {
  return omdbHttp.get<OmdbSearchResponse>("/", {
    params: { s: params.query, page: params.page },
  });
}
