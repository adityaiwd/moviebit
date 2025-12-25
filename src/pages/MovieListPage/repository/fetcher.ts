import { omdbHttp } from "@/shared/repository/http";
import type { OmdbSearchResponse } from "@/pages/MovieListPage/model";

export const fetchSearchMovies = async (params: { query: string; page: number }) => {
  return omdbHttp.get<OmdbSearchResponse>("/", {
    params: { s: params.query, page: params.page },
  });
}
