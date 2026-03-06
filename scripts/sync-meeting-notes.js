import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export function toFetchUrl(url) {
  const u = new URL(url);
  if (u.hostname === "hackmd.io") {
    // https://hackmd.io/<id>[?view|both|...] → https://hackmd.io/<id>/download
    const id = u.pathname.replace(/^\//, "").split("/")[0];
    return `https://hackmd.io/${id}/download`;
  }
  if (u.hostname.endsWith("riseup.net") && u.pathname.includes("/p/")) {
    // https://pad.riseup.net/p/<id> → .../export/txt
    return `${u.origin}${u.pathname.replace(/\/$/, "")}/export/txt`;
  }
  throw new Error(`Unsupported pad URL: ${url}`);
}

export function parseDateFromTitle(line) {
  // Matches: # Some Title - 2026/03/06
  const match = line.match(/(\d{4})\/(\d{2})\/(\d{2})\s*$/);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${year}-${month}-${day}`;
}

export function generateFilename(isoDate) {
  return `${isoDate}-tech-wg.md`;
}

export function normalizeIndents(text) {
  return text
    .split("\n")
    .map(line => line.replace(/^\t+/, tabs => "  ".repeat(tabs.length)))
    .join("\n");
}

export function redactStrikethrough(text, charsPerBlock = 5) {
  return text.replace(/~~([^~]+)~~/g, (_, inner) =>
    "█".repeat(Math.ceil(inner.length / charsPerBlock))
  );
}

if (import.meta.main) {
  const padUrl = process.argv[2];
  if (!padUrl) throw new Error("Usage: sync-meeting-notes.js <pad-url>");
  const fetchUrl = toFetchUrl(padUrl);
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch pad: ${response.status} ${response.statusText}`);
  }
  const content = await response.text();

  const firstLine = content.split("\n")[0].trim();
  const isoDate = parseDateFromTitle(firstLine);
  if (!isoDate) {
    throw new Error(`Could not parse date from title line: ${JSON.stringify(firstLine)}`);
  }

  const filename = generateFilename(isoDate);
  const outDir = join(process.cwd(), "meetings");
  await mkdir(outDir, { recursive: true });

  const outPath = join(outDir, filename);
  await writeFile(outPath, redactStrikethrough(normalizeIndents(content)), "utf8");

  console.log(outPath);
}
