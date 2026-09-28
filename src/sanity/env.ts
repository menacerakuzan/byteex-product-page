// Project ID and dataset are public identifiers (the dataset is read-only
// for anonymous users), so sensible defaults keep the repo runnable
// without any local configuration.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8apnhmq3";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-01";
