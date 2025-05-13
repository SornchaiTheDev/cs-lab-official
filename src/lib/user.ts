import { jwtDecode } from "jwt-decode";
import type { AccessTokenPayload } from "~/types/access-token";
import type { JWTUser } from "~/types/user";

export const getUser = (accessToken: string): JWTUser => {
  const decodedJWT = jwtDecode<AccessTokenPayload>(accessToken);

  if (decodedJWT.exp * 1000 < Date.now()) {
    throw new Error("TOKEN_EXPIRED");
  }

  return {
    id: decodedJWT.sub,
    username: decodedJWT.username,
    displayName: decodedJWT.displayName,
    profileImage: decodedJWT.profileImage,
    roles: decodedJWT.roles,
  };
};
