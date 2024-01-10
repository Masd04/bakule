import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[80%] flex flex-col bg-white px-5 pb-5 pt-2 rounded-md shadow-lg">
        <button className="place-self-end mb-4 hover:scale-105" onClick={onClose}>
        <Image
          src={closeButton as StaticImageData}
          alt='Go back button'
          width={50}
          height={40}          
          />
        </button>

        <div className="flex justify-center">
        <h2 className="font-bold text-3xl mb-2">Rate your community!</h2>
        </div>

        <form className="flex flex-col space-y-4">
          <div>
            <label htmlFor="value1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rating (1-10)</label>
            <input type="number" id="value1" min="1" max="10" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
          </div>

          <div>
            <label htmlFor="value2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Review</label>
            <textarea 
              id="value2" 
              maxLength={200} 
              rows={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button className="rounded bg-[#270858] md:w-[25%] md:mx-auto pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-0 active:bg-opacity-80">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
