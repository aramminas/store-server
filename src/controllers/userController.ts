import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  UserT,
  ProductImageT,
  UserDataTokenT,
  RequestWithUser,
} from "../types/common";
import {
  getUserByEmailService,
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getAllOwnerProductsService,
} from "../modules/userModel";
import {
  jwtTokenGenerator,
  jwtTokenSetCookie,
  jwtTokenClearCookie,
} from "../utils/tokens";
import { userDto } from "../dtos";
import { handleResponse } from "../utils/controller";
import { removeAllOwnerProductImages, removeFile } from "../utils";
import { getAllOwnerProductsImagesService } from "../modules/productModel";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmailService(email);

    if (!user?.id) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    // generate JWT tokens
    const { accessToken, refreshToken } = jwtTokenGenerator(user);

    const userData = userDto(user);

    // Set refresh token to cookie (http only)
    jwtTokenSetCookie(res, refreshToken);

    return handleResponse<UserDataTokenT>(res, 200, "Login successful!", {
      ...userData,
      accessToken,
    });
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
      birthDate: birthDate ? new Date(birthDate) : null,
    });

    return handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    if (err && avatar) {
      removeFile(avatar);
    }

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
    if (isNaN(+req.params.id)) {
      return handleResponse(res, 422, "Unprocessable entity");
    }

    const user = await getUserByIdService(+req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");

    const userData = userDto(user);
    return handleResponse(res, 200, "User fetched successfully", userData);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, birthDate } = req.body;

  let avatar = null;
  if (req.file) {
    avatar = req.file.path.replace("public/", "");
  }

  const userId = Number(req.params.id);

  if (userId !== req?.user?.id) {
    return handleResponse(res, 403, "Access Denied");
  }

  // remove old user avatar
  if (avatar) {
    const currentUser: UserT | null = await getUserByIdService(userId);
    if (currentUser?.avatar) {
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

export const deleteUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = +req.params.id;

  try {
    if (isNaN(userId)) {
      return handleResponse(res, 422, "Unprocessable entity");
    }
    const userProducts: ProductImageT[] =
      await getAllOwnerProductsImagesService(userId);

    if (req.user?.id !== userId) {
      return handleResponse(res, 403, "Access Denied");
    }

    const deletedUser = await deleteUserService(+req.params.id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");

    // remove user avatar
    if (deletedUser.avatar) {
      removeFile(deletedUser.avatar);
    }

    // remove user products images
    if (deletedUser.id) {
      const productImages = userProducts.map((product) => product.imageUrl);
      removeAllOwnerProductImages(productImages);
    }

    return handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};

export const getUserProducts = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = +req.params.id;

  try {
    if (isNaN(userId)) {
      return handleResponse(res, 422, "Unprocessable entity");
    }

    const userProducts = await getAllOwnerProductsService(userId);

    if (userProducts) {
      return handleResponse(
        res,
        200,
        "All user products have been successfully fetched",
        userProducts
      );
    }

    return handleResponse(res, 200, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const user = req?.user;

  try {
    if (!user) {
      return handleResponse(res, 403, "Access Denied");
    }

    jwtTokenClearCookie(res);

    return handleResponse(res, 200, "The user has successfully logged out.");
  } catch (err) {
    next(err);
  }
};
