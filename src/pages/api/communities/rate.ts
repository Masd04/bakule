// pages/api/communities/rate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "~/server/db"; 
import { getServerAuthSession } from "~/server/auth"; 

interface RateRequestBody {
  communityId: string;
  value: number;
  content?: string;
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const session = await getServerAuthSession({ req, res });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'You must be signed in to submit a rating.' });
    }

    

    const userId = session.user.id;
    const { communityId, value, content } = req.body as RateRequestBody;
    
    try {
      const rating = await prisma.rating.create({
        data: {
          userId,
          communityId,
          value,
        },
      });

      if (content) {
        await prisma.review.create({
          data: {
            userId,
            communityId,
            content,
          },
        });
      }

      return res.status(200).json({ message: 'Rating submitted successfully', rating });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}