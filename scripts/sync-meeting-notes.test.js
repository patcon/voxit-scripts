import { describe, it, expect } from "bun:test";
import { parseDateFromTitle, generateFilename, censorStrikethrough } from "./sync-meeting-notes.js";

describe("parseDateFromTitle", () => {
  it("extracts ISO date from a valid title", () => {
    expect(parseDateFromTitle("# Polis EU Tech Group Meeting - 2026/03/06")).toBe("2026-03-06");
  });

  it("returns null for a title without a date", () => {
    expect(parseDateFromTitle("# Meeting Notes")).toBeNull();
  });

  it("returns null for a malformed date", () => {
    expect(parseDateFromTitle("# Meeting - 2026-03-06")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parseDateFromTitle("")).toBeNull();
  });
});

describe("generateFilename", () => {
  it("returns correctly formatted filename", () => {
    expect(generateFilename("2026-03-06")).toBe("2026-03-06-tech-wg.md");
  });
});

describe("censorStrikethrough", () => {
  it("replaces strikethrough text with block characters (1 per 5 chars)", () => {
    // "hello" = 5 chars → 1 block; "secret" = 6 chars → 2 blocks
    expect(censorStrikethrough("~~hello~~")).toBe("█");
    expect(censorStrikethrough("~~secret~~")).toBe("██");
  });

  it("rounds up partial blocks", () => {
    // "abc" = 3 chars → ceil(3/5) = 1 block
    expect(censorStrikethrough("~~abc~~")).toBe("█");
    // "abcdef" = 6 chars → ceil(6/5) = 2 blocks
    expect(censorStrikethrough("~~abcdef~~")).toBe("██");
  });

  it("respects a custom charsPerBlock", () => {
    // "secret" = 6 chars, charsPerBlock=3 → ceil(6/3) = 2 blocks
    expect(censorStrikethrough("~~secret~~", 3)).toBe("██");
  });

  it("handles multiple strikethrough sections", () => {
    expect(censorStrikethrough("~~hi~~ and ~~bye~~")).toBe("█ and █");
  });

  it("leaves text without strikethrough unchanged", () => {
    expect(censorStrikethrough("nothing to censor")).toBe("nothing to censor");
  });
});
