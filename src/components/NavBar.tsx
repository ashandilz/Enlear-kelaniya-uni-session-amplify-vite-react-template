type Props = {
  username: string;
  onSignOut: () => void;
  onNavigate: (view: "list" | "create") => void;
};

export default function NavBar({ username, onSignOut, onNavigate }: Props) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        background: "#4f46e5",
        color: "white",
        borderRadius: 8,
        marginBottom: "1.5rem",
      }}
    >
      <strong style={{ fontSize: "1.2rem" }}>Student Notes</strong>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          onClick={() => onNavigate("list")}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "0.3rem 0.75rem",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          My Notes
        </button>
        <button
          onClick={() => onNavigate("create")}
          style={{
            background: "white",
            color: "#4f46e5",
            border: "none",
            padding: "0.3rem 0.75rem",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + New Note
        </button>
        <span style={{ fontSize: "0.85rem", opacity: 0.85 }}>{username}</span>
        <button
          onClick={onSignOut}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "0.3rem 0.75rem",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
