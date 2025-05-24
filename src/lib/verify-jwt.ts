import { jwtDecode } from "jwt-decode";

export const verifyJWT = (token: string | undefined): string => {
  if (token === undefined) throw new Error("NO_TOKEN");

  const decodedJWT = jwtDecode(token);

  if (decodedJWT.exp === undefined) {
    throw new Error("NO_EXPIRED_TOKEN");
  }

  if (decodedJWT.exp * 1000 < Date.now()) {
    throw new Error("TOKEN_EXPIRED");
  }

  return token;
};
