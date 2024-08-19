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
import readOnlyRange from "codemirror-readonly-ranges";

const getReadOnlyRange = (
  state: EditorState,
): { from: number | undefined; to: number | undefined }[] => {
  return [
    {
      from: undefined,
      to: state.doc.line(3).to,
    },
  ];
};

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
    readOnly: readOnlyRange(getReadOnlyRange),
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

  const codeMirrorProps = Object.entries(props).reduce(
    (acc: ReactCodeMirrorProps, [key, value]) => {
      if (key !== "lang" && key !== "vimMode") {
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
