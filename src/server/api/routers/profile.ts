//server/api/routers/profile.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure, 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({

  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    if (ctx.session.user.id !== input.id) {
      console.log(`Unauthorized getByID access attempt: Session ID ${ctx.session.user.id} vs Requested ID ${input.id}`);
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const profile = await ctx.prisma.user.findUnique({
      where: { id: input.id },
      select: { name: true, image: true, email: true },
    });

    if (!profile) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    return profile;
  }),

    getUserRatingsAndReviews: protectedProcedure.input(z.object({ userId: z.string() })).query(async ({ input, ctx }) => {
      if (ctx.session.user.id !== input.userId) {
        console.log(`Unauthorized getRatRevs access attempt: Session ID ${ctx.session.user.id} vs Requested ID ${input.userId}`);
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const ratings = await ctx.prisma.rating.findMany({
        where: { userId: input.userId },
        include: {
          community: true,
        },
      });
    
      const reviews = await ctx.prisma.review.findMany({
        where: { userId: input.userId },
        include: {
          community: true,
        },
      });

    
      const ratingsReviews = ratings.map((rating) => ({
        ...rating,
        review: reviews.find((review) => review.communityId === rating.communityId),
      }));
  
      return { ratingsReviews };
    }),
  });
 
