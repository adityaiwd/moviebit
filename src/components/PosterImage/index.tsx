import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  onClick?: () => void;
};

const placeholder = '/placeholder.svg'

const PosterImage = ({ src, alt, className, onClick }: Props) => {
  const [error, setError] = useState(false);

  const imageSrc = !src || src === "N/A" || error ? placeholder : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={cn(
        "aspect-[2/3] w-full rounded-md bg-muted object-cover cursor-pointer",
        className
      )}
      onClick={onClick}
      onError={() => setError(true)}
    />
  );
}

export default PosterImage;
