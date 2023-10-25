import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import styles from '../../styles/style.js'
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api"
import ErrorPage from "next/error"





const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
     id, 
    }) => {
     const { data: profile } = api.profile.getById.useQuery({ id })

     if (profile == null || profile.name == null)
     return <ErrorPage statusCode={404} />

    return <>
    <Head>
        <title>{`Profile ${profile.name}`}</title>
    </Head>

    <div className={``}>
    
    <h1 className={`${styles.flexCenter}`}>{profile.name}</h1>
    <h1 className={`${styles.flexCenter}`}>{profile.email}</h1>
    <div className={`${styles.flexCenter}`}>
    <img src={profile.image ? profile.image : 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg' } alt="Profile image" />
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
    ssg.profile.getById.prefetch({ id })
    
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
            
        }
    }
}
export default ProfilePage;