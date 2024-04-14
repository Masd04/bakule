import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  
              // Modify the communities to include counts in the response
              const modifiedCommunities = communities.map(community => ({
                ...community,
                ratingsCount: community._count.ratings,
                reviewsCount: community._count.reviews,
              }));

            return res.status(200).json(modifiedCommunities);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
