export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbSearchResponse =
  | { Response: "True"; Search: OmdbSearchItem[]; totalResults: string }
  | { Response: "False"; Error: string };

export type MovieListItem = {
  id: string;
  title: string;
  year: number | null;
  posterUrl: string | null;
  type: string;
};