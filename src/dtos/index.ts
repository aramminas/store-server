import { UserDbT, UserDtoT } from "../types/common";

export const userDto = (user: UserDbT): UserDtoT => {
  const { id, first_name, last_name, email, avatar, birth_date } = user;
  return {
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    avatar,
    birthDate: birth_date,
  };
};
