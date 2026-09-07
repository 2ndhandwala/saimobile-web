#!/usr/bin/env node
// Walks public/images/**, converts every .jpg/.jpeg to .webp, deletes the
// source jpeg. Skips files that already have an up-to-date .webp sibling.
// Icons (.png) are left alone so PWA/OG surfaces keep the exact bytes.
// Runs on `predev` and `prebuild` so future uploads convert automatically.

import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/images/", import.meta.url).pathname;
const QUALITY = 82;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function convert(file) {
  const webp = file.replace(/\.(jpe?g)$/i, ".webp");
  if (existsSync(webp)) {
    const [src, dst] = await Promise.all([stat(file), stat(webp)]);
    if (dst.mtimeMs >= src.mtimeMs) {
      await unlink(file);
      return { file, action: "skip-existing" };
    }
  }
  await sharp(file).webp({ quality: QUALITY }).toFile(webp);
  await unlink(file);
  return { file, action: "converted" };
}

const files = (await walk(ROOT)).filter((f) => /\.jpe?g$/i.test(extname(f)));
if (!files.length) process.exit(0);

const results = await Promise.all(files.map(convert));
for (const r of results) console.log(`[webp] ${r.action}: ${r.file}`);
