import { getInitials } from "./getInitials";

describe("generate initials", () => {
  it("should return proper initials - first name, second name exists", () => {
    const result = getInitials("lukasz", "dymek");
    expect(result).toBe("ld");
  });
  it("should return proper initials - polish letters", () => {
    const result = getInitials("Łukasz", "Dymek");
    expect(result).toBe("ŁD");
  });
});
