import { useEffect, useState } from "react";
import { getUrl }              from "aws-amplify/storage";
import { generateClient }      from "aws-amplify/api";
import type { Schema }         from "../../amplify/data/resource";

const client = generateClient<Schema>();

type Props = {
  note: Schema["Note"]["type"];
  onBack: () => void;
};

export default function NoteDetail({ note, onBack }: Props) {
  const [imageUrl,    setImageUrl]    = useState<string | null>(null);
  const [summary,     setSummary]     = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    if (note.imageKey) {
      getUrl({ path: note.imageKey }).then(({ url }) =>
        setImageUrl(url.toString())
      );
    }
  }, [note.imageKey]);

  async function handleSummarize() {
    setSummarizing(true);
    const { data, errors } = await client.queries.summarizeNote({
      title: note.title ?? "",
      body:  note.body ?? "",
    });
    if (errors && errors.length > 0) {
      console.error("Lambda error:", errors);
    } else {
      setSummary(data ?? null);
    }
    setSummarizing(false);
  }

  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: "1rem",
          padding: "0.4rem 1rem",
          background: "#64748b",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        ← Back to Notes
      </button>

      <h2 style={{ marginTop: 0 }}>{note.title}</h2>
      <p style={{ color: "#334155", lineHeight: 1.7 }}>{note.body}</p>

      {imageUrl && (
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ color: "#4f46e5", fontWeight: 600, marginBottom: "0.5rem" }}>
            Image loaded from S3:
          </p>
          <img
            src={imageUrl}
            alt="Note attachment"
            style={{ maxWidth: "100%", borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          style={{
            padding: "0.5rem 1.25rem",
            background: "#059669",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {summarizing ? "Calling Lambda…" : "Summarize Note (Lambda)"}
        </button>

        {summary && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: 8,
              color: "#166534",
            }}
          >
            <strong>Lambda result:</strong>
            <p style={{ margin: "0.5rem 0 0" }}>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
