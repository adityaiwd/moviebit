import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./index";

afterEach(() => cleanup());

describe("SearchBar", () => {
  it("calls onSearch with trimmed query when clicking search", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);

    const input = within(container).getByPlaceholderText(/search/i);
    await user.type(input, "  batman  ");
    await user.click(within(container).getByLabelText("search-button"));

    expect(onSearch).toHaveBeenCalledWith("batman");
  });

  it("calls onSearch when pressing Enter without selecting autocomplete", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);

    const input = within(container).getByPlaceholderText(/search/i);
    await user.type(input, "star wars{enter}");

    expect(onSearch).toHaveBeenCalledWith("star wars");
  });

  it("does not call onSearch for empty input", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const { container } = render(<SearchBar onSearch={onSearch} />);

    const input = within(container).getByPlaceholderText(/search/i);
    await user.type(input, "   ");
    await user.click(within(container).getByLabelText("search-button"));

    expect(onSearch).not.toHaveBeenCalled();
  });
});
