export type UserRole =
  | "user"
  | "manager"
  | "admin";

export interface IUser {
  clerkId: string;

  email: string;

  name: string;

  image?: string;

  role: UserRole;

  createdAt?: Date;

  updatedAt?: Date;
}