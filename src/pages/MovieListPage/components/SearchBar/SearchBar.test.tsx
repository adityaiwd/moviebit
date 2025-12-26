import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import SearchBar from "./index";

afterEach(() => cleanup());

describe("SearchBar", () => {
  it("calls onSearch with trimmed query when clicking Search", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);
    const input = within(container).getByPlaceholderText(/search/i);

    await user.type(input, "  batman  ");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("batman");
  });

  it("calls onSearch when pressing Enter", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);
    const input = within(container).getByPlaceholderText(/search/i);

    await user.type(input, "star wars{enter}");

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("star wars");
  });

  it("does not call onSearch for empty/whitespace", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);
    const input = within(container).getByPlaceholderText(/search/i);

    await user.type(input, "   ");
    await user.click(within(container).getByRole("button", { name: /search/i }));

    expect(onSearch).not.toHaveBeenCalled();
  });
});
