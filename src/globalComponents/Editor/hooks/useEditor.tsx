import { useAtom } from "jotai";
import { editorAtom, type LanguageMap, problemAtom } from "../store/editor";
import { useCallback, useMemo } from "react";
import { getStoredCode, setStoredCode } from "../utils/storeCode";
import { getSelectedLang } from "../utils/getSelectedLang";

export interface SetupEditor {
  problemId: string;
  allowLanguages: LanguageMap;
  initialCodes?: LanguageMap | null;
}

const cleanDecorators = (code: string) => {
  return code.replaceAll(
    /@@readonly@@\n?|@@editable@@|@@exclude@@|@@hidden@@[\s\S]*?@@hidden@@\n?/g,
    "",
  );
};

function useEditor() {
  const [editor, setEditor] = useAtom(editorAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  const resetEditor = () => {
    const { problemId, selectedLanguage, initialCodes } = problem;

    let initialCode = "";
    if (initialCodes !== null) {
      initialCode = cleanDecorators(initialCodes[selectedLanguage]);
    }

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

    let initialCode = "";

    if (initialCodes !== null) {
      initialCode = cleanDecorators(initialCodes[selectedLang]);
    }

    const code = getStoredCode(problemId, selectedLang) ?? initialCode;

    setProblem((prev) => ({
      ...prev,
      code,
      selectedLanguage: selectedLang,
    }));
  };

  const setup = useCallback(
    ({ initialCodes = null, allowLanguages, problemId }: SetupEditor) => {
      const editorSettings = localStorage.getItem("editor");

      // Setup editor settings
      if (editorSettings === null) {
        setEditor((prev) => prev);
      } else {
        setEditor(JSON.parse(editorSettings));
      }

      // Setup Problem
      const selectedLanguage = getSelectedLang(problemId, allowLanguages);
      let initialCode = "";

      if (initialCodes !== null) {
        initialCode = cleanDecorators(initialCodes[selectedLanguage] ?? "");
      }

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

  const { initialCodes, selectedLanguage } = problem;

  const initialCode = useMemo(() => {
    const isNoInitialCode = initialCodes === null;

    if (isNoInitialCode) return "";

    return initialCodes[selectedLanguage];
  }, [initialCodes, selectedLanguage]);

  return {
    setCode,
    resetEditor,
    changeFontSize,
    setSelectedLanguage,
    setup,
    setVimMode,
    initialCode,
    ...problem,
    ...editor,
  };
}

export default useEditor;
