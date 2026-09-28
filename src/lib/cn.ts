/** Joins truthy class names — tiny alternative to clsx for this project. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
