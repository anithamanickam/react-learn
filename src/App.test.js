import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Hello from "./Hello";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";

// import axios from "axios";
// jest.mock(axios, () => jest.fn());

window.document.getSelection = jest.fn();

test.only("renders learn react link", () => {
  renderWithProviders(<Hello />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();

  const textElement = screen.getByDisplayValue("Anitha");
  expect(textElement).toBeInTheDocument();
});

describe("Counter", () => {
  test("renders correctly", () => {
    render(<Hello />);
    const counterElement = screen.getByRole("heading", {
      level: 1,
    });
    expect(counterElement).toBeInTheDocument();
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    expect(incrementButton).toBeInTheDocument();
  });

  test("renders 0 correctly", () => {
    render(<Hello />);
    const counterElement = screen.getByRole("heading", {
      level: 1,
    });
    expect(counterElement).toHaveTextContent("0");
  });

  test("renders 1 after button click", async () => {
    render(<Hello />);
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    debugger;
    await userEvent.click(incrementButton);
    const counterElement = screen.getByRole("heading", {
      level: 1,
    });
    expect(counterElement).toHaveTextContent("1");
  });
});

test.only("renders number input correctly", async () => {
  render(<Hello />);
  const numberElement = screen.getByRole("spinbutton");
  expect(numberElement).toBeInTheDocument();
  // await userEvent.type(numberElement, "10");
  // expect(numberElement).toHaveValue(10);
});
