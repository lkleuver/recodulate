/**
 * Return a slugified copy of a string.
 *
 * @param string - The string to be slugified
 */
export function toSlug(str: string): string {
  let s = str;
  if (!s) {
    return "";
  }
  s = s.toLowerCase().trim();
  s = s.replace(/ & /g, " and ");
  s = s.replace(/[ ]+/g, "-");
  s = s.replace(/[-]+/g, "-");
  s = s.replace(/[^a-z0-9-]+/g, "");
  s = s.length > 32 ? s.substr(0, 32) : s;
  return s;
}
