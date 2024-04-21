// src/pages/profile/[id].tsx
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from '../../styles/style.js';
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import Image from 'next/image';
import  GoBack  from "~/components/GoBack";
import AvgRate from "~/components/AvgRate";
import Alert from "~/components/Alert";
import { getSession } from "next-auth/react";


interface ProfilePageProps {
  id: string;
}


const ProfilePage: NextPage<ProfilePageProps> = ({ id }) => {
     const { data: profile, isLoading: isLoadingProfile, isError: isErrorProfile } = api.profile.getById.useQuery({ id })
     const { data: userRatingsAndReviews, isLoading: isLoadingRatingsReviews, isError: isErrorRatingsReviews } = api.profile.getUserRatingsAndReviews.useQuery({ userId: id });

     if (isLoadingProfile || isLoadingRatingsReviews) {
        return <Alert message="Loading..." textColor="text-cpblue" />;
      }
    
      // Combined error state
      if (isErrorProfile || isErrorRatingsReviews) {
        return <Alert message="Failed to load profile." textColor="text-cpred" />;
      }

    return <>
    <Head>
        <title>{`Profile ${profile?.name}`}</title>
    </Head>

    <div className={`container mx-auto px-6 py-2`}>

    <GoBack />
    
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
    <div className={`${styles.profileTxt}`}>
    <div className={`${styles.flexCenter} w-1/3 sm:w-full mx-auto`}>
    <Image src={profile?.image ? profile.image : 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg'}
           alt="Profile image" 
           width={200} 
           height={200} />
    </div>
    <h1 className={`${styles.flexCenter}`}>{profile?.name}</h1>
    <h1 className={`${styles.flexCenter} font-light`}>{profile?.email}</h1>
    </div>
    </div>

    <div className="mt-5 mb-3 text-lg font-bold">
      <h3>Your ratings</h3>
    </div>


    <div className="mt-5">
    <div className="space-y-2">
          {userRatingsAndReviews.ratingsReviews.map((ratRev, index) => (
            <div key={index} className="p-4 mb-3 bg-sky-50 border-2 border-gray-300 shadow-lg">

              <div className="mb-1 border-b-2 border-gray-300">{ratRev.community && <div className="font-semibold">{ratRev.community.name}</div>}
              </div>
              <div className="flex">
              <AvgRate 
                averageRating={ratRev.value}
                textSize="text-[1.5rem] sm:text-[2rem]"
                imgW={30}
                imgH={20}
                imgWrapStyle="w-[45%] lg:w-full"
                xSpacing="space-x-1"
               />
              </div>
              <div>{ratRev.review && <div><span className="font-semibold border-b-2 border-gray-300">Review: </span><br />{ratRev.review.content}</div>}
              </div>
              


            </div>
          ))}

    </div>
    </div>

    </div>

    </>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { id } = context.params as { id: string };

  // If there is no session, or the session user's ID does not match the profile being accessed, redirect to the homepage.
  if (!session || session.user.id !== id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
export default ProfilePage;