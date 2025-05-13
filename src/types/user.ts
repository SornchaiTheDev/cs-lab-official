export interface User {
  id: string;
  email?: string;
  username: string;
  displayName: string;
  profileImage: string | null;
  roles: string[];
  type: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JWTUser {
  id: string;
  username: string;
  displayName: string;
  profileImage: string | null;
  roles: string[];
}

export type UserType = "credential" | "oauth";
