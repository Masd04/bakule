//pages/index.tsx
import type { NextPage } from "next"
import Head from "next/head";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import styles from '../styles/style.js'
import type { Community } from '../types/types';
import { CommunityCard } from "~/components/CommunityCard";
import SortSelector from "~/components/SortSelector";
import  ModalAdd  from "~/components/ModalAdd";
import  Alert  from "~/components/Alert";



const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});

const Communities: NextPage = () => {

  const { data: session } = useSession();
  const [showModal, setShowModal ] = useState(false);
  
  const [sortOption, setSortOption] = useState<'name' | 'averageRating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: communities, error } = useSWR<Community[]>('/api/communities', fetcher);

  useEffect(() => {
    if (communities) {
      console.log("Sorting by: ", sortOption, sortOrder); // Debugging line
      communities.sort((a, b) => {
        const sortValA = sortOption === 'averageRating' ? parseFloat(a.averageRating as string) || 0 : a.name ?? '';
        const sortValB = sortOption === 'averageRating' ? parseFloat(b.averageRating as string) || 0 : b.name ?? '';
        return sortOrder === 'asc' ? (sortValA < sortValB ? -1 : 1) : (sortValA > sortValB ? -1 : 1);
      });
      console.log("Sorting by: ", sortOption, sortOrder);
    }
  }, [sortOption, sortOrder, communities]);

  const handleAddButtonClick = () => {
    if (!session) {
      alert('You must be logged in to add new community.')
    } else {
      setShowModal(true);
    }
  }

  if (error) return <Alert message="Failed to load communities." textColor="text-cpred"/>;
  if (!communities) return <Alert message="Loading..." textColor="text-cpblue"/>;
    
  return (
  <>
  <Head>
     <title>CommuPlat</title>
     <meta name="viewport" content="width=device-width, initial-scale=0.5" /> 
     <meta name="description"
           content="Home page of the CommuPlat platform. Displays all accesible Discord communities, their average rating and count of ratings and reviews."
     />
     <link rel="canonical" href="https://commuplat.vercel.app/" />
     <meta name="robots" content="index, follow" />
     <meta property="og:title" content="CommuPlat" />
     <meta property="og:description" content="Home page of the CommuPlat platform. Displays all accesible Discord communities, their average rating and count of ratings and reviews." />
     <meta property="og:url" content="https://commuplat.vercel.app/" />
     <meta property="og:image" content="https://commuplat.vercel.app/favicon.ico" />
     <meta property="og:type" content="website" />
  </Head>

  <div className="pt-3">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <header className="flex-grow ml-52">
          <h2 className="text-4xl font-bold text-black text-center bg-white sm:bg-gray-100 px-4 pt-2 pb-3">Communities</h2>
          <div className="flex justify-center py-2 bg-white sm:bg-gray-100" id="srch">
            
          <SortSelector setSortOption={setSortOption} setSortOrder={setSortOrder} />

          </div>
        </header>

        <button
          className={`${styles.addButton}`} onClick={handleAddButtonClick}>
          Add new community
        </button>
      </div>
   
    {communities.map((community: Community) => (
                <CommunityCard key={community.id} community={community} />
    ))} 
   

    
  </div>

  <ModalAdd isVisible={showModal} onClose={() => setShowModal(false)}/>

  </>

)}

export default Communities;