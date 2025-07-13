import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";

export const getLang = (lang: string): LanguageSupport | null => {
  switch (lang) {
    case "python":
      return python();
    case "go":
      return go();
    case "cpp":
    case "c":
      return cpp();
    case "java":
      return java();
    case "javascript":
      return javascript();
    default:
      return null;
  }
};
