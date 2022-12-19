import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useCounter } from "./useCounter";

test("useCounter", () => {
  const { result } = renderHook(useCounter, {
    initialProps: {
      initialValue: 10,
    },
  });
  expect(result.current.count).toBe(10);

  act(() => result.current.increment());

  expect(result.current.count).toBe(11);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(10);
});
