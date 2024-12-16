import { NextFunction, Request, Response } from "express";
import {
  userLoginScheme,
  userUpdateScheme,
  userCreateScheme,
  productCreateScheme,
} from "../utils/schemes";

export const validateLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = userLoginScheme.validate(req.body);

    if (error)
      return Promise.reject(
        res.status(400).json({
          status: 400,
          message: error.details[0].message,
        })
      );
    next();
  } catch (error) {
    next(error);
  }
};

export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = userCreateScheme.validate(req.body);

    if (error)
      return Promise.reject(
        res.status(400).json({
          status: 400,
          message: error.details[0].message,
        })
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = userUpdateScheme.validate(req.body);

    if (error)
      return Promise.reject(
        res.status(400).json({
          status: 400,
          message: error.details[0].message,
        })
      );
    next();
  } catch (error) {
    next(error);
  }
};

export const validateCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = productCreateScheme.validate(req.body);

    if (error)
      return Promise.reject(
        res.status(400).json({
          status: 400,
          message: error.details[0].message,
        })
      );

    next();
  } catch (error) {
    next(error);
  }
};
