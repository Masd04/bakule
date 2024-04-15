// pages/api/communities/[id].ts 
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../server/db"; // Adjust the import path as necessary

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const community = await prisma.community.findUnique({
        where: { id: String(id) },
        include: {
          ratings: true, // Include related records if needed
          reviews: true, // You can include this if you need to return reviews
        },
      });

      if (community) {
        res.status(200).json(community);
      } else {
        res.status(404).json({ message: 'Community not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving community', error });
    }
  } else {
    // Handle any other HTTP methods if necessary
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
