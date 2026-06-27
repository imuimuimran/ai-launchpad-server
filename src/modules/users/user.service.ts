import { IUser, UserRole } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (
  payload: IUser
) => {
  return await User.create(payload);
};

export const getUserByClerkId = async (
  clerkId: string
) => {
  return await User.findOne({
    clerkId,
  });
};

export const updateUser = async (
  clerkId: string,
  payload: Partial<IUser>
) => {
  return await User.findOneAndUpdate(
    {
      clerkId,
    },
    payload,
    {
      new: true,
    }
  );
};

export const deleteUser = async (
  clerkId: string
) => {
  return await User.findOneAndDelete({
    clerkId,
  });
};

export const changeRole = async (
  clerkId: string,
  role: UserRole
) => {
  return await User.findOneAndUpdate(
    {
      clerkId,
    },
    {
      role,
    },
    {
      new: true,
    }
  );
};

export const UserService = {
  createUser,
  getUserByClerkId,
  updateUser,
  deleteUser,
  changeRole,
};