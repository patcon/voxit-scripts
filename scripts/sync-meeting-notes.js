import { mkdir, readFile, writeFile } from "fs/promises";
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
  // Matches: # Some Title - 2026/03/06  or  # 2026-03-04 Some Title
  const match = line.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${year}-${month}-${day}`;
}

export function generateFilename(isoDate, keyword) {
  return `${isoDate}-${keyword}.md`;
}

export function parseSourcesCsv(csv) {
  const [headerLine, ...rows] = csv.trim().split("\n");
  const headers = headerLine.split(",");
  return rows
    .map(row => Object.fromEntries(row.split(",").map((v, i) => [headers[i], v.trim()])))
    .filter(row => row.do_backup === "x");
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
  const csvPath = join(process.cwd(), "meeting-notes/sources.csv");
  const sources = parseSourcesCsv(await readFile(csvPath, "utf8"));

  for (const { resource_url, keyword } of sources) {
    const fetchUrl = toFetchUrl(resource_url);
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${resource_url}: ${response.status} ${response.statusText}`);
    }
    const content = await response.text();

    const titleLine = content.split("\n").find(l => l.trim().startsWith("#")) || "";
    const isoDate = parseDateFromTitle(titleLine);
    if (!isoDate) {
      throw new Error(`Could not parse date from title line: ${JSON.stringify(firstLine)}`);
    }

    const outDir = join(process.cwd(), "meeting-notes", keyword);
    await mkdir(outDir, { recursive: true });

    const outPath = join(outDir, generateFilename(isoDate, keyword));
    await writeFile(outPath, redactStrikethrough(normalizeIndents(content)), "utf8");

    console.log(outPath);
  }
}
