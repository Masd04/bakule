import Image from 'next/image';
import { back } from "../../public/img";
import Link from 'next/link';

const GoBack = () => {
    return (
        <div className="mb-6">
            <Link href="/" className="inline-block scale-100 hover:scale-110">
                <button type="button">
                    <Image
                        src={back}
                        alt='Go back button'
                        width={50}
                        height={40}
                    />
                </button>
            </Link>
        </div>
    );
};

export default GoBack;