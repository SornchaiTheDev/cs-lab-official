import type { JwtPayload } from "jwt-decode";

export interface AccessTokenPayload extends JwtPayload {
  username: string;
  displayName: string;
  profileImage: string;
  roles: string[];
  exp: number;
  sub: string;
}
