import { useEffect, useState } from "react";
import { generateClient }      from "aws-amplify/data";
import type { Schema }         from "../../amplify/data/resource";
import NoteCard                from "../components/NoteCard";

const client = generateClient<Schema>();

type Props = {
  onSelectNote: (note: Schema["Note"]["type"]) => void;
};

export default function NotesListPage({ onSelectNote }: Props) {
  const [notes, setNotes] = useState<Schema["Note"]["type"][]>([]);

  useEffect(() => {
    const sub = client.models.Note.observeQuery().subscribe({
      next: ({ items }) => setNotes([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  if (notes.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#64748b", marginTop: "3rem" }}>
        No notes yet. Click <strong>+ New Note</strong> to create your first one!
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onClick={() => onSelectNote(note)} />
      ))}
    </div>
  );
}
