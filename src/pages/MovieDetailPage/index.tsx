import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieID } = useParams<{ movieID: string }>();

  return <div className="p-4">
      <h1 className="text-2xl font-semibold">Movie Detail</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        movieID: {movieID}
      </p>
    </div>;
};

export default MovieDetailPage;
