import { atom } from "jotai";

interface SidebarStore {
  isCollapse: boolean;
  width: number;
  isFirstMount: boolean;
}

export const sidebarAtom = atom<SidebarStore>({
  isCollapse: false,
  width: 300,
  isFirstMount: true,
});

export const toggleSidebarAtom = atom(null, (get, set, _) => {
  const isCollapse = get(sidebarAtom).isCollapse;
  set(sidebarAtom, {
    isCollapse: !isCollapse,
    width: isCollapse ? 300 : 80,
    isFirstMount: false,
  });
});
