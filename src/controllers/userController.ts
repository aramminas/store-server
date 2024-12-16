import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  getUserService,
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../modules/userModel";
import { userDto } from "../dtos";
import { removeFile } from "../utils";
import { handleResponse } from "../utils/controller";
import { UserDbT, UserDtoT, UserT } from "../types/common";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const result = await getUserService(email);

    if (result.length === 0) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    const userData = userDto(user);

    handleResponse<UserDtoT>(res, 200, "Login successful!", userData);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, birthDate } = req.body;
  let avatar = null;
  if (req.file) {
    avatar = req.file.path.replace("public/", "");
  }

  try {
    const newUser = await createUserService({
      firstName,
      lastName,
      email,
      password,
      avatar,
      birthDate,
    });

    return handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: UserT[] = await getAllUsersService();
    return handleResponse<UserT[]>(
      res,
      200,
      "Users fetched successfully",
      users
    );
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByIdService(+req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");

    const userData = userDto(user);
    return handleResponse(res, 200, "User fetched successfully", userData);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, birthDate } = req.body;

  let avatar = null;
  if (req.file) {
    avatar = req.file.path.replace("public/", "");
  }

  const userId = Number(req.params.id);

  // remove old user avatar
  if (avatar) {
    const currentUser: UserDbT = await getUserByIdService(userId);
    if (currentUser.avatar) {
      removeFile(currentUser.avatar);
    }
  }

  try {
    const updatedUser = await updateUserService(
      userId,
      firstName,
      lastName,
      avatar,
      birthDate
    );

    if (!updatedUser) return handleResponse(res, 404, "User not found");

    return handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};
