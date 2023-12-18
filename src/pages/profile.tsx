import type { NextPage } from "next"
/* import { ProfileInfo } from "~/components/ProfileInfo"; */
import type { User } from '../types/types';
import useSWR from 'swr';


const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
});


const Profile: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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