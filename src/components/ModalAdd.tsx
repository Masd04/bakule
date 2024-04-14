import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalAdd: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[45%] flex flex-col bg-white px-5 pb-5 pt-2 rounded-md shadow-lg">
        
      <div className="flex items-center justify-between">
        <h2 className="se:text-md xr:text-lg promax:text-xl sm:text-2xl md:text-3xl ml-10 font-bold text-center flex-grow">Request new community</h2>
        <button className="ml-auto hover:scale-105" onClick={() => onClose() } aria-label="Close">
        <Image 
          src={closeButton as StaticImageData}
          alt='Go back button'
          width={40}
          height={40}
          />
        </button>
      </div>

        <form className="flex flex-col space-y-4">
          <div>
            <label htmlFor="value2" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300">Server name:</label>
            <textarea 
              id="value2" 
              maxLength={100} 
              rows={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button className="rounded bg-[#270858] md:w-[25%] md:mx-auto pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-0 active:bg-opacity-80">
            Request
          </button>
        </form>
      </div>

    </div>
  );
};

export default ModalAdd;
