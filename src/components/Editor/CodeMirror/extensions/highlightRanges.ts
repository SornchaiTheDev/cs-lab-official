import {
  type EditorView,
  type DecorationSet,
  type ViewUpdate,
  Decoration,
  ViewPlugin,
} from "@codemirror/view";
import { RangeSetBuilder, type EditorState } from "@codemirror/state";

// Function to create the decoration for the highlight
const highlightMark = Decoration.mark({
  attributes: { style: "background-color: #FFEE9C; border-radius : 4px;" },
});

// Define the interface for the range
interface HighlightRange {
  from: number;
  to: number;
}

// Plugin that accepts a function returning ranges based on the EditorState
const createHighlightPlugin = (
  getRanges: (state: EditorState) => HighlightRange[],
) =>
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      // Build decorations based on the provided ranges
      buildDecorations(view: EditorView): DecorationSet {
        const ranges = getRanges(view.state);
        let builder = new RangeSetBuilder<Decoration>();
        for (let range of ranges) {
          builder.add(range.from, range.to, highlightMark);
        }
        return builder.finish();
      }
    },
    {
      decorations: (v) => v.decorations,
    },
  );

// Export the factory function to create the extension
export const highlightExtension = (
  getRanges: (state: EditorState) => HighlightRange[],
) => [createHighlightPlugin(getRanges)];
