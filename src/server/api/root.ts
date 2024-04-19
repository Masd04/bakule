//  src/server/api/root.ts
import { profileRouter } from "~/server/api/routers/profile";
import { createTRPCRouter } from "~/server/api/trpc";
import { emailRouter } from "./routers/emailRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
