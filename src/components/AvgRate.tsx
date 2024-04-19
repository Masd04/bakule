import Image, { StaticImageData } from 'next/image';
import { star } from "../../public/img";
import { getRateColor } from "~/utils/rateColor"

  interface AvgRateProps {
    averageRating: number | string;
    imgW: number;
    imgH: number;
    textSize: string;
  }

  const AvgRate: React.FC<AvgRateProps> = ({ averageRating, imgW, imgH, textSize }) => {
    // Colored Rating Values
    // Only call getRateColor if averageRating is a number
  const ratingClass = typeof averageRating === 'number' ? getRateColor(averageRating) : '';

    return (

<div className="flex justify-between">

  <div className="flex mr-2 mt-2 sm:mr-10 justify-end sm:justify-center items-start sm:items-center space-x-3">        
  <p className={`${textSize} font-bold ${ratingClass}`}>
    {averageRating ?? "0"}
  </p>
  <div className="w-1/4 lg:w-full">
  <Image id="star"
          src={star as StaticImageData}
          alt="star icon"
          width={imgW}
          height={imgH}
        />
  </div>
  </div>

  </div>

    );
  };

export default AvgRate;