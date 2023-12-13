import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


export function SideBar () {

    const session = useSession()
    const user = session.data?.user

    return (
    
    <nav id='nav' className="sticky top-0 px-4 py-4">
    
    

    <ul className="flex flex-col items-center gap-2 whitespace-nowrap font-bold">
        <li className="text-center">
            <Link href="/">Communities</Link>
        </li>
        <li>
        <Link href="/profile">ProfileOld</Link>
        </li>
        {user != null && ( 
        <li>
            <Link href={`/profile/${user.id}`}>Profile</Link>
        </li>
        )}

        {user == null ? (
            <li>
                <button onClick={() => void signIn()}>Log In</button>
            </li>
        ) : (
        <li>
        <button onClick={() => void signOut()}>Log Out</button>
        </li> 
        )}
    </ul>

    </nav>

    );

}