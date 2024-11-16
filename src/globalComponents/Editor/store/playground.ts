import { atom } from "jotai";

interface Playground {
  input: string;
  output: string;
}

export const playgroundAtom = atom<Playground>({
  input: "",
  output: "",
});
