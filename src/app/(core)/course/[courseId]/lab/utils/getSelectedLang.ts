import type { Language } from "../store/editor";

export function getSelectedLang(problemId: string, allowLanguages: Language) {
  const storedSelectedLang = localStorage.getItem(
    `${problemId}-selectedLanguage`,
  );

  if (storedSelectedLang !== null) {
    return storedSelectedLang;
  }

  return Object.keys(allowLanguages)[0];
}
