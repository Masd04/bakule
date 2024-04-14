// pages/api/communities/rate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../server/db"; // Adjust the import path as necessary
import { getServerAuthSession } from "../../../server/auth"; // Import the session helper


interface RateRequestBody {
  communityId: string;
  value: number;
  content?: string;
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get the session and ensure the user is authenticated
    const session = await getServerAuthSession({ req, res });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'You must be signed in to submit a rating.' });
    }

    

    const userId = session.user.id; // Use the user ID from the session
    const { communityId, value, content } = req.body as RateRequestBody;
    
    try {
      // Create the Rating
      const rating = await prisma.rating.create({
        data: {
          userId, // This is now provided by the session
          communityId,
          value,
        },
      });

      // Optional: Create the Review if content is provided
      if (content) {
        await prisma.review.create({
          data: {
            userId, // This is now provided by the session
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