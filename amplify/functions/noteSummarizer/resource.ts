import { defineFunction } from "@aws-amplify/backend";

export const noteSummarizer = defineFunction({
  name: "noteSummarizer",
  entry: "./handler.ts",
});
