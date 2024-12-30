import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, we should reuse the Prisma Client instance
  // to avoid exhausting database connections during hot reloading
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// Graceful shutdown
export const dbShutdown = async () => {
  console.log("Shutting down...");
  await prisma.$disconnect(); // Disconnect Prisma Client
  process.exit(0); // Exit the process
};

export default prisma;
