import { describe, it, expect } from "bun:test";
import { parseDateFromTitle, generateFilename } from "./sync-meeting-notes.js";

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
