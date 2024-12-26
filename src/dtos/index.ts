import { UserT, UserDtoT } from "../types/common";

export const userDto = (user: UserT): UserDtoT => {
  const { id, firstName, lastName, email, avatar, birthDate } = user;

  return {
    id,
    firstName,
    lastName,
    email,
    avatar,
    birthDate,
  };
};
