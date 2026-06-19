import { useState }       from "react";
import { generateClient } from "aws-amplify/data";
import { uploadData }     from "aws-amplify/storage";
import type { Schema }    from "../../amplify/data/resource";

const client = generateClient<Schema>();

type Props = { onDone: () => void };

export default function CreateNotePage({ onDone }: Props) {
  const [title,  setTitle]  = useState("");
  const [body,   setBody]   = useState("");
  const [file,   setFile]   = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim()) return;
    setSaving(true);

    // Step 1: Upload image to S3 (if the user selected a file)
    let imageKey: string | undefined;
    if (file) {
      imageKey = `note-images/${Date.now()}-${file.name}`;
      await uploadData({ path: imageKey, data: file }).result;
    }

    // Step 2: Save note metadata to DynamoDB via AppSync
    await client.models.Note.create({ title, body, imageKey });

    setSaving(false);
    onDone();
  }

  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginTop: 0 }}>New Note</h2>

      <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 600 }}>
        Title
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title..."
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />

      <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 600 }}>
        Body
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your note here..."
        rows={5}
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />

      <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 600 }}>
        Attach Image{" "}
        <span style={{ fontWeight: 400, color: "#64748b" }}>(stored in S3)</span>
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        style={{ display: "block", marginBottom: "1.5rem" }}
      />

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          style={{
            padding: "0.5rem 1.25rem",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {saving ? "Saving…" : "Save Note"}
        </button>
        <button
          onClick={onDone}
          style={{
            padding: "0.5rem 1.25rem",
            background: "#64748b",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
