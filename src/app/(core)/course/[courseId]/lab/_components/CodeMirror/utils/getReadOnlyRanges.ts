import type { EditorState } from "@codemirror/state";
import type { ReadOnlyRange } from "../types";

export const getReadOnlyRanges = (
  state: EditorState,
  initialCode: string,
): ReadOnlyRange[] => {
  // Extract readonly parts from initial code
  const readonlyParts = initialCode.match(
    /@@readonly@@([\s\S]*?)@@readonly@@/g,
  );

  if (readonlyParts === null) return [];

  const cleanedReadonlyParts = readonlyParts
    .map((part) => part.replaceAll(/@@readonly@@/g, "").split("\n"))
    .flat()
    .filter(
      (line) =>
        line !== "" && !line.match(/^[\s]*@@editable@@[\s\S]*?@@editable@@$/),
    );

  const ranges: ReadOnlyRange[] = [];

  let lineMatchCount = 0;

  // Split current code into lines and compare with initial code to find readonly parts
  const currentCode = state.doc.toString();
  const currentCodeLines = currentCode.split("\n");

  currentCodeLines.forEach((line, index) => {
    const currentLine = index + 1;
    const from = state.doc.line(currentLine).from;
    const to = state.doc.line(currentLine).to;

    const currentReadOnlyLineMatch = cleanedReadonlyParts[lineMatchCount];

    if (line === currentReadOnlyLineMatch) {
      ranges.push({
        from,
        to,
      });
      lineMatchCount++;
      return;
    }

    if (currentReadOnlyLineMatch?.includes("@@editable@@")) {
      const editableParts = currentReadOnlyLineMatch
        .split("@@editable@@")
        .filter((_, i) => i % 2 === 0);

      let editableRegex = new RegExp(`${editableParts.join("[\\s\\S]*")}`);
      if (!editableRegex.test(line)) return;

      editableParts.forEach((part) => {
        ranges.push({
          from: from + line.indexOf(part),
          to: from + part.length,
        });
      });
      lineMatchCount++;
      return;
    }

    if (currentReadOnlyLineMatch?.includes("@@exclude@@")) {
      const editableParts = currentReadOnlyLineMatch
        .split("@@exclude@@")
        .filter((_, i) => i % 2 === 1);

      let editableRegex = new RegExp(`${editableParts.join(" ")}`);
      if (!editableRegex.test(line)) return;

      let position = 0;
      editableParts.forEach((part) => {
        ranges.push({
          from: from + line.indexOf(part, position),
          to: from + part.length + 1,
        });

        position = part.length;
      });
      lineMatchCount++;
      return;
    }
  });
  return ranges;
};
