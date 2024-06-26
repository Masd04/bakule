// components/CommunityCard.tsx

import type { Community } from '../types/types';
import styles from '../styles/style.js'
import Link from 'next/link';
import Image from 'next/image'
import AvgRate from "~/components/AvgRate";

interface CommunityProps {
    community: Community;
}


export function CommunityCard({ community }: CommunityProps) {
    return <>
    <Link href={`/communities/${community.id}`}>
    <div id="card" className="py-4 mx-6">
    <div
    className="block bg-sky-50 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
    

    <div className={`${styles.flexBtw} items-start`}>

    <div className={`${styles.flexRow}`}>

    <div className={`${styles.logoContainer}`}>
    <Image src={community.imageUrl ?? 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg'}
    alt="Discord logo" 
    width={30}
    height={30} />
    </div>
    <h3
      className={`${styles.cardName}`}>
      {community.name}
    </h3>
    
    </div>

    <div className="pl-2">
    <AvgRate 
        averageRating={community.averageRating ?? 0}
        textSize="text-4xl sm:text-5xl"
        imgW={35}
        imgH={30}
        imgWrapStyle="w-1/2 lg:w-full"
        xSpacing="space-x-2"
      />
    </div>

    </div>

    <h4 className={`${styles.cardDesc}`}>
      Description:
    </h4>
    <p className={`${styles.paragraph}`}>
      {community.description}
    </p>

    <div className="flex space-x-20">
    <h4 className={`${styles.cardRatRev}`}>
      Ratings: {community.ratingsCount ?? 0}
    </h4>
    
    <h4 className={`${styles.cardRatRev}`}>
      Reviews: {community.reviewsCount ?? 0}
    </h4>
    </div>
    
  </div>
  </div>
  </Link>
  </>

}