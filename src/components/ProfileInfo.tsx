import { User } from '../types/types';

interface UserProps {
 user: User;
}

export function ProfileInfo({ user }: UserProps) {
    return <>
    <div className="flex justify-center">
    <div className="flex flex-col">
  
      <div>
        <h6>{user.id}</h6>
      </div>

      <div>
        <h6>{user.name}</h6>
      </div>

      <div>
        <h6>{user.email}</h6>
      </div>

      <div>
        <img src={user.image} alt="Profie pic" />
      </div>
  
    </div>
    </div>
    </>
  
  }