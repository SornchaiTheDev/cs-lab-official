import type { LanguageMap } from "../store/editor";

export function getSelectedLang(
  problemId: string,
  allowLanguages: LanguageMap,
) {
  const storedSelectedLang = localStorage.getItem(
    `${problemId}-selectedLanguage`,
  );

  if (storedSelectedLang !== null) {
    return storedSelectedLang;
  }

  return Object.keys(allowLanguages)[0];
}
