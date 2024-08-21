import type { Extension } from "@codemirror/state";

export type ReadOnlyRange = {
  from: number;
  to: number;
};

export interface ExtensionMap {
  [key: string]: Extension | null;
}
