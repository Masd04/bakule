import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import type { Community } from '../../types/types';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => res.json());


const CommunityPage: NextPage = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const { data: community, error } = useSWR<Community>(typeof id === 'string' ? `/api/communities/${id}` : null, fetcher);

  if (error) return <div>Failed to load the community.</div>;
  if (!community) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-6 p-6">
      <div className="bg-white rounded shadow">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{community.name}</div>
          <p className="text-gray-700 text-base">{community.description}</p>
        </div>
        {community.imageUrl && (
          <Image
            src={community.imageUrl}
            alt='some alt'
            width={600}
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
