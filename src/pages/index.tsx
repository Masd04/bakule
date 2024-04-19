//pages/index.tsx
import type { NextPage } from "next"
import { CommunityCard } from "~/components/CommunityCard";
import useSWR from 'swr';
import styles from '../styles/style.js'
import type { Community } from '../types/types';
import { useSession } from "next-auth/react";
import  ModalAdd  from "~/components/ModalAdd";
import  Alert  from "~/components/Alert";
import { useState } from 'react';


const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});

const Communities: NextPage = () => {

  const [showModal, setShowModal ] = useState(false);

  const { data: session } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: communities, error } = useSWR<Community[]>('/api/communities', fetcher);

  if (error) return <Alert message="Failed to load communities." textColor="text-red-700"/>;
  if (!communities) return <Alert message="Loading..." textColor="text-green-600"/>;



  const handleAddButtonClick = () => {
    if (!session) {
      alert('You must be logged in to add new community.')
    } else {
      setShowModal(true);
    }
  }
    
  return (
  <>
  <div className="bg-gray-100 pt-3">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <header className="flex-grow ml-52">
          <h1 className="text-4xl font-bold text-black text-center bg-gray-100 px-4 pt-2 pb-3">Communities</h1>
          <div className="flex justify-center py-2 bg-gray-100" id="srch">
            <input type="text" placeholder="search" className="w-[14rem] bg-gray-300 border-2 border-gray-400 text-center rounded-full"/>
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