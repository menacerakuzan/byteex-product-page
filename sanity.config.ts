"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Byteex",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Hide the singleton from the global "Create new" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== "productPage"),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === "productPage"
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});

