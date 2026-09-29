import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Responses are already cached by Next.js (ISR + tags), so query the live
  // API: the Sanity CDN could serve stale data right after a publish webhook.
  useCdn: false,
  perspective: "published",
});
