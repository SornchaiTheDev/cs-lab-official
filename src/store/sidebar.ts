import { atom } from "jotai";
import { sidebarWidth } from "~/app/(core)/components/Menus/constants";

interface SidebarStore {
  isCollapse: boolean;
  width: number | string;
}

export const sidebarAtom = atom<SidebarStore>({
  isCollapse: false,
  width: sidebarWidth,
});

export const toggleSidebarAtom = atom(null, (get, set, _) => {
  const isCollapse = get(sidebarAtom).isCollapse;
  set(sidebarAtom, {
    isCollapse: !isCollapse,
    width: isCollapse ? sidebarWidth : 0,
  });
});
