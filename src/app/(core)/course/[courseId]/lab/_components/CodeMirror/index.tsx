"use client";
import ReactCodeMirror, {
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { getLang } from "./utils/getLang";
import { vim } from "@replit/codemirror-vim";
import readOnlyRangeExtension from "codemirror-readonly-ranges";
import { getReadOnlyRanges } from "./utils/getReadOnlyRanges";
import type { ExtensionMap } from "./types";

function CodeMirror(
  props: Omit<ReactCodeMirrorProps, "extensions"> & {
    lang?: string;
    vimMode?: boolean;
    initialCode?: string;
  },
) {
  const { lang, vimMode, initialCode = "" } = props;
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
          vimMode: vimMode ? vim() : null,
          readOnlyRange: readOnlyRangeExtension((state) =>
            getReadOnlyRanges(state, initialCode),
          ),
        };
      });
    }
  }, [lang, vimMode, initialCode]);

  const finalExtensions = Object.values(extensions).filter(
    (ext) => ext !== null,
  );

  const codeMirrorProps = Object.entries(props).reduce(
    (acc: ReactCodeMirrorProps, [key, value]) => {
      if (!["lang", "vimMode", "initialCode"].includes(key)) {
        acc[key as keyof ReactCodeMirrorProps] = value;
      }
      return acc;
    },
    {},
  );

  return (
    <ReactCodeMirror
      theme={githubLight}
      {...{
        ...codeMirrorProps,
        extensions: finalExtensions,
      }}
    />
  );
}

export default CodeMirror;
