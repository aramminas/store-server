import { Request } from "express";

type OmitUserT =
  | "password"
  | "avatar"
  | "birth_date"
  | "createdAt"
  | "updatedAt";

export interface RequestWithUser extends Request {
  user?: Omit<UserT, OmitUserT>;
}

export type UserT = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductT = {
  id: number;
  name: string;
  price: number;
  discountedPrice: number | null;
  description: string | null;
  imageUrl: string | null;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TokenT = {
  accessToken: string;
};

export type UserDtoT = Omit<UserT, "password" | "createdAt" | "updatedAt">;
export type UserDataTokenT = UserDtoT & TokenT;

export type RateLimitT = {
  limit: number;
  used: number;
  remaining: number;
  resetTime: Date;
};
