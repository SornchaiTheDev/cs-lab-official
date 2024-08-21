import { useAtom } from "jotai";
import { editorAtom, type LanguageMap, problemAtom } from "../store/editor";
import { useCallback } from "react";
import { getStoredCode, setStoredCode } from "../utils/storeCode";
import { getSelectedLang } from "../utils/getSelectedLang";

export interface SetupEditor {
  problemId: string;
  initialCodes: LanguageMap;
  allowLanguages: LanguageMap;
}

function useEditor() {
  const [editor, setEditor] = useAtom(editorAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  const resetEditor = () => {
    const { problemId, selectedLanguage, initialCodes } = problem;

    const initialCode = initialCodes[selectedLanguage].replaceAll(
      /@@readonly@@\n?|@@editable@@/g,
      "",
    );

    setStoredCode(problemId, selectedLanguage, initialCode);

    setProblem((prev) => ({ ...prev, code: initialCode }));
  };

  const changeFontSize = (fontSize: number) => {
    setEditor((prev) => ({ ...prev, fontSize }));
  };

  const setVimMode = (vimMode: boolean) => {
    setEditor((prev) => ({ ...prev, vimMode }));
  };

  const setSelectedLanguage = (selectedLang: string) => {
    const { problemId, initialCodes } = problem;

    localStorage.setItem(`${problem.problemId}-selectedLanguage`, selectedLang);

    const code =
      getStoredCode(problemId, selectedLang) ?? initialCodes[selectedLang];

    setProblem((prev) => ({
      ...prev,
      code,
      selectedLanguage: selectedLang,
    }));
  };

  const setup = useCallback(
    ({ initialCodes, allowLanguages, problemId }: SetupEditor) => {
      const editorSettings = localStorage.getItem("editor");

      // Setup editor settings
      if (editorSettings === null) {
        setEditor((prev) => prev);
      } else {
        setEditor(JSON.parse(editorSettings));
      }

      // Setup Problem
      const selectedLanguage = getSelectedLang(problemId, allowLanguages);
      const initialCode = initialCodes[selectedLanguage];
      const code = getStoredCode(problemId, selectedLanguage) ?? initialCode;

      setProblem({
        initialCodes,
        allowLanguages,
        code,
        selectedLanguage,
        problemId,
      });
    },
    [setEditor, setProblem],
  );

  const setCode = (code: string) => {
    const { problemId, selectedLanguage } = problem;

    setStoredCode(problemId, selectedLanguage, code);

    setProblem((prev) => ({ ...prev, code }));
  };

  return {
    setCode,
    resetEditor,
    changeFontSize,
    setSelectedLanguage,
    setup,
    setVimMode,
    ...problem,
    ...editor,
  };
}

export default useEditor;
