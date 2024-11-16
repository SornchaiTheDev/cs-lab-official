import { type EditorView, keymap } from "@uiw/react-codemirror";

export const indentWithTab = keymap.of([
  {
    key: "Tab",
    run: (view: EditorView) => {
      view.dispatch(view.state.replaceSelection("  ")); // Insert two spaces
      return true;
    },
  },
]);
