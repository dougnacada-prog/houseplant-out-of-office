import { writeFileSync } from "node:fs";

const entry =
  "Out of office. The plant you are trying to reach died in March. This message is automated. So was the watering.";

// The entry is the whole joke: an auto-reply from a plant that is already
// dead, sent by the same automation that never watered it.
// Gate: 1-120 characters, one line, not only whitespace, no leading/trailing
// whitespace, no control characters, no trailing newline in the output.
function validateEntry(text: string): void {
  const singleLine = /^[^\n]{1,120}$/.test(text);
  const noSurroundingSpace = text.trim().length > 0 && text === text.trim();
  const noControlChars = !/[\u0000-\u001f\u007f]/.test(text);
  if (!singleLine || !noSurroundingSpace || !noControlChars) {
    throw new Error("entry fails gate: must be 1-120 chars, single line, no surrounding whitespace");
  }
}

validateEntry(entry);

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
writeFileSync(out, entry, "utf8");
