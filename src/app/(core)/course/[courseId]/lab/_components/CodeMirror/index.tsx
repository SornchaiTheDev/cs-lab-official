import ReactCodeMirror, {
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { getLang } from "./utils/getLang";
import { vim } from "@replit/codemirror-vim";

interface ExtensionMap {
  [key: string]: Extension | null;
}

function CodeMirror(
  props: Omit<ReactCodeMirrorProps, "extensions"> & {
    lang?: string;
    vimMode?: boolean;
  },
) {
  const { lang, vimMode } = props;
  const [extensions, setExtensions] = useState<ExtensionMap>({
    indent: indentWithTab,
  });

  useEffect(() => {
    if (lang !== undefined) {
      const langHighlight = getLang(lang);

      setExtensions((prev) => {
        return {
          ...prev,
          lang: langHighlight,
        };
      });
    }
  }, [lang]);

  useEffect(() => {
    setExtensions((prev) => {
      return {
        ...prev,
        vimMode: vimMode ? vim() : null,
      };
    });
  }, [vimMode]);

  const finalExtensions = Object.values(extensions).filter(
    (ext) => ext !== null,
  );

  return (
    <ReactCodeMirror
      theme={githubLight}
      {...{
        ...props,
        extensions: finalExtensions,
      }}
    />
  );
}

export default CodeMirror;
