import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";

export const getLang = (lang: string) => {
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
      return python();
  }
};
