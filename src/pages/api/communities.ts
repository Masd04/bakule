// pages/api/communities.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const communities = await prisma.community.findMany({
                include: {
                  _count: {
                    select: { ratings: true, reviews: true },
                  },
                },
              });
  
              const communityDetails = await Promise.all(communities.map(async community => {
                const avgRating = await prisma.rating.aggregate({
                    _avg: {
                        value: true
                    },
                    where: {
                        communityId: community.id
                    }
                });

 return {
                    ...community,
                    ratingsCount: community._count.ratings ?? 0,
                    reviewsCount: community._count.reviews ?? 0,
                    averageRating: avgRating._avg.value ? parseFloat(avgRating._avg.value.toFixed(1)) : "0"
                };
            }));

            return res.status(200).json(communityDetails);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
