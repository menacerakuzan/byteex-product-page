import type { StructureResolver } from "sanity/structure";

export const PRODUCT_PAGE_ID = "productPage";

/** Pins the product page as a singleton so editors can't create duplicates. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Product page")
        .id(PRODUCT_PAGE_ID)
        .child(
          S.document()
            .schemaType("productPage")
            .documentId(PRODUCT_PAGE_ID)
            .title("Product page"),
        ),
    ]);
