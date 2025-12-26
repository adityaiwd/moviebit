import { useParams, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useMovieDetail } from "./usecases/useMovieDetail";
import { Spinner } from "@/components/ui/spinner";
import PosterImage from "@/components/PosterImage";
import PosterModal from "@/components/PosterModal";

const MovieDetailPage = () => {
  const { movieID: imdbId } = useParams<{ movieID: string }>();

  const { data, isLoading, error, refetch } = useMovieDetail(imdbId);

  const lastErrorRef = useRef<string | null>(null);
  useEffect(() => {
    if (!error) return;
    if (lastErrorRef.current === error) return;
    lastErrorRef.current = error;
    toast.error(error);
  }, [error]);

  const [posterOpen, setPosterOpen] = useState(false);

  if (!imdbId) {
    return <div className="p-4">Invalid movie id</div>;
  }

  if (isLoading && !data) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-lg text-muted-foreground">
        <Spinner />
        Loading movie…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 space-y-3">
        <div className="text-lg text-muted-foreground">Movie not found.</div>
        <button
          className="rounded-md border px-3 py-2 text-lg hover:bg-accent"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full md:max-w-[50%] lg:max-w-[50%] mx-auto">
      <NavLink className="text-lg text-muted-foreground hover:underline" to="/">
        ← Back to list
      </NavLink>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div>
          <PosterImage
            src={data.posterUrl}
            alt={data.title}
            onClick={() => setPosterOpen(true)}
          />
          <PosterModal
            src={data.posterUrl}
            title={data.title}
            open={posterOpen}
            onOpenChange={setPosterOpen}
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">
            {data.title}{" "}
            <span className="text-muted-foreground">({data.year})</span>
          </h1>

          <p className="text-lg text-foreground/90 text-justify">{data.plot}</p>

          <div className="text-lg">
            <div>
              <span className="text-muted-foreground">Director: </span>
              {data.director}
            </div>
            <div>
              <span className="text-muted-foreground">Actors: </span>
              {data.actors}
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Spinner className="h-4 w-4" />
              Refreshing…
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
