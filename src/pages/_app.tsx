import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { SideBar } from "~/components/SideBar";




const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    
    <SessionProvider session={session}>

    <Head>
      <title>CommuPlat</title> 
      <meta name="description" content="This app allows verified discord users to view and provide rating and reviews of communities they participate in." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="container mx-auto flex items-start">
    <SideBar />
    <div className="min-h-screen flex-grow">
    
    <header className="sticky top-0 z-10 border-b bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-2">
      <h1 className="mb-2 px-4 py-3 text-center text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">CommuPlat</h1>
    </header>

      <Component {...pageProps} />
    
    </div>
    </div>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
