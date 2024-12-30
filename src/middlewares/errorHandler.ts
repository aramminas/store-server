import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const errorHandling = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let message = "Something went wrong";
  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const pattern = /[\[\]]/g;
    const filed = JSON.stringify(err?.meta?.target || {}).replace(pattern, "");

    if (err.code === "P2002") {
      message = `Unique constraint failed on the ${filed}`;
    }
  }
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    message: message,
    error: err.message,
  });
};

export default errorHandling;
