// server/db.ts
import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";

// Type cast globalThis to include a prisma property
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize the PrismaClient instance.
// Use the existing global prisma instance if it's there (in development), otherwise create a new one
// The log level set to be more verbose in development mode for easier debugging
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
     /*  env.NODE_ENV === "development" ?  */["query", "error", "warn"] /* : ["error"] */,
  });

// Production - attach Prisma instance to the global object
// -> can reuse it across hot-reloads
// -> Prevent creating new instances of PrismaClient on each change/hot-reload
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
