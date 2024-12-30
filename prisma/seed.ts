import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const hashUserPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const initUsers: Prisma.UsersCreateInput[] = [
  {
    firstName: "Alice",
    lastName: "Jenkon",
    email: "alice@gmail.com",
    password: "Aa123456",
    products: {
      create: {
        name: "Check out Prisma with Next.js",
        description: "https://www.prisma.io/nextjs",
        price: 110,
      },
    },
  },
  {
    firstName: "Bob",
    lastName: "Woodson",
    email: "bob@gmail.com",
    password: "Aa123456",
    products: {
      create: [
        {
          name: "Follow Prisma on Twitter",
          description: "https://twitter.com/prisma",
          price: 35,
        },
        {
          name: "Follow Nexus on Twitter",
          description: "https://twitter.com/nexusgql",
          price: 34.99,
        },
      ],
    },
  },
];

async function main() {
  for await (const user of initUsers) {
    const newUser = await prisma.users.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: await hashUserPassword(user.password) },
    });
    console.log("A new user has been created :>> ", newUser);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
