import "server-only";
import { client } from "./client";
import { PRODUCT_PAGE_QUERY } from "./queries";
import type { ProductPage } from "../types";

export const PRODUCT_PAGE_TAG = "productPage";

/**
 * Loads the product page. Cached with ISR (1 min) and tagged so a Sanity
 * webhook can refresh it instantly via /api/revalidate.
 */
export async function getProductPage() {
  return client.fetch<ProductPage | null>(
    PRODUCT_PAGE_QUERY,
    {},
    { next: { revalidate: 60, tags: [PRODUCT_PAGE_TAG] } },
  );
}
