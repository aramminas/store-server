import { Response } from "express";

export const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
