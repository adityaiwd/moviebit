import { useEffect, useMemo, useRef, useState } from "react";
import { suggestMovies } from "../repository";
import type { MovieListItem } from "../model/types";

export const useMovieAutocomplete = (input: string) => {
  const [items, setItems] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<Map<string, MovieListItem[]>>(new Map());

  const query = useMemo(() => input.trim(), [input]);
  const enabled = query.length >= 3;

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const cached = cacheRef.current.get(query);
    if (cached) {
      setItems(cached);
      return;
    }

    setIsLoading(true);
    setError(null);

    const t = window.setTimeout(async () => {
      try {
        const result = await suggestMovies(query, 6);
        cacheRef.current.set(query, result);
        setItems(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => window.clearTimeout(t);
  }, [enabled, query]);

  return { items, isLoading, error, enabled };
}
