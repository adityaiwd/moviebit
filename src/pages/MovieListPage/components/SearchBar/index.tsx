import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    onSearch(q);
  };

  return (
    <div className="flex gap-2 w-full md:max-w-[60%] lg:max-w-[60%] mx-auto mt-6">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="Search movies…"
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
      />

      <button
        onClick={submit}
        className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
