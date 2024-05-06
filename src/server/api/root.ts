//  src/server/api/root.ts
import { profileRouter } from "~/server/api/routers/profile";
import { createTRPCRouter } from "~/server/api/trpc";
import { emailRouter } from "./routers/emailRouter";


export const appRouter = createTRPCRouter({
  profile: profileRouter,
  email: emailRouter,
});


export type AppRouter = typeof appRouter;
