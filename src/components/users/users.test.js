import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { Users } from "./users";

test("renders a list of users", async () => {
  render(<Users />);
  const users = await screen.findAllByRole("listitem");
  expect(users).toHaveLength(3);
});

test("renders error", async () => {
  server.use(
    rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Users />);
  const errorElement = await screen.findByText("Error fetching users");
  expect(errorElement).toBeInTheDocument();
});
