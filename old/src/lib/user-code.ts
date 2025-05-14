import { customAlphabet } from "nanoid";
export const generateCode = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  6
);

// const invitationCode = generateCode(); // Example: "XZ3YQ8"
