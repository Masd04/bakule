// pages/communities/[id].tsx

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '../../styles/style.js'
import Image, { StaticImageData } from 'next/image';
import type { RatRevCom } from '../../types/types';
import  GoBack  from "~/components/GoBack";
import { star } from "../../../public/img";
import { useSession } from "next-auth/react";
import  ModalRate  from "~/components/ModalRate";
import { useState } from 'react';
import AvgRate from "~/components/AvgRate";


const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});


const CommunityPage: NextPage = () => {

  const [showModal, setShowModal ] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: community, error } = useSWR<RatRevCom>(id ? `/api/communities/${id}` : null, fetcher);

  if (error) return <div>Failed to load the community.</div>;
  if (!community) return <div>Loading...</div>;

  // Colored Rating Values
  const getRatingColorClass = (value: number ) => {
    if (value <= 4) return 'text-red-600'; 
    if (value <= 7) return 'text-yellow-500'; 
    return 'text-green-500'; 
  };


  const handleRateButtonClick = () => {
    if (!session) {
      alert('You must be logged in to rate communities.')
    } else {
      setShowModal(true);
    }
  }
  

  return (
    <>
    <div className="container mx-auto px-6 py-2">

    <div className="flex flex-row justify-between">

    <GoBack />
    {/* RATE BUTTON */}
    <button className={`${styles.rateButton}`} onClick={handleRateButtonClick}>
      Rate this community
    </button>

    </div>


      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">

      <div className="flex justify-between">

      <div className="ml-5 my-3 pt-3 w-1/3 sm:w-1/6">
      {community.imageUrl && (
          <Image
            src={community.imageUrl}
            alt='some alt'
            width={600}
            height={400}
          />
        )}
        </div>

      <AvgRate 
        averageRating={community.averageRating ?? 0}
        textSize="sm:text-[8.5rem] text-5xl"
        imgW={120}
        imgH={90}
      />

        </div>
        
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2">{community.name}</div>
          <p className="text-gray-700 sm:text-xl">{community.description}</p>
        </div>

      </div>
      
      <div className="mt-7 mb-3 text-lg font-bold">
      <h3>User Feedback</h3>
      </div>

<div id="reviewCard">
  {community.ratingsReviews.map((item) => (
    <div key={item.id} className="py-4 bg-sky-50 border-2 border-gray-300 shadow-lg mb-3">
      <div className="mx-5">
        <div className="feedback-card">

          <div className="flex justify-left items-center mb-1">
            <div id="profilePic" className="border-2 border-blue-800 mr-2">
              
              <Image
                src={item.user.image}
                alt={item.user.name}
                width={30}
                height={20}
              />
            </div>
            <div>
              <p className="font-semibold text-2xl">{item.user.name}</p>
            </div>
          </div>

          <div className="w-[100%] h-[0.1rem] my-2 bg-slate-300"
               id="separator">
          </div>

          <div className="flex space-x-1">
            <p className={`text-2xl font-bold ${getRatingColorClass(item.value)}`}>{item.value}</p>
            <Image id="star"
                src={star as StaticImageData}
                alt="star icon"
                width={24.75}
                height={16.5}
              />
          </div>

          {item.review?.content && (
            <div className="text-lg">
              <p className="pt-3"><span className="font-semibold border-b-2 border-gray-300">Review: </span><br />{item.review.content}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  ))}
</div>


    </div>
    
    <ModalRate isVisible={showModal} onClose={() => setShowModal(false)} communityId={community.id}/>
    </>
  );
};

export default CommunityPage;
