import { omdbHttp } from "@/shared/repository/http";
import type { OmdbMovieDetailResponse } from "@/pages/MovieDetailPage/model";

export const fetchMovieDetail = (imdbId: string) => {
  return omdbHttp.get<OmdbMovieDetailResponse>("/", {
    params: {
      i: imdbId,
      plot: "full",
    },
  });
}
