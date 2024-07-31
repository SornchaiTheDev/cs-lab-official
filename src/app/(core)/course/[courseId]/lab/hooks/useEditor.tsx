import { useAtom } from "jotai";
import { editorAtom, ProblemAtom, problemAtom } from "../store/editor";

export interface SetupEditor {
  problemId: string;
  initialCode: string;
  allowLanguages: string[];
}

function useEditor() {
  const [editor, setEditor] = useAtom(editorAtom);

  const [problem, setProblem] = useAtom(problemAtom);

  const resetEditor = () => {
    if (problem === null) return;
    setProblem((prev) => ({ ...prev, initialCode: problem.initialCode }));
  };

  const changeFontSize = (fontSize: number) => {
    setEditor({ fontSize });
  };

  const setSelectedLanguage = (language: string) => {
    setProblem((prev) => ({ ...prev, selectedLanguage: language }));
  };

  const setup = ({ initialCode, allowLanguages, problemId }: SetupEditor) => {
    const problemValues = localStorage.getItem("problem");
    const editorValues = localStorage.getItem("editor");
    if (editorValues === null) {
      setEditor((prev) => ({ ...prev, fontSize: 16 }));
    }

    if (problemValues === null) {
      setProblem({
        initialCode,
        allowLanguages,
        code: initialCode,
        selectedLanguage: allowLanguages[0],
        problemId,
      });
    }

    if (editorValues !== null && problemValues !== null) {
      setEditor(JSON.parse(editorValues));

      const problemData: ProblemAtom = JSON.parse(problemValues);
      if (problemData.problemId === problemId) {
        setProblem(problemData);
        return;
      }

      setProblem({
        initialCode,
        allowLanguages,
        code: initialCode,
        selectedLanguage: allowLanguages[0],
        problemId,
      });
    }
  };

  const setCode = (code: string) => {
    setProblem((prev) => ({ ...prev, code }));
  };

  return {
    setCode,
    resetEditor,
    changeFontSize,
    setSelectedLanguage,
    setup,
    ...problem,
    ...editor,
  };
}

export default useEditor;
