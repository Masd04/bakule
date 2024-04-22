// utils/logger.ts
// for logging purposes
/* import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LogDetails {
  [key: string]: any;
}

export async function logDbCall(description: string, details: LogDetails) {
  // Insert a log entry into your database
  await prisma.log.create({
    data: {
      description,
      details: details,
      environment: process.env.NODE_ENV, // This will log 'development' or 'production'
    },
  });
} */
