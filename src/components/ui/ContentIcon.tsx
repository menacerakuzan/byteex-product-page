import type { SVGProps } from "react";
import { contentIcons, type ContentIconName } from "@/components/icons/registry";

type ContentIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name?: string | null;
};

export function ContentIcon({ name, ...props }: ContentIconProps) {
  const icon = name ? contentIcons[name as ContentIconName] : undefined;
  if (!icon) return null;
  const Icon = icon.component;
  return <Icon {...props} />;
}
