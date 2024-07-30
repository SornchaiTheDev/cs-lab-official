import { useAtom } from "jotai";
import { editorAtom } from "../store/editor";

export interface SetupEditor {
  labSlug: string;
  initialCode: string;
  allowLanguages: string[];
}

function useEditor() {
  const [
    { code, initialCode, fontSize, selectedLanguage, allowLanguages },
    setEditor,
  ] = useAtom(editorAtom);

  const resetEditor = () => {
    setEditor((prev) => ({ ...prev, code: initialCode }));
  };

  const changeFontSize = (fontSize: number) => {
    setEditor((prev) => ({ ...prev, fontSize }));
  };

  const setSelectedLanguage = (language: string) => {
    setEditor((prev) => ({ ...prev, selectedLanguage: language }));
  };

  const setup = ({
    initialCode,
    allowLanguages,
    labSlug: _labSlug,
  }: SetupEditor) => {
    setEditor((prev) => ({
      ...prev,
      initialCode,
      labSlug: _labSlug,
      allowLanguages,
      selectedLanguage: allowLanguages[0],
    }));
  };

  const setCode = (code: string) => setEditor((prev) => ({ ...prev, code }));

  return {
    code,
    setCode,
    resetEditor,
    changeFontSize,
    fontSize,
    setSelectedLanguage,
    selectedLanguage,
    allowLanguages,
    setup,
  };
}

export default useEditor;
