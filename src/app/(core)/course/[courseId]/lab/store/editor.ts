import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface EditorAtom {
  fontSize: number;
}

export interface LanguageMap {
  [key: string]: string;
}

export const editorAtom = atomWithStorage<EditorAtom>("editor", {
  fontSize: 16,
});

export interface ProblemAtom {
  problemId: string;
  code: string;
  initialCodes: LanguageMap;
  selectedLanguage: string;
  allowLanguages: LanguageMap;
}

export const problemAtom = atom<ProblemAtom>({
  problemId: "",
  code: "",
  initialCodes: {},
  selectedLanguage: "",
  allowLanguages: {},
});
