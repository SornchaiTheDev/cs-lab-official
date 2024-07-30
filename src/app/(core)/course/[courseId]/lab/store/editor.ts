import { atom } from "jotai";

interface EditorAtom {
  initialCode: string;
  code: string;
  fontSize: number;
}

export const editorAtom = atom<EditorAtom>({
  initialCode: "print('Hello World')",
  code: "print('Hello World')",
  fontSize: 16,
});
