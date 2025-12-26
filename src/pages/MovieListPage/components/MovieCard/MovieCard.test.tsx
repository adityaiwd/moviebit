import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "./index";

afterEach(() => cleanup());

vi.mock("@/assets/poster-placeholder.png", () => ({
  default: "placeholder.png",
}));

describe("MovieCard", () => {
  it("opens poster modal when poster is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <MovieCard
          id="tt0076759"
          title="Star Wars"
          year={1977}
          posterUrl="N/A"
          type=""
        />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("img", { name: /star wars/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("links to the detail page", () => {
    render(
      <MemoryRouter>
        <MovieCard
          id="tt0076759"
          title="Star Wars"
          year={1977}
          posterUrl="N/A"
          type=""
        />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("/movie/tt0076759");
  });
});
