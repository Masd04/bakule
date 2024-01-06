import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import { back  } from "../../public/img";

const GoBack = () => {
    const router = useRouter();

    return (
        <div className="mb-6">
        <button className="scale-100 hover:scale-110" type="button" onClick={() => router.back()}>
          <Image
          src={back as StaticImageData}
          alt='Go back button'
          width={50}
          height={40}          
          />
        </button>
        </div>
    );
};

export default GoBack;