/**
 * next/image loader for the static export. Each `srcset` entry points at a
 * pre-resized sibling file, "/_next/static/media/<name>.<hash>.w<width>.<ext>",
 * which scripts/resize-images.mjs generates after `next build`.
 * In development the original file is served (the query only satisfies Next's
 * check that the loader uses `width`).
 */
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width }: LoaderArgs) {
  if (process.env.NODE_ENV !== "production") return `${src}?w=${width}`;
  return src.replace(/(\.[a-z0-9]+)$/i, `.w${width}$1`);
}
