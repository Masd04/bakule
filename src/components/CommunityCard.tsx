import type { Community } from '../types/types';
import styles from '../styles/style.js'
import Link from 'next/link';
import Image from 'next/image'

interface CommunityProps {
    community: Community;
}


export function CommunityCard({ community }: CommunityProps) {
    return <>
    <Link href={`/communities/${community.id}`}>
    <div id="card" className="py-4 mx-6">
    <div
    className="block rounded-lg bg-blue-100 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">

    <div className="flex flex-row">
    <div className="p-[0.1rem] border-2 rounded-full border-gray-700 mr-2">
    <Image src={community.imageUrl ?? 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg'} alt="Discord logo" width={36} height={36} />

    </div>
    <h5
      className="text-xl font-medium leading-tight text-neutral-800">
      {community.name}
    </h5>
    </div>

    <h6 className="mb-1 text-base font-medium leading-tight text-neutral-600">
      Description:
    </h6>
    <p className={`${styles.paragraph}`}>
      {community.description}
    </p>
    <h6 className="mb-1 text-base font-medium leading-tight text-neutral-600">
      Rating:
    </h6>
    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
    {community.ratings !== undefined ? (
        <span>{community.ratings}</span>
    ) : (
        <span className="text-red-500">No ratings yet</span>
    )}
    </p>
    <h6 className="mb-1 text-base font-medium leading-tight text-neutral-600">
      Reviews:
    </h6>
    <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
      0
    </p>
    
  </div>
  </div>
  </Link>
  </>
    ;
}