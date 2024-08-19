export function getStoredCode(
  problemId: string,
  selectedLanguage: string,
): string | null {
  const key = `${problemId}-${selectedLanguage}`;
  return localStorage.getItem(key);
}

export function setStoredCode(
  problemId: string,
  selectedLanguage: string,
  code: string,
) {
  const key = `${problemId}-${selectedLanguage}`;
  localStorage.setItem(key, code);
}
