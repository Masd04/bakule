// src/pages/profile/[id].tsx
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import styles from '../../styles/style.js';
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error";
import Image from 'next/image';
import  GoBack  from "~/components/GoBack";
import AvgRate from "~/components/AvgRate";



const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
     id, 
    }) => {
     const { data: profile } = api.profile.getById.useQuery({ id })
     const { data: userRatingsAndReviews } = api.profile.getUserRatingsAndReviews.useQuery({ userId: id });

     if (!profile || !userRatingsAndReviews) {
       return <ErrorPage statusCode={404} />;
     }

    return <>
    <Head>
        <title>{`Profile ${profile.name}`}</title>
    </Head>

    <div className={`container mx-auto px-6 py-2`}>

    <GoBack />
    
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
    <div className={`${styles.profileTxt}`}>
    <div className={`${styles.flexCenter} w-1/3 sm:w-full mx-auto`}>
    <Image src={profile.image ? profile.image : 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg'}
           alt="Profile image" 
           width={200} 
           height={200} />
    </div>
    <h1 className={`${styles.flexCenter}`}>{profile.name}</h1>
    <h1 className={`${styles.flexCenter} font-light`}>{profile.email}</h1>
    </div>
    </div>

    <div className="mt-5 mb-3 text-lg font-bold">
      <h3>Your ratings:</h3>
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

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
    const id = context.params?.id
    
    if (id == null) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    const ssg = ssgHelper()
    await ssg.profile.getById.prefetch({ id })
    
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
            
        }
    }
}
export default ProfilePage;