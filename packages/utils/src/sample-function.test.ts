import { describe, expect, test } from "vitest";
import { sampleFunction } from "./sample-function";

describe("sampleFunction", () => {
  test("should return the input parameter", () => {
    const input = "test value";
    const result = sampleFunction(input);

    expect(result).toBe(input);
  });
});
