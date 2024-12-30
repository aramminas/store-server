import bcrypt from "bcrypt";
import prisma from "../../prisma";
import { UserT } from "../types/common";

export const getUserByEmailService = async (email: string) => {
  const result = await prisma.users.findUnique({
    where: { email: email },
  });

  return result;
};

export const getAllUsersService = async () => {
  const limit = 100;
  const offset = 0;

  const result = await prisma.users.findMany({
    take: limit,
    skip: offset,
  });

  return result;
};

export const getUserByIdService = async (id: number) => {
  const result = await prisma.users.findUnique({
    where: { id },
  });
  return result;
};

export const createUserService = async ({
  firstName,
  lastName,
  email,
  password,
  avatar = null,
  birthDate = null,
}: Omit<UserT, "id" | "createdAt" | "updatedAt">) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email: email,
      password: hashedPassword,
      avatar,
      birthDate,
    },
  });

  return result;
};

export const updateUserService = async (
  id: number,
  firstName: string,
  lastName: string,
  avatar: string | null,
  birthDate: Date | null
) => {
  const result = await prisma.users.update({
    where: { id },
    data: {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      avatar: avatar || undefined,
      birthDate: birthDate ? new Date(birthDate) : undefined,
    },
  });

  return result;
};

export const deleteUserService = async (id: number) => {
  const result = await prisma.users.delete({
    where: {
      id,
    },
  });
  return result;
};

export const getAllOwnerProductsService = async (id: number) => {
  const limit = 100;
  const offset = 0;

  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        take: limit,
        skip: offset,
      },
    },
  });

  return result;
};
