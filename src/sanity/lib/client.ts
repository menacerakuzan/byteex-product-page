import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published content only — served from Sanity's edge CDN.
  useCdn: true,
  perspective: "published",
});
