import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import PosterImage from "./index";

afterEach(() => cleanup());

vi.mock("@/assets/placeholder.svg", () => ({
  default: "placeholder.svg",
}));

describe("PosterImage", () => {
  it("renders given src when valid", () => {
    const { container } = render(
      <PosterImage src="https://example.com/poster.jpg" alt="Poster" />
    );

    const img = within(container).getByRole("img", { name: "Poster" }) as HTMLImageElement;
    expect(img.src).toContain("https://example.com/poster.jpg");
  });

  it("uses placeholder when src is null or 'N/A'", () => {
    const { container } = render(<PosterImage src="N/A" alt="Poster" />);
    const img = within(container).getByRole("img", { name: "Poster" }) as HTMLImageElement;

    expect(img.src).toContain("placeholder.svg");
  });

  it("falls back to placeholder on image error", () => {
    const { container } = render(
      <PosterImage src="https://broken.example.com/poster.jpg" alt="Poster" />
    );

    const img = within(container).getByRole("img", { name: "Poster" }) as HTMLImageElement;

    fireEvent.error(img);
    expect(img.src).toContain("placeholder.svg");
  });

  it("calls onClick when provided", () => {
    const onClick = vi.fn();
    const { container } = render(<PosterImage src="N/A" alt="Poster" onClick={onClick} />);

    const img = within(container).getByRole("img", { name: "Poster" });
    fireEvent.click(img);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
