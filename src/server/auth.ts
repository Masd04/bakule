// src/server/auth.ts

import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "~/env.mjs";
import { type GetServerSidePropsContext } from "next";


/* Module augmentation for `next-auth` types. Allows us to add custom properties to the `session` object and keep type safety.*/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

/* Options for NextAuth.js used to configure adapters, providers, callbacks, etc. */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};

/* Most other providers require a bit more work than the Discord provider. For example, the
   GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   model. */


/* Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file. */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
