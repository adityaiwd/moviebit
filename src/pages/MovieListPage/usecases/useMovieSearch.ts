import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { movieListActions } from "../state/slice";
import { selectMovieList, selectHasMore } from "../state/selectors";
import { searchMovies } from "../repository";

const DEFAULT_QUERIES = ["batman", "avengers", "star wars"];
const DEFAULT_QUERY =
  DEFAULT_QUERIES[Math.floor(Math.random() * DEFAULT_QUERIES.length)];

export function useMovieSearch() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectMovieList);
  const hasMore = useAppSelector(selectHasMore);

  const hasInitializedRef = useRef(false);

  const search = useCallback(
    async (query: string) => {
      const q = query.trim();
      if (!q) return;

      dispatch(movieListActions.setError(null));
      dispatch(movieListActions.setLoading(true));

      try {
        const res = await searchMovies({ query: q, page: 1 });
        dispatch(
          movieListActions.setList({
            query: q,
            page: 1,
            items: res.items,
            totalResults: res.totalResults,
          })
        );
      } catch (e) {
        dispatch(movieListActions.setError(e instanceof Error ? e.message : String(e)));
      } finally {
        dispatch(movieListActions.setLoading(false));
      }
    },
    [dispatch]
  );

  // initial search on first mount
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    if (!state.query) {
      search(DEFAULT_QUERY);
    }
  }, [search, state.query]);

  return {
    // state
    items: state.items || [],
    query: state.query,
    page: state.page,
    totalResults: state.totalResults,
    isLoading: state.isLoading,
    error: state.error,
    hasMore,
    // actions
    search,
  };
}
