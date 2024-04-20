//server/api/routers/profile.ts
import { z } from "zod";


import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({

  getById: publicProcedure.input(z.object({ id: z.string()}
  )).query(async ({
    input: {id}, ctx}) => {
    const profile =  await ctx.prisma.user.findUnique({ 
      where: { id }, 
      select: { name: true, image: true, email: true}
    })

      if (profile == null) return

      return {
        name: profile.name,
        image: profile.image,
        email: profile.email
      }
    }),

    getUserRatingsAndReviews: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ input, ctx }) => {
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
 
