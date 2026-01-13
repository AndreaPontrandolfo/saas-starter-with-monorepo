import { describe, it, expect } from "vitest";
import { sampleFunction } from "./sample-function";

describe("sampleFunction", () => {
  it("should return the input parameter", () => {
    const input = "test value";
    const result = sampleFunction(input);
    expect(result).toBe(input);
  });
});
