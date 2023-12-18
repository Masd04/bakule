import React, { useState, useRef, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';
import { close, menu  } from "../../public/img";



export function SideBar () {

     // PROFILE
     const session = useSession();
     const user = session.data?.user;


    // MOBILE NAV
    const [isSidebarOpen, setIsSidebarOpen
    ] = useState(false);


    const toggleSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
        
        event.stopPropagation(); // Prevent event bubbling
        setIsSidebarOpen(!isSidebarOpen);
        // console.log(isSidebarOpen);
    };
    
    // CLOSE NAVBAR AFTER CLICKING INACTIVE LINK
    const router = useRouter();

    const handleLinkClick = (path: string) => {
        console.log(`Link clicked: ${path}, Current path: ${router.pathname}`);
    if (router.asPath !== path) {
        setIsSidebarOpen(false);
    }
    };

    // FOR CLOSING SIDEBAR AFTER CLICKING OUTSIDE OF IT
    const sidebarRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!sidebarRef.current?.contains(event.target as Node) && !toggleButtonRef.current?.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);



    return (
    <>
    <button ref={toggleButtonRef} className="md:hidden p-2 absolute top-2 left-2 z-20" onClick={toggleSidebar}>
         {isSidebarOpen ? (
             <Image src={close} alt="Close icon" width={36} height={36} />
         ) : (
             <Image src={menu} alt="Menu icon" width={36} height={36} />
          )}
        </button>
        
        
    <nav ref={sidebarRef} id='nav' className={`fixed top-20 md:top-0 left-0 z-20 md:h-full py-4 px-4 transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } bg-white shadow-md md:relative md:translate-x-0 md:block`}>
    
    



    <ul className="flex flex-col items-center gap-2 whitespace-nowrap font-bold">
        <li className="text-center">
            <Link href="/" onClick={() => handleLinkClick('/')}>Communities</Link>
        </li>
        <li>
        <Link href="/profile" onClick={() => handleLinkClick('/profile')}>ProfileOld</Link>
        </li>
        {user != null && ( 
        <li>
            <Link href={`/profile/${user.id}`} onClick={() => handleLinkClick(`/profile/${user.id}`)}>Profile</Link>
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

    </>

    );

}