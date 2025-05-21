export interface User {
  id: string;
  email?: string;
  username: string;
  display_name: string;
  profile_image: string | null;
  roles: UserRole[];
  type: UserType;
  created_at?: Date;
  updated_at?: Date;
}

export interface JWTUser {
  id: string;
  username: string;
  displayName: string;
  profileImage: string | null;
  roles: string[];
}

export type UserType = "credential" | "oauth";

export type UserRole = "admin" | "instructor" | "student";

export interface CreateUser extends Omit<User, "id"> {
  password?: string;
}
