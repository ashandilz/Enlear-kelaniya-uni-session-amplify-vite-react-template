import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import type { Schema } from "../amplify/data/resource";
import NavBar         from "./components/NavBar";
import NotesListPage  from "./pages/NotesListPage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetail     from "./components/NoteDetail";

type View =
  | "list"
  | "create"
  | { type: "detail"; note: Schema["Note"]["type"] };

function App() {
  const [view, setView] = useState<View>("list");

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "1rem" }}>
          <NavBar
            username={user?.signInDetails?.loginId ?? ""}
            onSignOut={signOut!}
            onNavigate={(v) => setView(v)}
          />

          {view === "list" && (
            <NotesListPage
              onSelectNote={(note) => setView({ type: "detail", note })}
            />
          )}

          {view === "create" && (
            <CreateNotePage onDone={() => setView("list")} />
          )}

          {typeof view === "object" && view.type === "detail" && (
            <NoteDetail note={view.note} onBack={() => setView("list")} />
          )}
        </div>
      )}
    </Authenticator>
  );
}

export default App;
