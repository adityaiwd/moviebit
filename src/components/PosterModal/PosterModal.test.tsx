import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PosterModal from "./index";

afterEach(() => cleanup());

vi.mock("@/assets/poster-placeholder.png", () => ({
  default: "placeholder.png",
}));

describe("PosterModal", () => {
  it("renders dialog + title when open", async () => {
    render(
      <PosterModal open={true} onOpenChange={vi.fn()} title="Star Wars" src="N/A" />
    );
    
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(screen.getByText("Star Wars")).toBeInTheDocument();
  });

  it("does not render dialog when closed", () => {
    render(
      <PosterModal open={false} onOpenChange={vi.fn()} title="Star Wars" src="N/A" />
    );

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("Star Wars")).toBeNull();
  });
});
