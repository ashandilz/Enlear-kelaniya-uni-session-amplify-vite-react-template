import type { Schema } from "../../data/resource";

export const handler: Schema["summarizeNote"]["functionHandler"] = async (event) => {
  const { title, body } = event.arguments;
  const wordCount = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return `"${title}" — ${wordCount} word${wordCount !== 1 ? "s" : ""}. This note was summarized by a Lambda function running on AWS!`;
};
