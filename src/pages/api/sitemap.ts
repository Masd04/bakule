import type { NextApiRequest, NextApiResponse } from 'next';
import type { Community } from '~/types/types';
import { prisma } from '~/server/db';

type ApiResponse = {
    paths: string[];
  };
  
  export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<ApiResponse | { message: string }>
  ) {
      try {
          const communities: Community[] = await prisma.community.findMany({
              select: { id: true }
          });
  
          const paths: string[] = communities.map(community => `/communities/${community.id}`);
          res.status(200).json({ paths });
          
      } catch (error) {
          console.error('Failed to fetch community data:', error);
          res.status(500).json({ message: 'Failed to fetch community data' });
      }
  }