export const env = (key: keyof Env["env"]) => {
  if (typeof window === "undefined") {
    return process.env["SERVER_" + key];
  }

  return window.env[("CLIENT_" + key) as keyof ClientEnv["env"]];
};
