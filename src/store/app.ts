import { atom } from "jotai";

interface AppAtom {
  isLoading: boolean;
  isNavigating: boolean;
}

export const appAtom = atom<AppAtom>({
  isLoading: true,
  isNavigating: false,
});
