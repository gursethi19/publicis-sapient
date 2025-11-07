import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserGrid from "../organisms/UserGrid";

describe("UserGrid", () => {
  it("renders table rows for users", () => {
    const users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "j@example.com",
        age: 30,
        role: "admin",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Roe",
        email: "jane@example.com",
        age: 25,
        role: "user",
      },
    ];

    render(<UserGrid users={users} hasSearched={true} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Roe")).toBeInTheDocument();
  });
});
