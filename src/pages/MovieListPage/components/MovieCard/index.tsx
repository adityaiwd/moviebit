import { useState } from "react";
import { type MovieListItem } from "@/pages/MovieListPage/model";
import { NavLink } from "react-router-dom";
import PosterImage  from "@/components/PosterImage";
import PosterModal  from "@/components/PosterModal";

const MovieCard = ({ posterUrl, title, year, id }: MovieListItem) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="p-6 flex flex-col items-center space-y-4 bg-neutral-700 rounded-lg">
        <PosterImage
          src={posterUrl}
          alt={title}
          onClick={() => setOpenModal(true)}
        />
        <div className="word-wrap w-full">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-between align-middle">

          <p className="text-lg text-gray-300">{year ?? "N/A"}</p>
          <NavLink to={`/movie/${id}`}>Details</NavLink>
          </div>
        </div>
      </div>
      <PosterModal
        src={posterUrl}
        title={title}
        open={openModal}
        onOpenChange={setOpenModal}
      />
    </>
  );
};

export default MovieCard;
