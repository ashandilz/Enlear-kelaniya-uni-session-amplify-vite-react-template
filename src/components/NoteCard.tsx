import type { Schema } from "../../amplify/data/resource";

type Props = {
  note: Schema["Note"]["type"];
  onClick: () => void;
};

export default function NoteCard({ note, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        cursor: "pointer",
        background: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e293b" }}>{note.title}</h3>
      <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
        {(note.body ?? "").substring(0, 80)}
        {(note.body ?? "").length > 80 ? "…" : ""}
      </p>
      {note.imageKey && (
        <span
          style={{
            display: "block",
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: "#4f46e5",
          }}
        >
          Image attached (stored in S3)
        </span>
      )}
    </div>
  );
}
