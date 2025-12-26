import { useState } from "react";
import { type MovieListItem } from "@/pages/MovieListPage/model";
import { NavLink } from "react-router-dom";
import PosterImage  from "@/components/PosterImage";
import PosterModal  from "@/components/PosterModal";

const MovieCard = ({ posterUrl, title, year, id }: MovieListItem) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="p-3 h-full md:p-6 flex flex-col items-center justify-between bg-neutral-700 rounded-lg">
        <PosterImage
          src={posterUrl}
          alt={title}
          onClick={() => setOpenModal(true)}
        />
        <div className="word-wrap w-full mt-4">
          <h2 className="md:text-xl font-semibold">{title}</h2>
          <div className="flex justify-between align-middle">

          <p className="md:text-lg text-gray-300">{year ?? "N/A"}</p>
          <NavLink to={`/movie/${id}`} className="xs:sm:text-sm md:text-lg">Details</NavLink>
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
