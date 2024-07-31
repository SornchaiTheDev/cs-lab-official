import { atomWithStorage } from "jotai/utils";

interface EditorAtom {
  fontSize: number;
}

export const editorAtom = atomWithStorage<EditorAtom>("editor", {
  fontSize: 16,
});

export interface ProblemAtom {
  problemId: string;
  code: string;
  initialCode: string;
  selectedLanguage: string;
  allowLanguages: string[];
}

export const problemAtom = atomWithStorage<ProblemAtom>("problem", {
  problemId: "",
  code: "",
  initialCode: "",
  selectedLanguage: "",
  allowLanguages: [],
});
