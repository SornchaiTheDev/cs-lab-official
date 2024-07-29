import { atom } from "jotai";

interface LabEditorAtom {
  initialCode: string;
  code: string;
  fontSize: number;
}

export const labEditorAtom = atom<LabEditorAtom>({
  initialCode: "print('Hello World')",
  code: "print('Hello World')",
  fontSize: 16,
});
