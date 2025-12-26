import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  src: string | null;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const placeholder = "/placeholder.svg";

export function PosterModal({ src, title, open, onOpenChange }: Props) {
  const [imgError, setImgError] = useState(false);

  const previewSrc = useMemo(() => {
    if (!src || src === "N/A" || imgError) return placeholder;
    return src;
  }, [src, imgError]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) setImgError(false);
        onOpenChange(v);
      }}
    >
      <DialogContent
        className="max-w-[95vw]
    sm:max-w-[90vw]
    md:max-w-[800px]
    lg:max-w-[1000px]
    p-0
    overflow-hidden"
      >
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-sm sm:text-base line-clamp-1">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4">
          <div className="flex justify-center">
            <img
              src={previewSrc}
              alt={title}
              className="max-h-[80vh] w-full rounded-md bg-muted object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
