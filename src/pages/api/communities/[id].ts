// src/pages/api/communities/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "~/server/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const community = await prisma.community.findUnique({
        where: { id: String(id) },
        include: {
          ratings: {
            include: {
              user: true, 
            },
          },
          reviews: {
            include: {
              user: true, 
            },
          },
        },
      });

      if (community) {
        const averageRatingResult = await prisma.rating.aggregate({
          _avg: {
            value: true
          },
          where: {
            communityId: community.id
          }
        });

        const averageRating = averageRatingResult._avg.value
          ? parseFloat(averageRatingResult._avg.value.toFixed(1))
          : "0";

        const ratingsReviews = community.ratings.map((rating) => {
          return {
            ...rating,
            review: community.reviews.find(
              (review) => review.userId === rating.userId
            ),
          };
        });

        const responseCommunity = {
          ...community,
          averageRating,
          ratingsReviews
        };

        res.status(200).json(responseCommunity);
      } else {
        res.status(404).json({ message: 'Community not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving community', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
