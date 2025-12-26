import { useState } from "react";
import { useMovieAutocomplete } from "../../usecases/useMovieAutoComplete";

type Props = {
  value?: string;
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { items, isLoading, enabled } = useMovieAutocomplete(value);

  const open = isFocused && enabled && (items.length > 0 || isLoading);

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    setIsFocused(false);
    setActiveIndex(-1);
    onSearch(q);
  };

  const pick = (query: string) => {
    setValue(query);
    setActiveIndex(-1);
    setIsFocused(false); // closes dropdown
    onSearch(query);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open) {
      if (e.key === "Enter") submit();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        pick(items[activeIndex].title);
      } else {
        submit();
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <div className="w-full md:max-w-[60%] lg:max-w-[60%] mx-auto mt-6 relative">
      <div className="flex gap-2 w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 120);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="Search movies…"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />

        <button
          aria-label="search-button"
          onClick={submit}
          className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground hover:bg-secondary/80"
        >
          Search
        </button>
      </div>
      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border bg-popover shadow">
          {isLoading && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Loading…
            </div>
          )}

          {!isLoading && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No suggestions
            </div>
          )}

          {!isLoading &&
            items.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()} // keep focus (prevents blur closing before click)
                onClick={() => pick(m.title)}
                className={[
                  "w-full text-left px-3 py-2 text-sm",
                  "bg-background",
                  "hover:bg-accent",
                  idx === activeIndex ? "bg-accent" : "",
                ].join(" ")}
              >
                <div className="font-medium">{m.title}</div>
                <div className="text-xs text-muted-foreground">{m.year}</div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
