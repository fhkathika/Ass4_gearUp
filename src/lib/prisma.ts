
// Import the driver adapter for your specific database (example uses PostgreSQL)
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client";
// Initialize the adapter according to your driver's requirements
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg({ connectionString: "postgres://ec586ef2cf8534b983ee4c531d06a148bfe3585569a71d33c3203b3fca1549e2:sk_SyNmQn0xdVDm3TYgmyUM7@pooled.db.prisma.io:5432/postgres?sslmode=require" });
console.log(process.env.DATABASE_URL);
// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

export default prisma