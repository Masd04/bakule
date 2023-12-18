import type { NextPage } from "next"
/* import { ProfileInfo } from "~/components/ProfileInfo"; */
import type { User } from '../types/types';
import useSWR from 'swr';


type FetcherResponse<T> = Promise<T>;

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then(res => res.json());

const Profile: NextPage = () => {
  const { data: users, error } = useSWR<User[]>('/api/profile', fetcher);


    if (error) return <div>Failed to load users</div>;
    if (!users) return <div>Loading...</div>;

    return (
    <>
    <div className="mx-1">
      <header className="sticky top-[4.78rem] z-10 border-b pt-1 mt-0">   
          <h1 className="px-4 py-2 text-white bg-blue-700  text-lg font-bold text-center">Profile</h1>
      </header>

      <div className="text-center">Profile information</div>

      {/* <div>
      {users.map((user: User) => (
        <ProfileInfo key={user.id} user={user}/>
      ))}
      </div> */}
  
    </div>
    </>
  
  )}
  
  export default Profile;