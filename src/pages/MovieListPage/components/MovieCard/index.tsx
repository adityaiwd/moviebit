import { type MovieListItem } from "@/pages/MovieListPage/model";
import { PosterImage } from "../PosterImage";

const MovieCard = ({ posterUrl, title, year }: MovieListItem) => {
  return (
    <div className="p-2 flex flex-col items-center space-y-4">
      <PosterImage src={posterUrl} alt={title} />
      <div className="word-wrap w-full">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-gray-500">{year ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
