// pages/communities/[id].tsx

import type { NextPage } from 'next';
import Head from "next/head";
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import styles from '../../styles/style.js'
import type { RatRevCom } from '../../types/types';
import Image from 'next/image';
import  GoBack  from "~/components/GoBack";
import  ModalRate  from "~/components/ModalRate";
import AvgRate from "~/components/AvgRate";
import  Alert  from "~/components/Alert";


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

  if (error) return <>
      <div className="pt-2 pl-6">
      <GoBack />
      </div>
      <Alert message="Failed to load the community." textColor="text-cpred"/>
     </>;
  if (!community) return <Alert message="Loading..." textColor="text-cpblue"/>;


  const handleRateButtonClick = () => {
    if (!session) {
      alert('You must be logged in to rate communities.')
    } else {
      setShowModal(true);
    }
  }
  

  return (
    <>
    <Head>
        <title>{`${community.name} - CommuPlat`}</title>
        <meta name="description"
              content={`${community.name} detail page. Displays community information, average rating and all ratings and reviews for this community.`}
        />
        <link rel="canonical" href={`https://commuplat.vercel.app/communities/${community.id}`} />
    </Head>

    <div className="container mx-auto px-6 py-2 mt-2">

    <div className={`${styles.flexRow} justify-between`}>

    <GoBack />
    {/* RATE BUTTON */}
    <button className={`${styles.rateButton}`} onClick={handleRateButtonClick}>
      Rate this community
    </button>

    </div>


      <div className={`${styles.detailsContainer}`}>

      <div className={`${styles.flexBtw}`}>

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
      
      <div className={`${styles.flexBtw} items-center`}>
      <div className="mr-2 mt-2 sm:mr-10">
      <AvgRate 
        averageRating={community.averageRating ?? 0}
        textSize="sm:text-[8.5rem] text-5xl"
        imgW={120}
        imgH={90}
        imgWrapStyle="w-1/4 lg:w-full"
        xSpacing="space-x-3"
      />
      </div>
      </div>

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
    <div key={item.id} className={`py-4 mb-3 ${styles.revCardContainer}`}>
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

          <div className="flex">
              <AvgRate 
                averageRating={item.value}
                textSize="text-[1.5rem] sm:text-[2rem]"
                imgW={30}
                imgH={20}
                imgWrapStyle="w-[45%] lg:w-full"
                xSpacing="space-x-1"
               />
              </div>

          {item.review?.content && (
            <div className="text-lg">
              <p className="pt-3"><span className={`${styles.revCardRev}`}>Review: </span><br />{item.review.content}</p>
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
