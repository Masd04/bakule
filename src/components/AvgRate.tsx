// src/components/AvgRate.tsx

import Image, { StaticImageData } from 'next/image';
import { star } from "../../public/img";
import { getRateColor } from "~/utils/rateColor"
import styles from '../styles/style.js'

  interface AvgRateProps {
    averageRating: number | string;
    imgW: number;
    imgH: number;
    textSize: string;
    imgWrapStyle: string;
    xSpacing: string;
  }

  const AvgRate: React.FC<AvgRateProps> = ({ averageRating, imgW, imgH, textSize, imgWrapStyle, xSpacing }) => {
 
  const ratingClass = typeof averageRating === 'number' ? getRateColor(averageRating) : '';

    return (
  <>
  <div className={`${xSpacing} ${styles.flexCenter}`}>        
  <p className={`${textSize} font-bold ${ratingClass}`}>
    {averageRating ?? "0"}
  </p>
  <div className={`${imgWrapStyle}`}>
  <Image id="star"
          src={star as StaticImageData}
          alt="star icon"
          width={imgW}
          height={imgH}
        />
  </div>
  </div>

  </>

    );
  };

export default AvgRate;