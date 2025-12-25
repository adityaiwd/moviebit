import { useEffect, useRef } from "react";

type Options = {
  enabled: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export const useInfiniteScroll = ({
  enabled,
  isLoading,
  hasMore,
  onLoadMore,
  root = null,
  rootMargin = "400px",
  threshold = 0,
}: Options) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!hasMore) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (isLoading) return;
        onLoadMore();
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [enabled, hasMore, isLoading, onLoadMore, root, rootMargin, threshold]);

  return { sentinelRef };
}
