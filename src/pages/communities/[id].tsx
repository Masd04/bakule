// pages/communities/[id].tsx

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '../../styles/style.js'
import Image from 'next/image';
import type { RatRevCom } from '../../types/types';
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
  const { data: community, error } = useSWR<RatRevCom>(id ? `/api/communities/${id}` : null, fetcher);

  if (error) return <div>Failed to load the community.</div>;
  if (!community) return <div>Loading...</div>;

  return (
    <>
    <div className="container mx-auto px-6 py-2">

    <div className="flex flex-row justify-between">

    <GoBack />
    {/* RATE BUTTON */}
    <button className={`${styles.rateButton}`} onClick={() => setShowModal(true)}>
      Rate this community
    </button>

    </div>


      <div className="bg-white rounded shadow-lg border-2 border-gray-200">

      <div className="ml-5 my-3 w-1/3 sm:w-1/6">
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
          <div className="font-bold text-2xl mb-2">{community.name}</div>
          <p className="text-gray-700 sm:text-xl">{community.description}</p>
        </div>
        
      </div>
      
      <div className="mt-7 mb-3 text-lg font-bold">
      <h3>User Feedback</h3>
      </div>

      <div id="reviewCard"
           className="py-4 bg-blue-100 border-2 border-gray-300 rounded shadow-lg">
      <div className="ml-5">
      
           {community.ratingsReviews.map((item) => (
        <div key={`${item.id}`} className="feedback-card">

          <div className="flex justify-left items-start mb-1">

          <div className="p-[0rem] border-2 border-blue-800 mr-2">
          <Image
            src={item.user.image}
            alt='some alt'
            width={30}
            height={20}
          />
          </div>

          <div className="">
          <p className="font-semibold text-2xl">{item.user.name}</p>
          </div>

          </div>

          <div className="">
          <p className="text-xl font-semibold">{item.value} *</p>
          </div>

          <div className="text-lg">
         {item.review?.content && <p className="pt-3"><span className="font-semibold">Review: </span><br /> {item.review.content}</p>}
         </div>
    
        </div>
))}
      </div>
      </div>


    </div>
    
    <ModalRate isVisible={showModal} onClose={() => setShowModal(false)} communityId={community.id}/>
    </>
  );
};

export default CommunityPage;
