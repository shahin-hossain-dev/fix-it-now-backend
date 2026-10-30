import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

try {
  await prisma.$connect();
  console.log("Database connected successfully");

  // const users = await prisma.user.findMany();

  // console.log(users);
} catch (error) {
  console.error("Database/Prisma error:", error);
}

export default prisma;
