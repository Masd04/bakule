import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import type { Community } from '../../types/types';
import  GoBack  from "~/components/GoBack";

import  ModalRate  from "~/components/ModalRate";
import { useState } from 'react';


const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});


const CommunityPage: NextPage = () => {

  const [showModal, setShowModal ] = useState(false);

  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: community, error } = useSWR<Community>(id ? `/api/communities/${id}` : null, fetcher);

  if (error) return <div>Failed to load the community.</div>;
  if (!community) return <div>Loading...</div>;

  return (
    <>
    <div className="container mx-auto px-6 py-2">

    <div className="flex flex-row justify-between">

    <GoBack />
    {/* RATE BUTTON */}
    <button className="w-auto h-12 px-5 bg-[#270858] rounded-md text-white font-bold hover:scale-105" onClick={() => setShowModal(true)}>
      Rate this community
    </button>

    </div>


      <div className="bg-white rounded shadow-lg">

      <div className="ml-5 w-1/3 sm:w-1/6">
      {community.imageUrl && (
          <Image
            src={community.imageUrl}
            alt='some alt'
            width={600}
            height={400}
          />
        )}
        </div>
        
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{community.name}</div>
          <p className="text-gray-700 text-base">{community.description}</p>
        </div>

        
      </div>
    </div>
    
    <ModalRate isVisible={showModal} onClose={() => setShowModal(false)} communityId={community.id}/>
    </>
  );
};

export default CommunityPage;
