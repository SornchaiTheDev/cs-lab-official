import ReactCodeMirror, {
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { getLang } from "./utils/getLang";

function CodeMirror(props: ReactCodeMirrorProps & { lang?: string }) {
  const [extensions, setExtensions] = useState<Extension[]>([indentWithTab]);

  useEffect(() => {
    if (props.lang !== undefined) {
      const langHighlight = getLang(props.lang);

      setExtensions((prev) => [...prev, langHighlight]);
    }
  }, [props.lang]);

  return <ReactCodeMirror theme={githubLight} {...{ ...props, extensions }} />;
}

export default CodeMirror;
