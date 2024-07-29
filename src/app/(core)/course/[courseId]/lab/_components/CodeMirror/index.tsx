import ReactCodeMirror, {
  EditorView,
  Extension,
  ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { python } from "@codemirror/lang-python";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

function CodeMirror(props: ReactCodeMirrorProps) {
  const extensions: Extension[] = [python(), indentWithTab];

  return <ReactCodeMirror theme={githubLight} {...{ ...props, extensions }} />;
}

export default CodeMirror;
