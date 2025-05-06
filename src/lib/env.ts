export const env = (key: keyof Env["env"]) => {
  if (typeof window === "undefined") {
    return process.env[key];
  }

  return window.env[key];
};
