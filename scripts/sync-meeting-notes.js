import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const PAD_URL =
  "https://pad.riseup.net/p/ALIvNYwJmo_llWuLsD2U-keep/export/txt";

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

export function censorStrikethrough(text, charsPerBlock = 5) {
  return text.replace(/~~([^~]+)~~/g, (_, inner) =>
    "█".repeat(Math.ceil(inner.length / charsPerBlock))
  );
}

if (import.meta.main) {
  const response = await fetch(PAD_URL);
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
  await writeFile(outPath, censorStrikethrough(normalizeIndents(content)), "utf8");

  console.log(outPath);
}
