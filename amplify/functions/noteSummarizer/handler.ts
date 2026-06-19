export const handler = async (event: { title: string; body: string }) => {
  const wordCount = (event.body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return {
    summary: `"${event.title}" — ${wordCount} word${wordCount !== 1 ? "s" : ""}. This note was summarized by a Lambda function running on AWS!`,
  };
};
