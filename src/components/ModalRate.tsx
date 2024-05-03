// components/ModalRate.tsx

import React, {useState} from 'react';
import { mutate } from 'swr';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { closeButton  } from "../../public/img";
import styles from '../styles/style.js'

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

    void fetch('/api/communities/rate', {
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
        void mutate(`/api/communities/${communityId}`);
      })
      .catch((error) => {
        console.error('Failed to submit rating:', error);
      });
  };


  return (
    <div className={`${styles.modalContainer} ${styles.flexCenter}`}>
      <form onSubmit={handleSubmit} className="w-[80%] flex flex-col bg-white px-5 pb-5 pt-2 rounded-md shadow-lg">
        
        <div className="flex items-center justify-between">
          <h2 className={`${styles.rFormTitle} ml-10 flex-grow`}>Rate your community!</h2>
          <button type="button" className={`${styles.modalClose}`} onClick={onClose} aria-label="Close">
            <Image 
              src={closeButton as StaticImageData}
              alt='Go back button'
              width={40}
              height={40}
            />
          </button>
        </div>

        <div className={`${styles.flexCol} space-y-4`}>
          <div>
            <label htmlFor="value1" className={`${styles.modaLabel}`}>Rating (1-10)</label>
            <input
              type="number"
              id="value1"
              min="1"
              max="10"
              value={ratingValue}
              onChange={(e) => setRatingValue(parseInt(e.target.value))}
              className={`${styles.inputStyleR}`}
            />
          </div>
          
          <div>
            <label htmlFor="value2" className={`${styles.modaLabel}`}>Review</label>
            <textarea
              id="value2"
              maxLength={200}
              rows={1}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className={`${styles.inputStyleR}`}
              style={{ overflowY: 'hidden', resize: 'none' }}
              onInput={handleInput}
            />
          </div>

          <button type="submit" className={`${styles.modalSub}`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalRate;
