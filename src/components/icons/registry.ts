import type { ComponentType, SVGProps } from "react";
import {
  CartLeafIcon,
  Co2Icon,
  EnergyIcon,
  LeafIcon,
  ShieldIcon,
  StoreIcon,
  SunMoonIcon,
  TruckIcon,
  WaterIcon,
  WavesIcon,
} from ".";

/**
 * Icons editors can pick in the CMS. Keys are stored in Sanity,
 * so renaming a key requires a content migration.
 */
export const contentIcons = {
  sunMoon: { title: "Sun & moon", component: SunMoonIcon },
  cartLeaf: { title: "Eco cart", component: CartLeafIcon },
  store: { title: "Eco store", component: StoreIcon },
  leaf: { title: "Leaf", component: LeafIcon },
  waves: { title: "Soft fabric", component: WavesIcon },
  truck: { title: "Delivery truck", component: TruckIcon },
  shield: { title: "Shield", component: ShieldIcon },
  co2: { title: "CO2 cloud", component: Co2Icon },
  water: { title: "Water drop", component: WaterIcon },
  energy: { title: "Energy", component: EnergyIcon },
} satisfies Record<
  string,
  { title: string; component: ComponentType<SVGProps<SVGSVGElement>> }
>;

export type ContentIconName = keyof typeof contentIcons;

export const contentIconOptions = Object.entries(contentIcons).map(
  ([value, { title }]) => ({ value, title }),
);
