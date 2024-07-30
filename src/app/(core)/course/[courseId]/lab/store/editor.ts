import { atomWithStorage } from "jotai/utils";

interface EditorAtom {
  initialCode: string;
  code: string;
  fontSize: number;
  selectedLanguage: string;
  allowLanguages: string[];
}

export const editorAtom = atomWithStorage<EditorAtom>("editor-store", {
  initialCode: "",
  code: "",
  fontSize: 16,
  selectedLanguage: "",
  allowLanguages: [],
});

export const labSlugAtom = atomWithStorage<string>("lab-slug", "");
