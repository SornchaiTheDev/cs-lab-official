"use client";

import CodeMirror from "~/globalComponents/Editor/CodeMirror";
import CodeHeader from "../CodeHeader";
import useEditor from "../hooks/useEditor";
import { useEffect } from "react";

function CodeBlock() {
  const {
    setup,
    fontSize,
    code,
    setCode,
    selectedLanguage,
    vimMode,
    initialCode,
  } = useEditor();

  useEffect(() => {
    setup({ allowLanguages: { python: "python" }, problemId: "1" });
  }, [setup]);

  return (
    <div>
      <CodeHeader />
      <CodeMirror
        height="100%"
        style={{ fontSize }}
        lang={selectedLanguage}
        value={code}
        onChange={setCode}
        vimMode={vimMode}
        {...{ initialCode }}
      />
    </div>
  );
}

export default CodeBlock;
