import { type NextPage } from "next"
import { CommunityCard } from "~/components/CommunityCard";
import useSWR from 'swr';
import { Community } from '../types/types';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />



const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Communities: NextPage = () => {
  const { data: communities, error } = useSWR('/api/communities', fetcher);

    if (error) return <div>Failed to load communities</div>;
    if (!communities) return <div>Loading...</div>;
    
  return (
  <>
  <div className="mx-1">

    <header className="sticky top-[4.78rem] z-10 border-b pt-1 mt-0">
      
      <h1 className="px-4 py-2 text-white bg-blue-700  text-lg font-bold text-center">Communities</h1>

      <div className="flex justify-center py-2 select-none bg-gray-100">
        <input type="text" placeholder="search" className="bg-gray-300 rounded-full w-4rem text-center border-2 border-gray-400"/>
      </div>

    </header>

    

    {communities.map((community: Community) => (
                <CommunityCard key={community.id} community={community} />
    ))}    
  </div>
  </>

)}

export default Communities;