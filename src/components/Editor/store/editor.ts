import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface EditorAtom {
  fontSize: number;
  vimMode: boolean;
}

export interface LanguageMap {
  [key: string]: string;
}

export const editorAtom = atomWithStorage<EditorAtom>("editor", {
  fontSize: 16,
  vimMode: false,
});

export interface ProblemAtom {
  problemId: string;
  code: string;
  initialCodes: LanguageMap | null;
  selectedLanguage: string;
  allowLanguages: LanguageMap;
}

export const problemAtom = atom<ProblemAtom>({
  problemId: "",
  code: "",
  initialCodes: null,
  selectedLanguage: "",
  allowLanguages: {},
});
