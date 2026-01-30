/**
 * Base path for GitHub Pages (e.g. /nefl-frontend). Empty when running locally.
 * Set NEXT_PUBLIC_BASE_PATH in the build env so image/asset URLs resolve correctly.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a path with basePath so assets load correctly on GitHub Pages.
 * Use for all /images/... and other public asset paths.
 */
export function assetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${p}` : p;
}
