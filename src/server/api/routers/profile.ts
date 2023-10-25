import { z } from "zod";
import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string()}
  )).query(async ({
    input: {id}, ctx}) => {
    const currentUserId = ctx.session?.user.id
    const profile =  await ctx.prisma.user.findUnique({ where: { id }, select: { name: true, image: true, email: true}
    })

      if (profile == null) return

      return {
        name: profile.name,
        image: profile.image,
        email: profile.email
      }
    })


  })
 
