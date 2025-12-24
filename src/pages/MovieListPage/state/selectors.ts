import type { RootState } from "@/app/store";

export const selectMovieList = (s: RootState) => s.movieList;

export const selectHasMore = (s: RootState) => {
  const st = s.movieList;
  return Number(st.items.length) < Number(st.totalResults);
};
