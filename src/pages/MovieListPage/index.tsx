import { useMovieSearch } from "@/pages/MovieListPage/usecases/useMovieSearch";

const MovieListPage = () => {
  const { items, isLoading, error } = useMovieSearch();

  console.log({
    items,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Movie Search</h1>

      {isLoading && <p className="mt-4 text-sm">Loading...</p>}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {items.map((m) => (
          <li key={m.id} className="border p-2 rounded">
            {m.title} ({m.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage;
