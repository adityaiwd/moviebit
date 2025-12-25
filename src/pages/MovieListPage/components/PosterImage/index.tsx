import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

const placeholder = '/placeholder.svg'

export function PosterImage({ src, alt, className }: Props) {
  const [error, setError] = useState(false);

  const imageSrc = !src || src === "N/A" || error ? placeholder : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={cn(
        "aspect-[2/3] w-full rounded-md bg-muted object-cover",
        className
      )}
      onError={() => setError(true)}
    />
  );
}
