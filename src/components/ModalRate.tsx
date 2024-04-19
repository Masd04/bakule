import React, {useState} from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  communityId: string;
}

const ModalRate: React.FC<ModalProps> = ({ isVisible, onClose, communityId }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');

  if (!isVisible) return null;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      communityId,
      value: ratingValue,
      content: reviewContent,
    };

    fetch('/api/communities/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((_data) => { // Prefixed 'data' with an underscore to indicate it's intentionally unused
        onClose(); // Close the modal on success
      })
      .catch((error) => {
        console.error('Failed to submit rating:', error);
      });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[80%] flex flex-col bg-white px-5 pb-5 pt-2 rounded-md shadow-lg">
        
        <div className="flex items-center justify-between">
          <h2 className="se:text-md xr:text-lg promax:text-xl sm:text-2xl md:text-3xl ml-10 font-bold text-center flex-grow">Rate your community!</h2>
          <button type="button" className="ml-auto hover:scale-105" onClick={onClose} aria-label="Close">
            <Image 
              src={closeButton as StaticImageData}
              alt='Go back button'
              width={40}
              height={40}
            />
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="value1" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300">Rating (1-10)</label>
            <input
              type="number"
              id="value1"
              min="1"
              max="10"
              value={ratingValue}
              onChange={(e) => setRatingValue(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="value2" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300">Review</label>
            <textarea
              id="value2"
              maxLength={200}
              rows={1}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button type="submit" className="rounded bg-cpblue md:w-[25%] md:mx-auto pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-0 active:bg-opacity-80">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalRate;
