"use client";
import ReactCodeMirror, {
  type EditorState,
  type Extension,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { indentWithTab } from "./extensions/indentWithTab";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { getLang } from "./utils/getLang";
import { vim } from "@replit/codemirror-vim";
import readOnlyRangeExtension from "codemirror-readonly-ranges";

type ReadOnlyRange = { from: number | undefined; to: number | undefined };

interface ExtensionMap {
  [key: string]: Extension | null;
}

function CodeMirror(
  props: Omit<ReactCodeMirrorProps, "extensions"> & {
    lang?: string;
    vimMode?: boolean;
    readOnlyRange?: (state: EditorState) => ReadOnlyRange[];
  },
) {
  const { lang, vimMode, readOnlyRange } = props;
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
          readOnlyRange: !!readOnlyRange
            ? readOnlyRangeExtension(readOnlyRange)
            : null,
        };
      });
    }
  }, [lang, vimMode, readOnlyRange]);

  const finalExtensions = Object.values(extensions).filter(
    (ext) => ext !== null,
  );

  const codeMirrorProps = Object.entries(props).reduce(
    (acc: ReactCodeMirrorProps, [key, value]) => {
      if (!["lang", "vimMode", "readOnlyRange"].includes(key)) {
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
