// src/pages/_app.tsx
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SideBar } from "~/components/SideBar";

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    
    <SessionProvider session={session}>

    <Head> 
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <div className="mx-auto flex items-start min-h-screen w-full bg-white sm:bg-gray-100">

    <div className="md:sticky md:top-0 md:left-0">
    <SideBar />
    </div>

    <div className="min-h-screen flex-grow">

      <header className="sticky top-0 z-10 border-b bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-2">
        <h1 className="mb-2 px-4 py-4 sm:py-5 text-center text-4xl sm:text-[5rem] font-extrabold tracking-tight text-white">CommuPlat</h1>
      </header>

      <Component {...pageProps} />
    
    </div>

    </div>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
