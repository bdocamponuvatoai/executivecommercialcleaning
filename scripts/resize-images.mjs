// Generates the responsive image variants referenced by the static export.
// src/lib/image-loader.ts rewrites each srcset entry to
// "/_next/static/media/<file>.w<width>.<ext>"; this script finds every such
// reference in out/ and writes the file: resized when narrower than the
// original, otherwise a copy. Runs automatically after `npm run build`.
import { copyFile, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("out");
const MEDIA_DIR = path.join(OUT_DIR, "_next", "static", "media");
const VARIANT =
  /\/_next\/static\/media\/([^"'\s,?)]+?)\.w(\d+)\.(webp|png|jpe?g)/g;
const QUALITY = { webp: 74, png: 90, jpg: 80, jpeg: 80 };

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? listFiles(p) : [p];
    }),
  );
  return nested.flat();
}

const exists = (file) =>
  stat(file).then(
    () => true,
    () => false,
  );

const wanted = new Map();
for (const file of await listFiles(OUT_DIR)) {
  if (!/\.(html|txt|js)$/.test(file)) continue;
  for (const [, base, width, ext] of (await readFile(file, "utf8")).matchAll(
    VARIANT,
  )) {
    wanted.set(`${base}.w${width}.${ext}`, { base, width: Number(width), ext });
  }
}

let resized = 0;
let copied = 0;
for (const [name, { base, width, ext }] of wanted) {
  const source = path.join(MEDIA_DIR, `${base}.${ext}`);
  const target = path.join(MEDIA_DIR, name);
  if (!(await exists(source)))
    throw new Error(`Missing source image for ${name}`);
  const { width: originalWidth } = await sharp(source).metadata();
  if (width >= originalWidth) {
    await copyFile(source, target);
    copied++;
    continue;
  }
  const format = ext === "jpg" ? "jpeg" : ext;
  await sharp(source)
    .resize({ width })
    [format]({ quality: QUALITY[ext] })
    .toFile(target);
  resized++;
}

console.log(
  `Image variants: ${resized} resized, ${copied} copied (${wanted.size} referenced)`,
);
