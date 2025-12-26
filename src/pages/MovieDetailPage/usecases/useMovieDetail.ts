import { useCallback, useEffect, useRef, useState } from "react";
import type { MovieDetail } from "@/pages/MovieDetailPage/model";
import { getMovieDetail } from "../repository";

export function useMovieDetail(imdbId?: string) {
  const [data, setData] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const didFetchRef = useRef(false);

  const fetchDetail = useCallback(async () => {
    if (!imdbId) return;
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    setError(null);
    setIsLoading(true);

    try {
      const result = await getMovieDetail(imdbId);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  }, [imdbId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      didFetchRef.current = false;
      fetchDetail();
    },
  };
}
