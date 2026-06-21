import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "studentNotesStorage",
  access: (allow) => ({
    "note-images/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
