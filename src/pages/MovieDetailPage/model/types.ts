export type OmdbMovieDetailResponse = {
  Response: "True" | "False";
  Error?: string;

  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: { Source: string; Value: string }[];
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
};

export type MovieDetail = {
  id: string; // imdbID
  title: string;
  year: string;
  posterUrl: string | null;
  plot: string;
  genre: string;
  runtime: string;
  imdbRating: string | null;
  director: string;
  actors: string;
  ratings: { source: string; value: string }[];
};
