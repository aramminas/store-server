import Joi from "joi";

import { allowedFileTypes, maxFileSize, passwordRegExp } from "../configs";

const fileCheck = (file: any, helpers: Joi.CustomHelpers<any>) => {
  if (file) {
    if (!(file instanceof File)) {
      return helpers.error("any.invalid", {
        message: "File must be a valid image",
      });
    }

    if (!allowedFileTypes.includes(file.type)) {
      return helpers.error("any.invalid", {
        message: "File must be an image",
      });
    }

    // file size should be less than 2MB
    if (file.size > maxFileSize) {
      return helpers.error("sany.invalid", {
        message: "File must be smaller than 2MB",
      });
    }
  }

  return file;
};

export const userCreateScheme = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(passwordRegExp).min(6).max(32).required(),
  birthDate: Joi.date().optional(),
  avatar: Joi.any()
    .optional()
    .custom(async (value, helpers) => {
      return await fileCheck(value, helpers);
    })
    .message("Invalid file"),
});

export const userUpdateScheme = Joi.object({
  firstName: Joi.string().min(2).optional(),
  lastName: Joi.string().min(2).optional(),
  birthDate: Joi.date().optional(),
  avatar: Joi.any()
    .optional()
    .custom(async (value, helpers) => {
      return await fileCheck(value, helpers);
    })
    .message("Invalid file"),
});

export const userLoginScheme = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});

export const productCreateScheme = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().required(),
  discountedPrice: Joi.number().optional(),
  description: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  creatorId: Joi.number().required(),
  image: Joi.any()
    .optional()
    .custom(async (value, helpers) => {
      return await fileCheck(value, helpers);
    })
    .message("Invalid file"),
});
