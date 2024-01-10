import type { NextPage } from "next"
import { CommunityCard } from "~/components/CommunityCard";
import useSWR from 'swr';
import type { Community } from '../types/types';


const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});

const Communities: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: communities, error } = useSWR<Community[]>('/api/communities', fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!communities) return <div>Loading...</div>;
    
  return (
  <>
  <div className="bg-gray-100 pt-3">

    <header className="sticky top-[4.78rem] z-10 pt-1 mt-0">
      
      <h1 className="px-4 pt-2 pb-3 text-black bg-gray-100 text-4xl font-bold text-center">Communities</h1>

      <div className="flex justify-center py-2 select-none bg-gray-100">
        <input type="text" placeholder="search" className="bg-gray-300 rounded-full w-[14rem] text-center border-2 border-gray-400"/>
      </div>

    </header>

   
    {communities.map((community: Community) => (
                <CommunityCard key={community.id} community={community} />
    ))} 
   

  </div>

  </>

)}

export default Communities;