import bcrypt from "bcrypt";
import pool from "../database/database";
import { UserT } from "../types/common";

export const getUserService = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1;", [
    email,
  ]);

  return result.rows;
};

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");

  return result.rows;
};

export const getUserByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM users where id = $1", [id]);
  return result.rows[0];
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

  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, avatar, birth_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [firstName, lastName, email, hashedPassword, avatar, birthDate]
  );
  return result.rows[0];
};

export const updateUserService = async (
  id: number,
  firstName: string,
  lastName: string,
  avatar: string | null,
  birthDate: Date | null
) => {
  const result = await pool.query(
    "UPDATE users SET first_name=COALESCE($1, first_name), last_name=COALESCE($2, last_name), avatar=COALESCE($3, avatar), birth_date=COALESCE($4, birth_date) WHERE id=$5 RETURNING *",
    [firstName, lastName, avatar, birthDate, id]
  );
  return result.rows[0];
};

export const deleteUserService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
