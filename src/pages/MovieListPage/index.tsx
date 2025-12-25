import { useRef, useEffect } from "react";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import { useMovieSearch } from "@/pages/MovieListPage/usecases/useMovieSearch";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

const MovieListPage = () => {
  const { items, isLoading, error, hasMore, loadNextPage, search } =
    useMovieSearch();
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    isLoading,
    hasMore,
    onLoadMore: loadNextPage,
    rootMargin: "50px",
  });

  const lastErrorRef = useRef<string | null>(null);

  const isInitialLoading = isLoading && items.length === 0;
  const isPagingLoading = isLoading && items.length > 0;

  const handleSearch = (query: string) => {
    search(query);
  };

  useEffect(() => {
    if (!error) return;
    if (lastErrorRef.current === error) return;

    lastErrorRef.current = error;
    toast.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />

      {isInitialLoading ? (
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Spinner className="h-5 w-5" />
          <span>Loading movies…</span>
        </div>
      ) : (
        <div className="mt-4 space-y-2 grid grid-cols-2 gap-8 w-full md:max-w-[60%] lg:max-w-[60%] mx-auto">
          {items.map((m) => (
            <MovieCard key={m.id} {...m} />
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-col items-center justify-center">
        {isPagingLoading && (
          <div className="py-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Spinner className="h-4 w-4" />
            <span>Loading more…</span>
          </div>
        )}
        {items.length > 0 && <div ref={sentinelRef} />}
        {!isLoading && !hasMore && items.length > 0 && (
          <div className="py-6 text-sm text-muted-foreground">
            You’ve reached the end.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
