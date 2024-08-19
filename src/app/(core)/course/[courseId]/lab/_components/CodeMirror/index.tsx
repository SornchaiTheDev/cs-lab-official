import ReactCodeMirror, {
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { githubLight } from "@uiw/codemirror-theme-github";

import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";

export const getLanguage = (lang: string) => {
  switch (lang) {
    case "python":
      return python();
    case "go":
      return go();
    case "cpp":
      return cpp();
    case "java":
      return java();
    case "javascript":
      return javascript();
    default:
      return python();
  }
};

function CodeMirror(props: ReactCodeMirrorProps & { lang: string }) {
  const extensions: Extension[] = [getLanguage(props.lang), indentWithTab];

  return <ReactCodeMirror theme={githubLight} {...{ ...props, extensions }} />;
}

export default CodeMirror;
