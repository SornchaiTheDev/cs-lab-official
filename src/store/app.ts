import { atom } from "jotai";

interface AppAtom {
  isLoading: boolean;
}

export const appAtom = atom<AppAtom>({
  isLoading: true,
});
