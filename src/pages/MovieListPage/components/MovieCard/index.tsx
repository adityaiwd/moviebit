import { type MovieListItem } from "@/pages/MovieListPage/model";

const MovieCard = ({ posterUrl, title, year }: MovieListItem) => {
  return (
    <div className="p-2 flex flex-col items-center space-y-4">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          className="w-full rounded overflow-hidden"
        />
      ) : (
        <div className="w-16 h-24 bg-gray-300 flex items-center justify-center rounded">
          <span className="text-sm text-gray-600">No Image</span>
        </div>
      )}
      <div className="word-wrap w-full">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-gray-500">{year ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
