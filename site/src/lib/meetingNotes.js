import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const MEETING_NOTES_DIR = path.resolve(__dirname, '../../../meeting-notes');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      const val = m[2].trim();
      data[m[1]] = val === 'true' ? true : val === 'false' ? false : val;
    }
  }
  return { data, content: raw.slice(match[0].length) };
}

const ACRONYMS = new Set(['wg', 'api', 'ui', 'ux', 'ci', 'cd']);

export function formatGroupName(group) {
  return group
    .split('-')
    .map(word => ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getAllGroups() {
  if (!fs.existsSync(MEETING_NOTES_DIR)) return [];
  return fs.readdirSync(MEETING_NOTES_DIR).filter(name => {
    const p = path.join(MEETING_NOTES_DIR, name);
    return fs.statSync(p).isDirectory();
  });
}

export function getMeetingsForGroup(group) {
  const dir = path.join(MEETING_NOTES_DIR, group);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = parseFrontmatter(raw);
      const slug = filename.replace('.md', '');
      const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : null;
      const isPrivate = data.private === true;
      const hasRedaction = content.includes('█');
      const firstLine = content.split('\n').find(l => l.trim().startsWith('#')) || '';
      const title = firstLine.replace(/^#+\s*/, '').trim() || slug;
      const preview = content
        .replace(/^#+.*/gm, '')
        .replace(/[*_`[\]#]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160);
      return { filename, slug, date, group, content, isPrivate, hasRedaction, title, preview };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getAllMeetings() {
  return getAllGroups().flatMap(getMeetingsForGroup);
}
