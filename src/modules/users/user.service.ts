import { User } from "./user.model";

export const createUser = async (
  payload: any
) => {
  return User.create(payload);
};

export const getUserByClerkId =
  async (clerkId: string) => {
    return User.findOne({
      clerkId,
    });
  };