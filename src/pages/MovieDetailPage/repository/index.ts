import { fetchMovieDetail } from "./fetcher";
import { mapMovieDetailResponse } from "./mapper";

export const getMovieDetail = async (imdbId: string) => {
  const res = await fetchMovieDetail(imdbId);
  return mapMovieDetailResponse(res.data);
}
