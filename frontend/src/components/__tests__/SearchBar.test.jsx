import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../molecules/SearchBar";

describe("SearchBar", () => {
  it("renders input and button and calls onSearch when submitted", () => {
    const onSearch = vi.fn();
    const onClear = vi.fn();
    const setHasSearched = vi.fn();

    render(
      <SearchBar
        onSearch={onSearch}
        onClear={onClear}
        setHasSearched={setHasSearched}
      />
    );

    const input = screen.getByPlaceholderText(/search users here/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "john" } });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });
});
